import { ItemType } from "@item/data";
import { TokenDocumentExitNihilo } from "@scene/token-document/document";

/**
 * Extend the base Actor class to implement additional logic specialized for ExitNihilo.
 * @category Actorabstract class CreatureExitNihilo extends ActorExitNihilo {
 */
class ActorExitNihilo extends Actor<TokenDocumentExitNihilo, ItemTypeMap> {

    /** Prepare token data derived from this actor, refresh Effects Panel */
    override prepareData(): void {
        super.prepareData();
    }

    /** Prepare baseline ephemeral data applicable to all actor types */
    override prepareBaseData(): void {
        super.prepareBaseData();
    }

    /** Prepare the physical-item collection on this actor, item-sibling data, and rule elements */
    override prepareEmbeddedDocuments(): void {
        super.prepareEmbeddedDocuments();
    }
}

interface ActorExitNihilo extends Actor<TokenDocumentExitNihilo, ItemTypeMap> {}

type ItemTypeMap = {
    [K in ItemType]: InstanceType<ConfigExitNihilo["EXITNIHILO"]["Item"]["documentClasses"][K]>;
};

interface HitPointsSummary {
    value: number;
    max: number;
    temp: number;
    negativeHealing: boolean;
}

interface ActorUpdateContext<T extends ActorExitNihilo> extends DocumentUpdateContext<T> {
    damageTaken?: number;
}

export { ActorExitNihilo, HitPointsSummary, ActorUpdateContext };
