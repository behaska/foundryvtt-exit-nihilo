import { CharacterSheetExitNihilo } from "@actor/character/sheet";
import { NPCSheetExitNihilo } from "@actor/npc/sheet";
import { ContainerSheetExitNihilo, EquipmentSheetExitNihilo } from "@item";
import { ArmorSheetExitNihilo } from "@item/armor";
import { WeaponSheetExitNihilo } from "@item/weapon";
import { JournalSheetExitNihilo, JournalTextTinyMCESheetExitNihilo } from "@module/journal-entry/sheet";
import { LocalizeExitNihilo } from "@system/localize";

export function registerSheets() {
    const translations = LocalizeExitNihilo.translations.EXITNIHILO;
    const sheetLabel = translations.SheetLabel;

    DocumentSheetConfig.unregisterSheet(JournalEntry, "core", JournalSheet);
    DocumentSheetConfig.registerSheet(JournalEntry, "exit-nihilo", JournalSheetExitNihilo, {
        label: () =>
            game.i18n.format("SHEETS.DefaultDocumentSheet", { document: game.i18n.localize("DOCUMENT.JournalEntry") }),
        makeDefault: true,
    });

    // Replace the TinyMCE sheet with the version that'll let us inject themes
    DocumentSheetConfig.unregisterSheet(JournalEntryPage, "core", JournalTextTinyMCESheet);
    DocumentSheetConfig.registerSheet(JournalEntryPage, "exit-nihilo", JournalTextTinyMCESheetExitNihilo, {
        types: ["text"],
        label: game.i18n.localize("EDITOR.TinyMCE"),
    });

    // ACTORS
    Actors.unregisterSheet("core", ActorSheet);

    const localizeType = (type: string) => {
        const entityType = type in CONFIG.EXITNIHILO.Actor.documentClasses ? "ACTOR" : "ITEM";
        const camelized = type[0].toUpperCase() + type.slice(1).toLowerCase();
        return game.i18n.localize(`${entityType}.Type${camelized}`);
    };

    Actors.registerSheet("exit-nihilo", CharacterSheetExitNihilo, {
        types: ["character"],
        label: game.i18n.format(sheetLabel, { type: localizeType("character") }),
        makeDefault: true,
    });

      // Regiser NPC Sheet
      Actors.registerSheet("exit-nihilo", NPCSheetExitNihilo, {
        types: ["npc"],
        label: game.i18n.format(sheetLabel, { type: localizeType("npc") }),
        makeDefault: true,
    });

    // ITEMS
    Items.unregisterSheet("core", ItemSheet);

    const sheetEntries = [
        ["armor", ArmorSheetExitNihilo],
        ["container", ContainerSheetExitNihilo],
        ["equipment", EquipmentSheetExitNihilo],
        ["weapon", WeaponSheetExitNihilo],
    ] as const;
    for (const [type, Sheet] of sheetEntries) {
        Items.registerSheet("exit-nihilo", Sheet, {
            types: [type],
            label: game.i18n.format(sheetLabel, { type: localizeType(type) }),
            makeDefault: true,
        });
    }

}