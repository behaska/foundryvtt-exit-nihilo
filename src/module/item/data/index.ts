import { ActionItemData } from "@item/action/data";
import { EquipmentData } from "@item/equipment/data";
import { PhysicalItemTraits } from "@item/physical/data";
import { PhysicalItemType } from "@item/physical/types";
import { WeaponData } from "@item/weapon/data";

export type NonPhysicalItemType =
    | "action"
    | "ancestry"
    | "background"
    | "class"
    | "condition"
    | "deity"
    | "effect"
    | "feat"
    | "heritage"
    | "kit"
    | "lore"
    | "melee"
    | "spell"
    | "spellcastingEntry";

export type ItemType = NonPhysicalItemType | PhysicalItemType;

/** Actual physical items which you carry (as opposed to feats, lore, proficiencies, statuses, etc). */
export type PhysicalItemData = { system: { traits: PhysicalItemTraits } } & (
    | EquipmentData
    | WeaponData
);

export type ItemDataExitNihilo =
    | PhysicalItemData
    | ActionItemData;

export type PhysicalItemSource = PhysicalItemData["_source"];;
export type ItemSourceExitNihilo = ItemDataExitNihilo["_source"];

export interface ItemSummaryData {
    [key: string]: unknown;
    description?: {
        value: string;
    };
    traits?: TraitChatData[];
    properties?: (string | number | null)[];
}

export interface TraitChatData {
    value: string;
    label: string;
    description?: string;
    mystified?: boolean;
    excluded?: boolean;
}