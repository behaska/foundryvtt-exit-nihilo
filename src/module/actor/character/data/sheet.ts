import { CreatureSheetData } from "@actor/creature/types";
import { CharacterExitNihilo } from "..";
import { CHARACTER_SHEET_TABS } from "../values";
import { SlottedFeat, BonusFeat } from "./types";



export interface CraftingEntriesSheetData {}

type CharacterSheetTabVisibility = Record<typeof CHARACTER_SHEET_TABS[number], boolean>;

interface CharacterSheetData extends CreatureSheetData<CharacterExitNihilo> {
}


interface FeatCategorySheetData {
    id: string;
    label: string;
    feats: (SlottedFeat | BonusFeat)[];
    /** Will move to sheet data later */
    featFilter?: string | null;
}

export { CharacterSheetData, CharacterSheetTabVisibility, FeatCategorySheetData };
