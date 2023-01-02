import { CreatureExitNihilo } from "@actor/creature";
import { CharacterFlags,     CharacterData, CaracteristiquesDuPersonnage, } from "./data";

class CharacterExitNihilo extends CreatureExitNihilo {
    /** If one exists, prepare this character's familiar */
    override prepareData(): void {
        super.prepareData();
    }

    /** Setup base ephemeral data to be modified by active effects and derived-data preparation */
    override prepareBaseData(): void {
        super.prepareBaseData();
    }

    /** After AE-likes have been applied, set numeric roll options */
    override prepareEmbeddedDocuments(): void {
        super.prepareEmbeddedDocuments();
    }

    override prepareDerivedData(): void {
        super.prepareDerivedData();

        this.system.attributs.caracteristiquesCalculees = CaracteristiquesDuPersonnage.from(this.system);

    }
}

interface CharacterExitNihilo {
    readonly data: CharacterData;
    flags: CharacterFlags;
}

export { CharacterExitNihilo };
