import { ItemExitNihilo } from "@item/base";
import { ItemSourceExitNihilo, ItemType } from "@item/data";
import { ActiveEffectExitNihilo } from "@module/active-effect";
import { UserExitNihilo } from "@module/user/document";
import { TokenDocumentExitNihilo } from "@scene/token-document/document";
import { ActorDataExitNihilo } from "./data";
import { RollOptionFlags, PrototypeTokenExitNihilo, ActorFlagsExitNihilo } from "./data/base";
import { ActorSheetExitNihilo } from "./sheet/base";
import { AuraData } from "./types";

/**
 * Extend the base Actor class to implement additional logic specialized for ExitNihilo.
 * @category Actorabstract class CreatureExitNihilo extends ActorExitNihilo {
 */
class ActorExitNihilo extends Actor<TokenDocumentExitNihilo, ItemTypeMap> {

    /** A cached copy of `Actor#itemTypes`, lazily regenerated every data preparation cycle */
    private _itemTypes?: { [K in keyof ItemTypeMap]: Embedded<ItemTypeMap[K]>[] };

    /** Cache the return data before passing it to the caller */
    override get itemTypes(): { [K in keyof ItemTypeMap]: Embedded<ItemTypeMap[K]>[] } {
        return (this._itemTypes ??= super.itemTypes);
    }

    /** The compendium source ID of the actor **/
    get sourceId(): ActorUUID | null {
        return this.flags.core?.sourceId ?? null;
    }

    /** Get an active GM or, failing that, a player who can update this actor */
    get primaryUpdater(): UserExitNihilo | null {
        const activeUsers = game.users.filter((u) => u.active);

        // 1. The first active GM, sorted by ID
        const firstGM = activeUsers
            .filter((u) => u.isGM)
            .sort((a, b) => (a.id > b.id ? 1 : -1))
            .shift();
        if (firstGM) return firstGM;

        // 2. The user with this actor assigned
        const primaryPlayer = this.isToken ? null : activeUsers.find((u) => u.character?.id === this.id);
        if (primaryPlayer) return primaryPlayer;

        // 3. Anyone who can update the actor
        const firstUpdater = game.users
            .filter((u) => this.canUserModify(u, "update"))
            .sort((a, b) => (a.id > b.id ? 1 : -1))
            .shift();
        return firstUpdater ?? null;
    }

    /**
     * Whether the actor can see, given its token placement in the current scene.
     * A meaningful implementation is found in `CreatureExitNihilo`.
     */
    get canSee(): boolean {
        return true;
    }

    /** Whether this actor can execute actions: meaningful implementations are found in `CreatureExitNihilo`. */
    get canAct(): boolean {
        return true;
    }

    /** Whether this actor can attack: meaningful implementations are found in `CreatureExitNihilo` and `HazardExitNihilo`. */
    get canAttack(): boolean {
        return false;
    }

    get isDead(): boolean {
        const tokens = this.getActiveTokens(true, true);
        return tokens.length > 0;
    }

    /** Does this creature emit sound? False unless a subclass overrides it */
    get emitsSound(): boolean {
        return false;
    }

    get rollOptions(): RollOptionFlags {
        return this.flags.exitNihilo.rollOptions;
    }

    /** Most actor types can host rule elements */
    get canHostRuleElements(): boolean {
        return true;
    }

    /** Get roll options from this actor's effects, traits, and other properties */
    getSelfRollOptions(prefix: "self" | "target" | "origin" = "self"): string[] {
        const { rollOptions } = this;
        return Object.keys(rollOptions.all).flatMap((o) =>
            o.startsWith("self:") && rollOptions.all[o] ? o.replace(/^self/, prefix) : []
        );
    }

    /** Create a clone of this actor to recalculate its statistics with temporary roll options included */
    getContextualClone(rollOptions: string[]): this {
        const rollOptionsAll = rollOptions.reduce(
            (options: Record<string, boolean>, option) => ({ ...options, [option]: true }),
            {}
        );
        return this.clone({ flags: { exitNihilo: { rollOptions: { all: rollOptionsAll } } } }, { keepId: true });
    }

    /** Apply effects from an aura: will later be expanded to handle effects from measured templates */
    async applyAreaEffects(aura: AuraData): Promise<void> {
        if (game.user !== this.primaryUpdater) return;

        for (const data of aura.effects) {
            if (this.itemTypes.effect.some((e) => e.sourceId === data.uuid)) {
                continue;
            }
        }

    }

    /** Prepare token data derived from this actor, refresh Effects Panel */
    override prepareData(): void {
        delete this._itemTypes;

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


    /* -------------------------------------------- */
    /*  Rolls                                       */
    /* -------------------------------------------- */

    isLootableBy(user: UserExitNihilo) {
        return this.canUserModify(user, "update");
    }


    /**
     * Retrieve all roll option from the requested domains. Micro-optimized in an excessively verbose for-loop.
     * @param domains The domains of discourse from which to pull options. Always includes the "all" domain.
     */
    getRollOptions(domains: string[] = []): string[] {
        const withAll = Array.from(new Set(["all", ...domains]));
        const { rollOptions } = this;
        const toReturn: Set<string> = new Set();

        for (const domain of withAll) {
            for (const [option, value] of Object.entries(rollOptions[domain] ?? {})) {
                if (value) toReturn.add(option);
            }
        }

        return Array.from(toReturn).sort();
    }

    /** This allows @actor.level and such to work for roll macros */
    override getRollData(): Record<string, unknown> {
        return { ...duplicate(super.getRollData()), actor: this };
    }

    /* -------------------------------------------- */
    /* Conditions                                   */
    /* -------------------------------------------- */
}

interface ActorExitNihilo extends Actor<TokenDocumentExitNihilo, ItemTypeMap> {
    readonly data: ActorDataExitNihilo;

    readonly items: foundry.abstract.EmbeddedCollection<ItemExitNihilo>;

    readonly effects: foundry.abstract.EmbeddedCollection<ActiveEffectExitNihilo>;

    prototypeToken: PrototypeTokenExitNihilo;

    flags: ActorFlagsExitNihilo;

    get sheet(): ActorSheetExitNihilo<this>;

    /** See implementation in class */
    createEmbeddedDocuments(
        embeddedName: "ActiveEffect",
        data: PreCreate<foundry.data.ActiveEffectSource>[],
        context?: DocumentModificationContext
    ): Promise<ActiveEffectExitNihilo[]>;
    createEmbeddedDocuments(
        embeddedName: "Item",
        data: PreCreate<ItemSourceExitNihilo>[],
        context?: DocumentModificationContext
    ): Promise<ItemExitNihilo[]>;
    createEmbeddedDocuments(
        embeddedName: "ActiveEffect" | "Item",
        data: PreCreate<foundry.data.ActiveEffectSource>[] | PreCreate<ItemSourceExitNihilo>[],
        context?: DocumentModificationContext
    ): Promise<ActiveEffectExitNihilo[] | ItemExitNihilo[]>;

    /** See implementation in class */
    updateEmbeddedDocuments(
        embeddedName: "ActiveEffect",
        updateData: EmbeddedDocumentUpdateData<ActiveEffectExitNihilo>[],
        options?: DocumentModificationContext
    ): Promise<ActiveEffectExitNihilo[]>;
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
