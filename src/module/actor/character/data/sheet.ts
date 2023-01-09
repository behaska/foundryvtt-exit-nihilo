import { CreatureSheetData } from "@actor/creature/types";
import { CharacterExitNihilo } from "..";
import { CHARACTER_SHEET_TABS } from "../values";
import { CharacterSystemData } from "./types";

type CharacterSheetTabVisibility = Record<typeof CHARACTER_SHEET_TABS[number], boolean>;

type CharacterSystemSheetData = CharacterSystemData & {};

interface CharacterSheetData extends CreatureSheetData<CharacterExitNihilo> {
    [x: string]: ExitNihiloDisplayNiveauDeSante;
    data: CharacterSystemSheetData;
    roles: typeof CONFIG.EXITNIHILO.roles;
    genres: typeof CONFIG.EXITNIHILO.genres;
    niveauxDeSante: typeof CONFIG.EXITNIHILO.niveauxDeSante;
    displayRole: ExitNihiloPentagonDisplayElement;
    displayGenre: ExitNihiloPentagonDisplayElement;
    displayNiveauDeSante: ExitNihiloPentagonDisplayElement;
    competenceVisibilite: object;
}

class ExitNihiloDisplayGenre {
    private constructor() {}

    static from(sheetData: CharacterSheetData): ExitNihiloPentagonDisplayElement {
        const genre = sheetData.actor.system.details.genre.value;
        return {
            imgSrc: `systems/exit-nihilo/assets/icons/genres/${genre}.svg`,
            title: `EXITNIHILO.Personnage.Genres.${genre}.Titre`,
            alt: `EXITNIHILO.Personnage.Genres.${genre}.Alt`,
        };
    }
}

class ExitNihiloDisplayRole {
    private constructor() {}

    static from(sheetData: CharacterSheetData): ExitNihiloPentagonDisplayElement {
        const role = sheetData.actor.system.details.role.value;
        return {
            imgSrc: `systems/exit-nihilo/assets/icons/roles/${role}.svg`,
            title: `EXITNIHILO.Personnage.Roles.${role}.Titre`,
            alt: `EXITNIHILO.Personnage.Roles.${role}.Alt`,
        };
    }
}

class ExitNihiloDisplayNiveauDeSante {
    private constructor() {}

    static from(sheetData: CharacterSheetData): ExitNihiloPentagonDisplayElement {
        const niveauDeSante = sheetData.actor.system.attributs.niveauDeSante.value;
        return {
            imgSrc: `systems/exit-nihilo/assets/icons/sante/${niveauDeSante}.svg`,
            title: `EXITNIHILO.Personnage.Sante.NiveauDeSante.${niveauDeSante}.Titre`,
            alt: `EXITNIHILO.Personnage.Sante.NiveauDeSante.${niveauDeSante}.Alt`,
        };
    }
}

interface ExitNihiloPentagonDisplayElement {
    imgSrc: string;
    title: string;
    alt: string;
}

export {
    CharacterSheetData,
    CharacterSheetTabVisibility,
    ExitNihiloPentagonDisplayElement,
    ExitNihiloDisplayRole,
    ExitNihiloDisplayGenre,
    ExitNihiloDisplayNiveauDeSante,
};
