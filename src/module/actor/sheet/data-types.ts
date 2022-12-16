import { ActorExitNihilo } from "@actor/base";

export interface ActorSheetDataExitNihilo<TActor extends ActorExitNihilo> extends ActorSheetData<TActor> {
    isTargetFlatFooted: boolean;
    user: { isGM: boolean };
    totalCoinageGold: string;
    totalWealthGold: string;
    hasImmunities: boolean;
    enrichedContent: Record<string, string>;
}