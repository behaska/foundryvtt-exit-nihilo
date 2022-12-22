import { CreatureSheetExitNihilo } from "@actor/creature/sheet";
import { CreatureSheetData } from "@actor/creature/types";
import { NPCExitNihilo } from ".";
import { NPCSheetData } from "./types";

export class NPCSheetExitNihilo<TActor extends NPCExitNihilo> extends CreatureSheetExitNihilo<TActor> {
    static override get defaultOptions() {
        const options = super.defaultOptions;

        // Mix default options with new ones
        mergeObject(options, {
            classes: [...options.classes, "exit-nihilo", "npc"],
            width: 650,
            height: 680,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "main" }],
            scrollY: [".tab.main", ".tab.inventory", ".tab.spells", ".tab.effects", ".tab.notes"],
        });
        return options;
    }

    /** Show either the actual NPC sheet or a briefened lootable version if the NPC is dead */
    override get template(): string {
        return "systems/exit-nihilo/templates/actors/npc/sheet.html";
    }

    override async getData(): Promise<NPCSheetData<TActor>> {
        const sheetData = (await super.getData()) as PrePrepSheetData<TActor>;
        // Return data for rendering
        return sheetData as NPCSheetData<TActor>;
    }
}

type PrePrepSheetData<T extends NPCExitNihilo> = Partial<NPCSheetData<T>> & CreatureSheetData<T>;