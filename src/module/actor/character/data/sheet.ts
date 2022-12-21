import { CreatureSheetData } from "@actor/creature/types";
import { CharacterExitNihilo } from "..";
import { CHARACTER_SHEET_TABS } from "../values";
import { CharacterSystemData } from "./types";

export interface CraftingEntriesSheetData { }

type CharacterSheetTabVisibility = Record<typeof CHARACTER_SHEET_TABS[number], boolean>;

type CharacterSystemSheetData = CharacterSystemData & {}

interface CharacterSheetData extends CreatureSheetData<CharacterExitNihilo> {
        data: CharacterSystemSheetData;
        roles: typeof CONFIG.EXITNIHILO.roles;
}

export { CharacterSheetData, CharacterSheetTabVisibility };
