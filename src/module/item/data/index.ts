import { ArmorData } from "@item/armor/data";
import { ContainerData } from "@item/container/data";
import { EquipmentData } from "@item/equipment/data";
import { PhysicalItemType } from "@item/physical/types";
import { WeaponData } from "@item/weapon/data";

export type ItemType = PhysicalItemType;

/** Actual physical items which you carry (as opposed to feats, lore, proficiencies, statuses, etc). */
export type PhysicalItemData = (
    | ArmorData
    | ContainerData
    | EquipmentData
    | WeaponData
);

export type ItemDataExitNihilo =
    | PhysicalItemData;

export type PhysicalItemSource = PhysicalItemData["_source"];;
export type ItemSourceExitNihilo = ItemDataExitNihilo["_source"];

export interface ItemSummaryData {
    [key: string]: unknown;
    description?: {
        value: string;
    };
    properties?: (string | number | null)[];
}