import { TokenDocumentExitNihilo } from "./document";

export interface TokenDataExitNihilo<T extends TokenDocumentExitNihilo = TokenDocumentExitNihilo> extends foundry.data.TokenData<T> {
    actorData: DeepPartial<NonNullable<T["actor"]>["_source"]>;
    flags: {
        exitNihilo: {
            [key: string]: unknown;
            linkToActorSize: boolean;
            autoscale: boolean;
        };
        [key: string]: Record<string, unknown>;
    };
}
