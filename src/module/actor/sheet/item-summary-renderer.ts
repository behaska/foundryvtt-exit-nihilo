import { ActorExitNihilo } from "@actor/base";

/**
 * Implementation used to populate item summaries, toggle visibility
 * of item summaries, and save expanded/collapsed state of item summaries.
 */
export class ItemSummaryRenderer<TActor extends ActorExitNihilo> {
    constructor(protected sheet: Application & { get actor(): TActor }) { }
}
