import { ActorExitNihilo } from "@actor/base";
import { ItemExitNihilo } from "@item/base";
import { ActorSheetDataExitNihilo } from "./data-types";

/**
 * Extend the basic ActorSheet class to do all the ExitNihilo things!
 * This sheet is an Abstract layer which is not used.
 * @category Actor
 */
abstract class ActorSheetExitNihilo<TActor extends ActorExitNihilo> extends ActorSheet<TActor, ItemExitNihilo> {
}

interface ActorSheetExitNihilo<TActor extends ActorExitNihilo> extends ActorSheet<TActor, ItemExitNihilo> {
    prepareItems?(sheetData: ActorSheetDataExitNihilo<TActor>): Promise<void>;
}

export { ActorSheetExitNihilo };
