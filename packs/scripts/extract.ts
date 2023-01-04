import type { ActorExitNihilo } from "@actor/base";
import type { ItemExitNihilo } from "@item/base";
import { ItemSourceExitNihilo } from "@item/data";
import { MacroExitNihilo } from "@module/macro";
import { sluggify } from "@util";
import * as fs from "fs";
import { JSDOM } from "jsdom";
import Datastore from "nedb-promises";
import * as path from "path";
import * as process from "process";
import systemJSON from "system.json";
import yargs from "yargs";
import { CompendiumPack, isActorSource } from "./packman/compendium-pack";

declare global {
    interface Global {
        document: Document;
        window: Window;
        navigator: Navigator;
    }
}
const { window } = new JSDOM();
global.document = window.document;
global.window = global.document.defaultView!;

import $ from "jquery";

// Show error message without needless stack trace
const PackError = (message: string) => {
    console.error(`Error: ${message}`);
    process.exit(1);
};

interface ExtractArgs {
    packDb: string;
    foundryConfig?: string;
    disablePresort?: boolean;
    logWarnings?: boolean;
}

const args = (yargs(process.argv.slice(2)) as yargs.Argv<ExtractArgs>)
    .command(
        "$0 <packDb> [foundryConfig] [disablePresort] [logWarnings]",
        "Extract one or all compendium packs to packs/data",
        () => {
            yargs
                .positional("packDb", {
                    describe: 'A compendium pack filename (*.db) or otherwise "all"',
                    coerce: (arg: string) => {
                        const packDb = arg.toLowerCase();
                        return packDb === "all"
                            ? packDb
                            : packDb.replace(/[^a-z0-9]+$/, "").replace(/(?:\.db)?$/, ".db");
                    },
                })
                .positional("foundryConfig", {
                    describe: "The path to your local Foundry server's config.json file",
                    default: "./foundryconfig.json",
                })
                .option("disablePresort", {
                    describe: "Turns off data item presorting.",
                    type: "boolean",
                    default: false,
                })
                .option("logWarnings", {
                    describe: "Turns on logging out warnings about extracted data.",
                    type: "boolean",
                    default: true,
                })
                .example([
                    ["npm run $0 spells.db /path/to/foundryvtt/Config/options.json"],
                    ["npm run $0 spells.db C:\\Users\\me\\this\\way\\to\\options.json"],
                    ["npm run $0 spells.db # copy of config at ./foundryconfig.json or otherwise using dist/"],
                    ["npm run $0 all       # same"],
                ]);
        }
    )
    .check((argv) => {
        if (
            typeof argv.foundryConfig === "string" &&
            !(fs.existsSync(argv.foundryConfig) && fs.statSync(argv.foundryConfig).isFile())
        ) {
            argv.foundryConfig = undefined;
        }
        return true;
    })
    .help(false)
    .version(false)
    .parseSync();

const packsPath = (() => {
    try {
        const content = fs.readFileSync(args.foundryConfig ?? "", { encoding: "utf-8" });
        const config = JSON.parse(content) ?? {};
        return path.join(config.dataPath, "Data", "systems", config.systemName ?? "exit-nihilo", "packs");
    } catch (_error) {
        return path.join(process.cwd(), "dist", "packs");
    }
})();

const tempDataPath = path.resolve(process.cwd(), "packs/temp-data");
const dataPath = path.resolve(process.cwd(), "packs/data");
const packsMetadata = systemJSON.packs as unknown as CompendiumMetadata[];

const idsToNames: Map<string, Map<string, string>> = new Map();

type CompendiumDocumentExitNihilo = ActorExitNihilo | ItemExitNihilo | JournalEntry | MacroExitNihilo | RollTable;
type PackEntry = CompendiumDocumentExitNihilo["data"]["_source"];

function assertDocIdSame(newSource: PackEntry, jsonPath: string): void {
    if (fs.existsSync(jsonPath)) {
        const oldSource = JSON.parse(fs.readFileSync(jsonPath, { encoding: "utf-8" })) as PackEntry;
        if (oldSource._id !== newSource._id) {
            throw PackError(
                `The ID of doc "${newSource.name}" (${newSource._id}) does not match the current ID ` +
                    `(${oldSource._id}). Documents that are already in the system must keep their current ID.`
            );
        }
    }
}

