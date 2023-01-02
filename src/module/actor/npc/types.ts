import { CreatureSheetData } from "@actor/creature/types";
import { ItemDataExitNihilo } from "@item/data";
import { NPCExitNihilo } from ".";
import { NPCSystemData } from "./data";

interface NPCSystemSheetData extends NPCSystemData {
    description: string;
}

/** Additional fields added in sheet data preparation */
interface NPCSheetData<T extends NPCExitNihilo = NPCExitNihilo> extends CreatureSheetData<T> {
    data: NPCSystemSheetData;
    items: NPCSheetItemData[];
}

type NPCSheetItemData<T extends ItemDataExitNihilo | RawObject<ItemDataExitNihilo> = ItemDataExitNihilo> = T & {
    imageUrl: string;
    chatData?: unknown;
};

export {
    NPCSheetData,
    NPCSheetItemData,
    NPCSystemSheetData,
};
