import { CreatureExitNihilo } from "@actor/creature";
import { CaracteristiquesDuPersonnage, CharacterData } from "@actor/character/data";

class CharacterExitNihilo extends CreatureExitNihilo {

    /** If one exists, prepare this character's familiar */
    override prepareData(): void {
        super.prepareData();
    }

    override prepareDerivedData(): void {
        // Make separate methods for each Actor type (character, npc, etc.) to keep
        // things organized.
        super.prepareDerivedData();

        this.system.attributs.caracteristiquesCalculees = CaracteristiquesDuPersonnage.from(this.system);
    }

}

interface CharacterExitNihilo {
    readonly data: CharacterData;
}

export { CharacterExitNihilo };