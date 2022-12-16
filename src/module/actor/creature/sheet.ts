import { ActorSheetExitNihilo } from "@actor/sheet/base";
import { CreatureExitNihilo } from ".";

/**
 * Base class for NPC and character sheets
 * @category Actor
 */
export abstract class CreatureSheetExitNihilo<TActor extends CreatureExitNihilo> extends ActorSheetExitNihilo<TActor> {
}