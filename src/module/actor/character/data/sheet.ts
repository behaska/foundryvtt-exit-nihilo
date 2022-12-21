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
        genres: typeof CONFIG.EXITNIHILO.genres;
        displayRole: ExitNihiloPentagonDisplayElement;
        displayGenre: ExitNihiloPentagonDisplayElement;
}


class ExitNihiloDisplayGenre {
        private constructor() {
        }

        static from(sheetData: CharacterSheetData): ExitNihiloPentagonDisplayElement {
                const genre = sheetData.actor.system.details.genre.value;
                return {
                        imgSrc: `systems/exit-nihilo/assets/icons/genres/${genre}.svg`,
                        title: `EXITNIHILO.Personnage.Genres.${genre}.Titre`,
                        alt: `EXITNIHILO.Personnage.Genres.${genre}.Alt`
                }
        }
}

class ExitNihiloDisplayRole {
        private constructor() {
        }

        static from(sheetData: CharacterSheetData): ExitNihiloPentagonDisplayElement {
                const role = sheetData.actor.system.details.role.value;
                return {
                        imgSrc: `systems/exit-nihilo/assets/icons/roles/${role}.svg`,
                        title: `EXITNIHILO.Personnage.Roles.${role}.Titre`,
                        alt: `EXITNIHILO.Personnage.Roles.${role}.Alt`
                }
        }
}

interface ExitNihiloPentagonDisplayElement {
        imgSrc: string,
        title: string,
        alt: string
}

export { CharacterSheetData, CharacterSheetTabVisibility, ExitNihiloPentagonDisplayElement, ExitNihiloDisplayRole, ExitNihiloDisplayGenre };
