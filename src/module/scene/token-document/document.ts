import { ActorExitNihilo } from "@actor/base";
import { TokenDataExitNihilo } from "./data";

class TokenDocumentExitNihilo<TActor extends ActorExitNihilo = ActorExitNihilo> extends TokenDocument<TActor> {
    /** If rules-based vision is enabled, disable manually configured vision radii */
    override prepareBaseData(): void {
        super.prepareBaseData();
    }

    override prepareDerivedData(): void {
        super.prepareDerivedData();
    }

    /* -------------------------------------------- */
    /*  Event Handlers                              */
    /* -------------------------------------------- */

    protected override _onUpdate(
        changed: DeepPartial<this["_source"]>,
        options: DocumentModificationContext,
        userId: string
    ): void {
        return super._onUpdate(changed, options, userId);
    }

    /** Reinitialize vision if the actor's senses were updated directly */
    override _onUpdateBaseActor(update?: Record<string, unknown>, options?: DocumentModificationContext<Actor>): void {
        super._onUpdateBaseActor(update, options);
    }
}

interface TokenDocumentExitNihilo<TActor extends ActorExitNihilo = ActorExitNihilo> extends TokenDocument<TActor> {
    readonly data: TokenDataExitNihilo<this>;
}

export { TokenDocumentExitNihilo };
