import { CreatureExitNihilo } from "@actor/creature";
import { NPCData, NPCFlags } from "./data";
import { NPCSheetExitNihilo } from "./sheet";

class NPCExitNihilo extends CreatureExitNihilo {

    /** Setup base ephemeral data to be modified by active effects and derived-data preparation */
    override prepareBaseData(): void {
        super.prepareBaseData();
    }

    /** The NPC level needs to be known before the rest of the weak/elite adjustments */
    override prepareEmbeddedDocuments(): void {
        super.prepareEmbeddedDocuments();
    }

    override prepareDerivedData(): void {
        super.prepareDerivedData();
    }
}

interface NPCExitNihilo {
    readonly data: NPCData;

    flags: NPCFlags;

    _sheet: NPCSheetExitNihilo<this> | null;

    get sheet(): NPCSheetExitNihilo<this>;
}

export { NPCExitNihilo };