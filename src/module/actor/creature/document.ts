import { ActorExitNihilo } from "@actor/base";
import { CreatureData } from "@actor/data";

/** An "actor" in a Pathfinder sense rather than a Foundry one: all should contain attributes and abilities */
abstract class CreatureExitNihilo extends ActorExitNihilo {

    /** Setup base ephemeral data to be modified by active effects and derived-data preparation */
    override prepareBaseData(): void {
        super.prepareBaseData();
    }

    /** Apply ActiveEffect-Like rule elements immediately after application of actual `ActiveEffect`s */
    override prepareEmbeddedDocuments(): void {
        super.prepareEmbeddedDocuments();
    }

    override prepareDerivedData(): void {
        super.prepareDerivedData();
    }
}

interface CreatureExitNihilo {
    readonly data: CreatureData;
}

export { CreatureExitNihilo };
