import { ActorExitNihilo } from "@actor/base";

export interface ActorSheetDataExitNihilo<TActor extends ActorExitNihilo> extends ActorSheetData<TActor> {
    user: { isGM: boolean };
    enrichedContent: Record<string, string>;
}