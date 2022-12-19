import { CreatureSheetData } from "@actor/creature/types";
import { ItemDataExitNihilo } from "@item/data";
import { NPCExitNihilo } from ".";
import { NPCSystemData } from "./data";

interface ActionsDetails {
    label: string;
}

interface NPCActionSheetData {
    passive: ActionsDetails;
    free: ActionsDetails;
    reaction: ActionsDetails;
    action: ActionsDetails;
}


interface VariantCloneParams {
    name?: string;
    description?: string;
    img?: {
        actor?: ImagePath;
        token?: VideoPath;
    };
    save?: boolean;
    keepId?: boolean;
}

interface NPCSystemSheetData extends NPCSystemData {
}

/** Additional fields added in sheet data preparation */
interface NPCSheetData<T extends NPCExitNihilo = NPCExitNihilo> extends CreatureSheetData<T> {
}

type NPCSheetItemData<T extends ItemDataExitNihilo | RawObject<ItemDataExitNihilo> = ItemDataExitNihilo> = T & {
    glyph: string;
    imageUrl: string;
    traits: {
        label: string;
        description?: string;
    }[];
    chatData?: unknown;
    system: {
        bonus?: {
            value: number;
            total?: number;
        };
        isAgile?: boolean;
        prepared?: boolean;
        tradition?: {
            ritual: boolean;
            focus: boolean;
        };
        weaponType?: string;
    };
};

export {
    NPCActionSheetData,
    NPCSheetData,
    NPCSheetItemData,
    NPCSystemSheetData,
    VariantCloneParams,
};
