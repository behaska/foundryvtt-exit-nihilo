import { ActorExitNihilo } from "./base";
import { TraitViewData } from "./data/base";
import { ATTRIBUTE_ABBREVIATIONS, SKILL_ABBREVIATIONS, SKILL_LONG_FORMS } from "./values";

type AbilityString = SetElement<typeof ATTRIBUTE_ABBREVIATIONS>;

interface ActorDimensions {
    length: number;
    width: number;
    height: number;
}

type SkillAbbreviation = SetElement<typeof SKILL_ABBREVIATIONS>;
type SkillLongForm = SetElement<typeof SKILL_LONG_FORMS>;

type ActorAlliance = "party" | "opposition" | null;

interface AuraData {
    slug: string;
    radius: number;
    effects: AuraEffectData[];
    colors: AuraColors | null;
}

interface AuraEffectData {
    uuid: string;
    level: number | null;
    affects: "allies" | "enemies" | "all";
    events: ("enter" | "turn-start" | "turn-end")[];
    save: {
        dc: number;
    } | null;
    removeOnExit: boolean;
}

interface AuraColors {
    border: `#${string}`;
    fill: `#${string}`;
}

/* -------------------------------------------- */
/*  Attack Rolls                                */
/* -------------------------------------------- */

type AttackItem = null;

interface StrikeSelf<A extends ActorExitNihilo = ActorExitNihilo, I extends AttackItem = AttackItem> {
    actor: A;
    /** The item used for the strike */
    item: I;
}

interface AttackTarget {
    actor: ActorExitNihilo;
    distance: number;
    rangeIncrement: number | null;
}

/** Context for the attack or damage roll of a strike */
interface StrikeRollContext<A extends ActorExitNihilo, I extends AttackItem> {
    /** Roll options */
    options: Set<string>;
    self: StrikeSelf<A, I>;
    target: AttackTarget | null;
    traits: TraitViewData[];
}

interface StrikeRollContextParams<T extends AttackItem> {
    item: T;
    /** Domains from which to draw roll options */
    domains: string[];
    /** Initial roll options for the strike */
    options: Set<string>;
    /** Whether the request is for display in a sheet view. If so, targets are not considered */
    viewOnly?: boolean;
}

interface AttackRollContext<A extends ActorExitNihilo, I extends AttackItem> extends StrikeRollContext<A, I> {
}

export {
    AbilityString,
    ActorAlliance,
    ActorDimensions,
    AttackItem,
    AttackRollContext,
    AttackTarget,
    AuraColors,
    AuraData,
    AuraEffectData,
    SkillAbbreviation,
    SkillLongForm,
    StrikeRollContext,
    StrikeRollContextParams,
    StrikeSelf,
};
