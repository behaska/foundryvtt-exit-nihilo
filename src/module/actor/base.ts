import { ItemExitNihilo } from "@item";
import { ItemType } from "@item/data";
import { ActiveEffectExitNihilo } from "@module/active-effect";
import { TokenDocumentExitNihilo } from "@scene/token-document/document";
import { ActorDataExitNihilo, ActorSourceExitNihilo } from "./data";
import { PrototypeTokenExitNihilo, ActorFlagsExitNihilo } from "./data/base";
import { ActorSheetExitNihilo } from "./sheet/base";

/**
 * Extend the base Actor class to implement additional logic specialized for ExitNihilo.
 * @category Actorabstract class CreatureExitNihilo extends ActorExitNihilo {
 */
class ActorExitNihilo extends Actor<TokenDocumentExitNihilo, ItemTypeMap> {

    constructor(data: PreCreate<ActorSourceExitNihilo>, context: ActorConstructorContextExitNihilo = {}) {
        if (context.exitNihilo?.ready) {
            super(data, context);
        } else {
            context.exitNihilo = mergeObject(context.exitNihilo ?? {}, { ready: true });
            const ActorConstructor = CONFIG.EXITNIHILO.Actor.documentClasses[data.type];
            return ActorConstructor ? new ActorConstructor(data, context) : new ActorExitNihilo(data, context);
        }
    }

    /** Prepare token data derived from this actor, refresh Effects Panel */
    override prepareData(): void {
        super.prepareData();
    }

    /** Prepare baseline ephemeral data applicable to all actor types */
    override prepareBaseData(): void {
        super.prepareBaseData();
    }

    override prepareDerivedData(): void {
        super.prepareDerivedData();
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

    _sheet: ActorSheetExitNihilo<this> | ActorSheet<this, ItemExitNihilo> | null;

    get sheet(): ActorSheetExitNihilo<this>;

    /** See implementation in class */
}

type ItemTypeMap = {
    [K in ItemType]: InstanceType<ConfigExitNihilo["EXITNIHILO"]["Item"]["documentClasses"][K]>;
};

interface ActorConstructorContextExitNihilo extends DocumentConstructionContext<ActorExitNihilo> {
    exitNihilo?: {
        ready?: boolean;
    };
}

interface ActorUpdateContext<T extends ActorExitNihilo> extends DocumentUpdateContext<T> {
    damageTaken?: number;
}

export { ActorExitNihilo, ActorUpdateContext };
