import { ActorExitNihilo } from "@actor/base";
import { ItemExitNihilo } from "@item/base";
import { ItemSourceExitNihilo } from "@item/data";
import { ActiveEffectExitNihilo } from "@module/active-effect";
import { ActorType } from ".";

/** Base interface for all actor data */
interface BaseActorSourceExitNihilo<
    TType extends ActorType = ActorType,
    TSystemSource extends ActorSystemSource = ActorSystemSource
> extends foundry.data.ActorSource<TType, TSystemSource, ItemSourceExitNihilo> {
    flags: DeepPartial<ActorFlagsExitNihilo>;
    prototypeToken: PrototypeTokenSourceExitNihilo;
}

interface BaseActorDataExitNihilo<
    TActor extends ActorExitNihilo = ActorExitNihilo,
    TType extends ActorType = ActorType,
    TSystemData extends ActorSystemData = ActorSystemData,
    TSource extends BaseActorSourceExitNihilo<TType> = BaseActorSourceExitNihilo<TType>
> extends Omit<BaseActorSourceExitNihilo<TType, ActorSystemSource>, "effects" | "items" | "prototypeToken">,
        foundry.data.ActorData<TActor, ActiveEffectExitNihilo, ItemExitNihilo> {
    readonly type: TType;
    readonly system: TSystemData;
    token: PrototypeTokenExitNihilo;

    readonly _source: TSource;
}

interface ActorSystemSource {}

interface ActorSystemData extends ActorSystemSource {
    details: {
        creature?: unknown;
    };
    attributes: BaseActorAttributes;
    traits: BaseTraitsData<string>;
    /** Icons appearing in the Effects Tracker application */
    tokenEffects: TemporaryEffect[];
    toggles: RollToggle[];
}

interface RollOptionFlags {
    all: Record<string, boolean | undefined>;
    [key: string]: Record<string, boolean | undefined> | undefined;
}

interface ActorFlagsExitNihilo extends foundry.data.ActorFlags {
    exitNihilo: {
        rollOptions: RollOptionFlags;
        [key: string]: unknown;
    };
}

/** Basic hitpoints data fields */
interface BaseHitPointsData {
    /** The current amount of hitpoints the character has. */
    value: number;
    /** The maximum number of hitpoints this character has. */
    max?: number;
    /** If defined, the amount of temporary hitpoints this character has. */
    temp: number;
    /** Any details about hit points. */
    details: string;
}

interface BaseActorAttributes {
}


type GangUpCircumstance =
    /** Requires at least `number` allies within melee reach of the target */
    | number
    /** Requires the actor's animal companion to be adjacent to the target */
    | "animal-companion";


export interface BaseTraitsSource<TTrait extends string> {
    /** Actual Pathfinder traits */
    value: TTrait[];
}

interface BaseTraitsData<TTrait extends string> extends BaseTraitsSource<TTrait> {
}

/** Basic skill and save data (not including custom modifiers). */
interface AbilityBasedStatistic {
    /** The actual modifier for this martial type. */
    value: number;
    /** Describes how the value was computed. */
    breakdown: string;
}

/** Basic initiative-relevant data. */
interface InitiativeData {
}

/** The full data for character perception rolls (which behave similarly to skills). */
type PerceptionData = AbilityBasedStatistic & Rollable;
/** The full data for character AC; includes the armor check penalty. */

interface ArmorClassData {
}

interface TraitViewData {
    /** The name of this action. */
    name: string;
    /** The label for this action which will be rendered on the UI. */
    label: string;
    /** The roll this trait applies to, if relevant. */
    rollName?: string;
    /** The option that this trait applies to the roll (of type `rollName`). */
    rollOption?: string;
    /** An extra css class added to the UI marker for this trait. */
    cssClass?: string;
    /** The description of the trait */
    description?: string;
}

/** An strike which a character can use. */
interface StrikeData {
}

interface RollToggle {
    /** The ID of the item with a rule element for this toggle */
    itemId?: string;
    label: string;
    domain: string;
    option: string;
    checked: boolean;
    enabled: boolean;
}

/** Any skill or similar which provides a roll option for rolling this save. */
interface Rollable {
}

interface PrototypeTokenSourceExitNihilo extends foundry.data.PrototypeTokenSource {
    flags: foundry.data.PrototypeToken["flags"] & {
        exitNihilo?: {
            linkToActorSize?: boolean;
            autoscale?: boolean;
        };
    };
}

interface PrototypeTokenExitNihilo extends foundry.data.PrototypeToken {
    flags: foundry.data.PrototypeToken["flags"] & {
        exitNihilo: {
            linkToActorSize: boolean;
            autoscale: boolean;
        };
    };
}

export {
    AbilityBasedStatistic,
    ActorFlagsExitNihilo,
    ActorSystemData,
    ActorSystemSource,
    ArmorClassData,
    BaseActorAttributes,
    BaseActorDataExitNihilo,
    BaseActorSourceExitNihilo,
    BaseHitPointsData,
    BaseTraitsData,
    GangUpCircumstance,
    InitiativeData,
    PerceptionData,
    PrototypeTokenExitNihilo,
    RollOptionFlags,
    RollToggle,
    Rollable,
    StrikeData,
    TraitViewData,
};
