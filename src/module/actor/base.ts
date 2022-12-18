import { ItemExitNihilo } from "@item/base";
import { ItemType } from "@item/data";
import { ActiveEffectExitNihilo } from "@module/active-effect";
import { TokenDocumentExitNihilo } from "@scene/token-document/document";
import { ActorDataExitNihilo } from "./data";
import { PrototypeTokenExitNihilo, ActorFlagsExitNihilo } from "./data/base";
import { ActorSheetExitNihilo } from "./sheet/base";

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

interface ActorExitNihilo extends Actor<TokenDocumentExitNihilo, ItemTypeMap> {
    readonly data: ActorDataExitNihilo;

    readonly items: foundry.abstract.EmbeddedCollection<ItemExitNihilo>;

    readonly effects: foundry.abstract.EmbeddedCollection<ActiveEffectExitNihilo>;

    prototypeToken: PrototypeTokenExitNihilo;

    flags: ActorFlagsExitNihilo;

    get sheet(): ActorSheetExitNihilo<this>;
}

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
