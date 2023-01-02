import { BaseCreatureSource, BaseCreatureData, CreatureSystemSource, CreatureSystemData, CreatureDetails, SaveData, SkillData } from "@actor/creature/data";
import { ActorFlagsExitNihilo, StrikeData, PerceptionData } from "@actor/data/base";
import { AbilityString } from "@actor/types";
import { ValueAndMax } from "@module/data";
import { NPCExitNihilo } from ".";

interface NPCSource extends BaseCreatureSource<"npc", NPCSystemSource> {
    flags: DeepPartial<NPCFlags>;
}

interface NPCData
    extends Omit<NPCSource, "data" | "system" | "effects" | "items" | "prototypeToken" | "type">,
    BaseCreatureData<NPCExitNihilo, "npc", NPCSystemData, NPCSource> {
    flags: NPCFlags;
}

type NPCFlags = ActorFlagsExitNihilo & {
    exitNihilo: { lootable: boolean };
};

interface NPCSystemSource extends CreatureSystemSource {
    /** Any special attributes for this NPC, such as AC or health. */
    attributes: NPCAttributesSource;

    /** Details about this actor, such as alignment or ancestry. */
    details: NPCDetailsSource;

    resources: {
        focus?: ValueAndMax;
    };
}

interface NPCAttributesSource {
}

/** The raw information contained within the actor data object for NPCs. */
interface NPCSystemData extends Omit<CreatureSystemData, "senses">, NPCSystemSource {

    /** Details about this actor, such as alignment or ancestry. */
    details: NPCDetails;

    /** Skills that this actor possesses; skills the actor is actually trained on are marked 'visible'. */
    skills: Record<string, NPCSkillData>;

    /** Special strikes which the creature can take. */
    actions: NPCStrike[];

    resources: {
        focus?: { value: number; max: number };
    };
}

interface NPCDetailsSource extends Omit<CreatureDetails, "creature"> {
    creature?: unknown;

    /** The type of this creature (such as 'undead') */
    creatureType: string;
    /** A very brief description */
    blurb: string;
    /** The in depth descripton and any other public notes */
    publicNotes: string;
    /** The private GM notes */
    privateNotes: string;
}

interface NPCDetails extends NPCDetailsSource {
    creature?: unknown;
}

/** The full data for a NPC action (used primarily for strikes.) */
interface NPCStrike extends StrikeData {
    /** The type of attack as a localization string */
    attackRollType?: string;
    /** The id of the item this strike is generated from */
    sourceId?: string;
    /** A list of all damage roll parts */
    damageBreakdown?: string[];
    /** Additional effects from a successful strike, like "Grab" */
    additionalEffects: { tag: string; label: string }[];
    /** A melee usage of a firearm: not available on NPC strikes */
    altUsages?: never;
}

/** Save data with an additional "base" value */
interface NPCSaveData extends SaveData {
    ability: AbilityString;
    base?: number;
    saveDetail: string;
}

/** Perception data with an additional "base" value */
interface NPCPerception extends PerceptionData {
    rank?: number;
    base?: number;
}

/** Skill data with a "base" value and whether the skill should be rendered (visible) */
interface NPCSkillData extends SkillData {
    base?: number;
    visible?: boolean;
    isLore?: boolean;
    itemID?: string;
    ability: AbilityString;
    label: string;
    expanded: string;
}

export {
    NPCAttributesSource,
    NPCData,
    NPCFlags,
    NPCPerception,
    NPCSaveData,
    NPCSkillData,
    NPCSource,
    NPCStrike,
    NPCSystemData,
    NPCSystemSource,
};
