import { AbilityBasedStatistic, ActorSystemData, ActorSystemSource, BaseActorAttributes, BaseActorDataExitNihilo, BaseActorSourceExitNihilo, BaseTraitsData, BaseTraitsSource, InitiativeData, Rollable, StrikeData } from "@actor/data/base";
import { CREATURE_ACTOR_TYPES } from "@actor/values";
import { CombatantExitNihilo } from "@module/encounter/combatant";
import { CreatureExitNihilo } from ".";

type BaseCreatureSource<
    TType extends CreatureType = CreatureType,
    TSystemSource extends CreatureSystemSource = CreatureSystemSource
> = BaseActorSourceExitNihilo<TType, TSystemSource>;

interface BaseCreatureData<
    TItem extends CreatureExitNihilo = CreatureExitNihilo,
    TType extends CreatureType = CreatureType,
    TSystemData extends CreatureSystemData = CreatureSystemData,
    TSource extends BaseCreatureSource<TType> = BaseCreatureSource<TType>
> extends Omit<
    BaseCreatureSource<TType>,
    "data" | "system" | "effects" | "flags" | "items" | "prototypeToken" | "type"
>,
    BaseActorDataExitNihilo<TItem, TType, TSystemData, TSource> { }

/** Skill and Lore statistics for rolling. Both short and longform are supported, but eventually only long form will be */
type CreatureSkills = null;

interface CreatureSystemSource extends ActorSystemSource {
    details?: {
        creature?: unknown;
    };

    /** Traits, languages, and other information. */
    traits?: CreatureTraitsSource;
}

type CreatureDetails = {
    /** The creature level for this actor */
    creature?: unknown;
};

interface CreatureSystemData extends CreatureSystemSource, ActorSystemData {
    details: CreatureDetails;

    /** Traits, languages, and other information. */
    traits: CreatureTraitsData;

    attributes: CreatureAttributes;

    actions?: StrikeData[];
}

type CreatureType = typeof CREATURE_ACTOR_TYPES[number];

interface SenseData {
    value?: string;
    source?: string;
}

/** Data describing the value & modifier for a base ability score. */
interface AbilityData {
    /** The ability score: computed from the mod for npcs automatically. */
    value: number;
    /** The modifier for this ability; computed from the value for characters automatically. */
    mod: number;
}

type Abilities = null;

/** A type representing the possible ability strings. */
type Language = keyof ConfigExitNihilo["EXITNIHILO"]["languages"];
type Attitude = keyof ConfigExitNihilo["EXITNIHILO"]["attitude"];
type CreatureTrait = keyof ConfigExitNihilo["EXITNIHILO"]["creatureTraits"];

interface CreatureTraitsSource extends BaseTraitsSource<CreatureTrait> {
}

interface CreatureTraitsData extends BaseTraitsData<CreatureTrait>, Omit<CreatureTraitsSource, "rarity" | "size"> {
}

type SkillData = AbilityBasedStatistic &
    Rollable & {
        lore?: boolean;
        visible?: boolean;
    };

/** The full save data for a character; including its modifiers and other details */
type SaveData = AbilityBasedStatistic & { saveDetail?: string };

type CreatureSaves = null;

/** Miscallenous but mechanically relevant creature attributes.  */
interface CreatureAttributes extends BaseActorAttributes {
}

type MovementType = "land" | "burrow" | "climb" | "fly" | "swim";

interface InitiativeRollResult {
    combatant: CombatantExitNihilo;
}

type CreatureInitiative = InitiativeData;

enum VisionLevels {
    BLINDED,
    NORMAL,
    LOWLIGHT,
    DARKVISION,
}

/** A PC's or NPC's held shield. An NPC's values can be stored directly on the actor or come from a shield item. */
interface HeldShieldData {
    /** The item ID of the shield if in use or otherwise `null` */
    itemId: string | null;
    /** The name of the shield (defaulting to "Shield" if not from a shield item) */
    name: string;
    /** The shield's AC */
    ac: number;
    /** The shield's hardness */
    hardness: number;
    /** The shield's broken threshold */
    brokenThreshold: number;
    /** Whether the shield is raised */
    raised: boolean;
    /** Whether the shield is broken */
    broken: boolean;
    /** Whether the shield is destroyed (hp.value === 0) */
    destroyed: boolean;
    /** An effect icon to use when the shield is raised */
    icon: ImagePath;
}

export {
    Abilities,
    AbilityData,
    Attitude,
    BaseCreatureData,
    BaseCreatureSource,
    CreatureDetails,
    CreatureAttributes,
    CreatureInitiative,
    CreatureSaves,
    CreatureSkills,
    CreatureSystemData,
    CreatureSystemSource,
    CreatureTrait,
    CreatureTraitsData,
    CreatureTraitsSource,
    CreatureType,
    HeldShieldData,
    InitiativeRollResult,
    Language,
    MovementType,
    SaveData,
    SenseData,
    SkillData,
    VisionLevels,
};
