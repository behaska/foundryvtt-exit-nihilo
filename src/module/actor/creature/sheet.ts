import { ActorSheetExitNihilo } from "@actor/sheet/base";
import { CreatureExitNihilo } from ".";
import { CreatureSheetData } from "./types";

/**
 * Base class for NPC and character sheets
 * @category Actor
 */
export abstract class CreatureSheetExitNihilo<TActor extends CreatureExitNihilo> extends ActorSheetExitNihilo<TActor> {

    override async getData(options?: ActorSheetOptions): Promise<CreatureSheetData<TActor>> {
        const sheetData = (await super.getData(options)) as CreatureSheetData<TActor>;

        return {
            ...sheetData,
            skills: CONFIG.EXITNIHILO.skills,
            frequencies: CONFIG.EXITNIHILO.frequencies,
            attitude: CONFIG.EXITNIHILO.attitude,
            pfsFactions: CONFIG.EXITNIHILO.pfsFactions,
        };
    }

}