function sanitizeDocument<T extends PackEntry>(docSource: T, { isEmbedded } = { isEmbedded: false }): T {
    // Clear non-core/exit-nihilo flags
    for (const flagScope in docSource.flags) {
        if (!["core", "exit-nihilo"].includes(flagScope) || !isEmbedded) {
            delete docSource.flags[flagScope];
        }
    }

    // Clean up description HTML
    const cleanDescription = (description: string): string => {
        if (!description) {
            return "";
        }

        const $description = ((): JQuery => {
            try {
                return $(
                    description.startsWith("<p>") && /<\/(?:p|ol|ul|table)>$/.test(description)
                        ? description
                        : `<p>${description}</p>`
                );
            } catch (error) {
                console.error(error);
                throw PackError(`Failed to parse description of ${docSource.name} (${docSource._id}):\n${description}`);
            }
        })();

        // Strip out span tags from AoN copypasta
        const selectors = ["span#ctl00_MainContent_DetailedOutput", "span.fontstyle0"];
        for (const selector of selectors) {
            $description.find(selector).each((_i, span) => {
                $(span)
                    .contents()
                    .unwrap(selector)
                    .each((_j, node) => {
                        if (node.nodeName === "#text") {
                            node.textContent = node.textContent!.trim();
                        }
                    });
            });
        }

        return $("<div>")
            .append($description)
            .html()
            .replace(/<([hb]r)>/g, "<$1 />") // Prefer self-closing tags
            .replace(/&nbsp;/g, " ")
            .replace(/ {2,}/g, " ")
            .replace(/<p> ?<\/p>/g, "")
            .replace(/<\/p> ?<p>/g, "</p>\n<p>")
            .replace(/<p>[ \r\n]+/g, "<p>")
            .replace(/[ \r\n]+<\/p>/g, "</p>")
            .replace(/<(?:b|strong)>\s*/g, "<strong>")
            .replace(/\s*<\/(?:b|strong)>/g, "</strong>")
            .replace(/(<\/strong>)(\w)/g, "$1 $2")
            .replace(/(<p><\/p>)/g, "")
            .trim();
    };

    if ("system" in docSource) {
        if ("description" in docSource.system) {
            docSource.system.description.value = cleanDescription(docSource.system.description.value);
        } else if ("details" in docSource.system && "publicNotes" in docSource.system.details) {
            docSource.system.details.publicNotes = cleanDescription(docSource.system.details.publicNotes);
        }
    } else if ("content" in docSource) {
        docSource.content = cleanDescription(docSource.content);
    }

    return docSource;
}

const newDocIdMap: Record<string, string> = {};

