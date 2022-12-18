import { ItemExitNihilo } from "@item/base";

export interface ItemSheetDataExitNihilo<TItem extends ItemExitNihilo> extends ItemSheetData<TItem> {
    /** The item type label that shows at the top right (for example, "Feat" for "Feat 6") */
    itemType: string | null;
    hasDetails: boolean;
    /** The sidebar's current title */
    item: TItem["data"];
    data: TItem["data"]["system"];
    isPhysical: boolean;
    user: { isGM: boolean };
}