function convertLinks(docSource: PackEntry, packName: string): PackEntry {
    newDocIdMap[docSource._id] = docSource.name;

    const sanitized = sanitizeDocument(docSource);
    if (isActorSource(sanitized)) {
        sanitized.items = sanitized.items.map((itemData) => sanitizeDocument(itemData, { isEmbedded: true }));
    }

    const docJSON = JSON.stringify(sanitized).replace(/@Compendium\[/g, "@UUID[Compendium.");

    // Link checks
    const { LINK_PATTERNS } = CompendiumPack;
    const worldItemLinks = Array.from(docJSON.matchAll(LINK_PATTERNS.world));
    if (worldItemLinks.length > 0) {
        const linkString = worldItemLinks.map((match) => match[0]).join(", ");
        console.warn(`${docSource.name} (${packName}) has links to world items: ${linkString}`);
    }

    const compendiumLinks = Array.from(docJSON.matchAll(LINK_PATTERNS.uuid))
        .map((match) => match[0])
        .filter((l) => !l.includes("JournalEntryPage."));

    // Convert links by ID to links by name
    const notFound: string[] = [];
    const convertedJson = compendiumLinks.reduce((partiallyConverted, linkById): string => {
        const components = new RegExp(LINK_PATTERNS.uuid.source);
        const parts = components.exec(linkById);
        if (!Array.isArray(parts)) {
            throw PackError("Unexpected error parsing compendium link");
        }

        const [packId, docId] = parts.slice(1, 3);
        const packMap = idsToNames.get(packId);
        if (!packMap) {
            throw PackError(`Pack ${packId} has no ID-to-name map.`);
        }

        const docName = packMap.get(docId) ?? newDocIdMap[docId];
        if (!docName) {
            notFound.push(parts[0].replace(/\{$/, ""));
            return partiallyConverted;
        }

        const replacePattern = new RegExp(`(?<!"_?id":")${docId}(?=\\])`, "g");
        return partiallyConverted.replace(replacePattern, docName);
    }, docJSON);

    // In case some new items with links to other new items weren't found
    if (notFound.length > 0) {
        const idsNotFound = notFound.join(", ");
        console.debug(
            `Warning: Unable to find names for the following links in ${docSource.name} ` +
                `(${packName}): ${idsNotFound}`
        );
    }

    return JSON.parse(convertedJson) as PackEntry;
}

async function getAllData(filename: string): Promise<PackEntry[]> {
    const packDB = Datastore.create({ filename, corruptAlertThreshold: 10 });
    await packDB.load();

    return packDB.find({}) as Promise<PackEntry[]>;
}

function sortDataItems(docSource: PackEntry): ItemSourceExitNihilo[] {
    const itemTypeList: string[] = [
        "spellcastingEntry",
        "spell",
        "weapon",
        "armor",
        "equipment",
        "consumable",
        "treasure",
        "backpack",
        "condition",
        "effect",
        "melee",
        "action",
        "lore",
    ];
    if (!("items" in docSource)) {
        return [];
    }

    const ownedItems = docSource.items;
    const groupedItems: Map<string, Set<ItemSourceExitNihilo>> = new Map();

    // Separate the data items into type collections.
    for (const item of ownedItems) {
        if (!groupedItems.has(item.type)) {
            groupedItems.set(item.type, new Set<ItemSourceExitNihilo>());
        }

        const itemGroup = groupedItems.get(item.type);
        if (itemGroup) {
            itemGroup.add(item);
        }
    }

    // Create new array of items.
    const sortedItems: ItemSourceExitNihilo[] = Array(ownedItems.length);
    let itemIndex = 0;
    for (const itemType of itemTypeList) {
        if (groupedItems.has(itemType) && groupedItems.size > 0) {
            const itemGroup = groupedItems.get(itemType);
            if (itemGroup) {
                let items: ItemSourceExitNihilo[];
                switch (itemType) {
                    case "spellcastingEntry":
                        items = sortSpellcastingEntries(docSource.name, itemGroup);
                        break;
                    case "action":
                        items = sortActions(docSource.name, itemGroup);
                        break;
                    case "lore":
                        items = Array.from(itemGroup).sort((a, b) => a.name.localeCompare(b.name));
                        break;
                    default:
                        items = Array.from(itemGroup);
                }

                for (const item of items) {
                    sortedItems[itemIndex] = item;
                    itemIndex += 1;
                    item.sort = 100000 * itemIndex;
                }
            }
        }
    }

    // Make sure to add any items that are of a type not defined in the list.
    for (const [key, itemSet] of groupedItems) {
        if (!itemTypeList.includes(key)) {
            if (args.logWarnings) {
                console.log(
                    `Warning in ${docSource.name}: Item type '${key}' is currently unhandled in sortDataItems. Consider adding.`
                );
            }
            for (const item of itemSet) {
                sortedItems[itemIndex] = item;
                itemIndex += 1;
                item.sort = 100000 * itemIndex;
            }
        }
    }

    return sortedItems;
}

function sortItemsWithOverrides(
    docName: string,
    actions: ItemSourceExitNihilo[],
    overrides: Map<RegExp, "top" | "bottom">
): ItemSourceExitNihilo[] {
    const topActions: ItemSourceExitNihilo[] = [];
    const middleActions: ItemSourceExitNihilo[] = [];
    const bottomActions: ItemSourceExitNihilo[] = [];

    for (const [regexp, position] of overrides.entries()) {
        const interaction = actions.find((action) => regexp.exec(action.name));
        if (interaction) {
            if (position === "top") {
                topActions.push(interaction);
            } else if (position === "bottom") {
                bottomActions.push(interaction);
            } else {
                if (args.logWarnings) {
                    console.log(
                        `Warning in ${docName}: Override item '${regexp}' has undefined override section '${position}', should be top or bottom!`
                    );
                }
            }
        }
    }

    for (const interaction of actions) {
        if (!topActions.includes(interaction) && !bottomActions.includes(interaction)) {
            middleActions.push(interaction);
        }
    }

    return topActions.concat(middleActions, bottomActions);
}

function sortSpellcastingEntries(docName: string, actions: Set<ItemSourceExitNihilo>): ItemSourceExitNihilo[] {
    const overrides: Map<RegExp, "top" | "bottom"> = new Map([
        [new RegExp("Prepared Spells"), "top"],
        [new RegExp("Spontaneous Spells"), "top"],
        [new RegExp("Innate Spells"), "top"],
        [new RegExp("Ritual Spells"), "top"],
    ]);

    return sortItemsWithOverrides(docName, Array.from(actions), overrides);
}

function sortInteractions(docName: string, actions: ItemSourceExitNihilo[]): ItemSourceExitNihilo[] {
    const overrides = new Map<RegExp, "top" | "bottom">([
        [new RegExp("Low-Light Vision"), "top"],
        [new RegExp("^Darkvision"), "top"],
        [new RegExp("Greater Darkvision"), "top"],
        [new RegExp("Tremorsense"), "top"],
        [new RegExp("Scent"), "top"],
        [new RegExp("Telepathy"), "top"],
        [new RegExp("At-Will Spells"), "bottom"],
        [new RegExp("Constant Spells"), "bottom"],
    ]);

    return sortItemsWithOverrides(docName, actions, overrides);
}

function sortDefensiveActions(docName: string, actions: ItemSourceExitNihilo[]): ItemSourceExitNihilo[] {
    const overrides: Map<RegExp, "top" | "bottom"> = new Map([
        [new RegExp("All-Around Vision"), "top"],
        [
            new RegExp(
                "(\\+|\\-)\\d+ (Status|Circumstance) (Bonus )?(to|on) ((All|Fortitude|Reflex|Will) )?Saves",
                "i"
            ),
            "top",
        ],
        [new RegExp("Fast Healing"), "top"],
        [new RegExp("Negative Healing"), "top"],
        [new RegExp("Regeneration"), "top"],
        [new RegExp("Swarm Mind"), "top"],
    ]);

    return sortItemsWithOverrides(docName, actions, overrides);
}

function sortOffensiveActions(docName: string, actions: ItemSourceExitNihilo[]): ItemSourceExitNihilo[] {
    const overrides: Map<RegExp, "top" | "bottom"> = new Map([
        [new RegExp("^Grab"), "bottom"],
        [new RegExp("Improved Grab"), "bottom"],
        [new RegExp("^Knockdown"), "bottom"],
        [new RegExp("Improved Knockdown"), "bottom"],
        [new RegExp("^Push"), "bottom"],
        [new RegExp("Improved Push"), "bottom"],
    ]);

    return sortItemsWithOverrides(docName, actions, overrides);
}

function sortActions(docName: string, _actions: Set<ItemSourceExitNihilo>): ItemSourceExitNihilo[] {
    const actionsMap: Map<string, ItemSourceExitNihilo[]> = new Map([
        ["interaction", []],
        ["defensive", []],
        ["offensive", []],
        ["other", []],
    ]);

    const sortedInteractions = sortInteractions(docName, actionsMap.get("interaction")!);
    const sortedDefensive = sortDefensiveActions(docName, actionsMap.get("defensive")!);
    const sortedOffensive = sortOffensiveActions(docName, actionsMap.get("offensive")!);

    return sortedInteractions.concat(sortedDefensive, sortedOffensive, actionsMap.get("other")!);
}

async function extractPack(filePath: string, packFilename: string) {
    console.log(`Extracting pack: ${packFilename} (Presorting: ${args.disablePresort ? "Disabled" : "Enabled"})`);
    const outPath = path.resolve(tempDataPath, packFilename);

    const packSources = await getAllData(filePath);
    const idPattern = /^[a-z0-9]{20,}$/g;

    for (const source of packSources) {
        // Remove or replace unwanted values from the document source
        const preparedSource = convertLinks(source, packFilename);
        if ("items" in preparedSource && preparedSource.type === "npc" && !args.disablePresort) {
            preparedSource.items = sortDataItems(preparedSource);
        }

        // Pretty print JSON data
        const outData = (() => {
            const allKeys: Set<string> = new Set();
            const idKeys: string[] = [];

            JSON.stringify(preparedSource, (key, value) => {
                if (idPattern.test(key)) {
                    idKeys.push(key);
                } else {
                    allKeys.add(key);
                }

                return value;
            });

            const sortedKeys = Array.from(allKeys).sort().concat(idKeys);

            const newJson = JSON.stringify(preparedSource, sortedKeys, 4);
            return `${newJson}\n`;
        })();

        // Remove all non-alphanumeric characters from the name
        const slug = sluggify(source.name);
        const outFileName = `${slug}.json`;
        const outFilePath = path.resolve(outPath, outFileName);

        if (fs.existsSync(outFilePath)) {
            throw PackError(`Error: Duplicate name "${source.name}" in pack: ${packFilename}`);
        }

        assertDocIdSame(preparedSource, outFilePath);

        // Write the JSON file
        await fs.promises.writeFile(outFilePath, outData, "utf-8");
    }

    return packSources.length;
}

function populateIdNameMap() {
    const packDirs = fs.readdirSync(dataPath);

    for (const packDir of packDirs) {
        const metadata = packsMetadata.find((pack) => path.basename(pack.path) === packDir);
        if (metadata === undefined) {
            throw PackError(`Compendium at ${packDir} has metadata in the local system.json file.`);
        }

        const packMap: Map<string, string> = new Map();
        idsToNames.set(metadata.name, packMap);

        const filenames = fs.readdirSync(path.resolve(dataPath, packDir));
        const filePaths = filenames.map((filename) => path.resolve(dataPath, packDir, filename));

        for (const filePath of filePaths) {
            const jsonString = fs.readFileSync(filePath, "utf-8");
            const source = (() => {
                try {
                    return JSON.parse(jsonString);
                } catch (error) {
                    if (error instanceof Error) {
                        throw PackError(`File at ${filePath} could not be parsed: ${error.message}`);
                    }
                }
            })();
            packMap.set(source._id, source.name);
        }
    }
}

// Extract one or all packs
async function extractPacks() {
    if (!fs.existsSync(dataPath)) {
        await fs.promises.mkdir(dataPath);
    }
    if (!fs.existsSync(packsPath)) {
        throw Error("Foundry directory not found! Check your foundryconfig.json.");
    }

    console.log("Cleaning up old temp data...");
    await fs.promises.rm(tempDataPath, { recursive: true, force: true });
    await fs.promises.mkdir(tempDataPath);

    populateIdNameMap();

    const foundryPacks = (args.packDb === "all" ? fs.readdirSync(packsPath) : [args.packDb])
        .filter((f) => f !== ".gitkeep")
        .map((f) => path.resolve(packsPath, f));

    return (
        await Promise.all(
            foundryPacks.map(async (filePath) => {
                const dbFilename = path.basename(filePath);

                if (!dbFilename.endsWith(".db")) {
                    throw PackError(`Pack file is not a DB file: "${dbFilename}"`);
                }
                if (!fs.existsSync(filePath)) {
                    throw PackError(`File not found: "${dbFilename}"`);
                }

                const outDirPath = path.resolve(dataPath, dbFilename);
                const tempOutDirPath = path.resolve(tempDataPath, dbFilename);

                await fs.promises.mkdir(tempOutDirPath);

                const sourceCount = await extractPack(filePath, dbFilename);

                // Move ./packs/temp-data/[packname].db/ to ./packs/data/[packname].db/
                fs.rmSync(outDirPath, { recursive: true, force: true });
                await fs.promises.rename(tempOutDirPath, outDirPath);

                console.log(`Finished extracting ${sourceCount} documents from pack ${dbFilename}`);
                return sourceCount;
            })
        )
    ).reduce((runningTotal, count) => runningTotal + count, 0);
}

extractPacks()
    .then((grandTotal) => {
        fs.rmSync(tempDataPath, { recursive: true, force: true });
        console.log(`Extraction complete (${grandTotal} total documents).`);
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
