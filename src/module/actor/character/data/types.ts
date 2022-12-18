import { BaseCreatureData, BaseCreatureSource, CreatureAttributes, CreatureInitiative, CreatureSystemData, CreatureTraitsData, HeldShieldData, SaveData, SkillData } from "@actor/creature/data";
import { ActorFlagsExitNihilo, StrikeData, TraitViewData, ArmorClassData, PerceptionData } from "@actor/data/base";
import { AbilityString } from "@actor/types";
import { CharacterExitNihilo } from "..";
import { CharacterSheetTabVisibility } from "./sheet";

interface CharacterSource extends BaseCreatureSource<"character", CharacterSystemData> {
    flags: DeepPartial<CharacterFlags>;
}

interface CharacterData
    extends Omit<CharacterSource, "data" | "flags" | "effects" | "items" | "prototypeToken" | "system" | "type">,
    BaseCreatureData<CharacterExitNihilo, "character", CharacterSystemData, CharacterSource> { }

type CharacterFlags = ActorFlagsExitNihilo & {
    exitNihilo: {
        /** If applicable, the character's proficiency rank in their deity's favored weapon */
        favoredWeaponRank: number;
        /** Whether items are crafted without consuming resources */
        freeCrafting: boolean;
        /** Whether the alchemist's (and related dedications) Quick Alchemy ability is enabled */
        quickAlchemy: boolean;
        /** Whether ABP should be disabled despite it being on for the world */
        disableABP?: boolean;
        /** Which sheet tabs are displayed */
        sheetTabs: CharacterSheetTabVisibility;
        /** Whether the basic unarmed attack is shown on the Actions tab */
        showBasicUnarmed: boolean;
    };
};

interface CharacterSkillData extends SkillData {
    armor: boolean;
    /** Is this skill a Lore skill? */
    lore?: boolean;
}

/** The raw information contained within the actor data object for characters. */
interface CharacterSystemData extends CreatureSystemData {
    /** Character build data, currently containing ability boosts and flaws */
    build: {
        abilities: {
            /**
               Whether this PC's ability scores are being manually entered rather than drawn from ancestry, background,
               and class
            */
            manual: boolean;

            allowedBoosts: {
                1: number;
                5: number;
                10: number;
                15: number;
                20: number;
            };

            flaws: {
            };
        };
    };

    /** The three save types. */
    saves: CharacterSaves;

    /** Tracks proficiencies for martial (weapon and armor) skills. */
    martial: MartialProficiencies;

    attributes: CharacterAttributes;

    /** A catch-all for character proficiencies */
    proficiencies: {
        /** Spellcasting attack modifiers and DCs for each magical tradition */
        traditions: MagicTraditionProficiencies;
        /** Aliased path components for use by rule element during property injection */
        aliases?: Record<string, string | undefined>;
    };

    traits: CharacterTraitsData;

    /** Pathfinder Society Organized Play */
    pfs: PathfinderSocietyData;

    /** Special strikes which the character can take. */
    actions: CharacterStrike[];

    resources: CharacterResources;

}

interface CharacterSaveData extends SaveData {
    ability: AbilityString;
}
type CharacterSaves = null;

interface CharacterProficiency {
    /** The actual modifier for this martial type. */
    value: number;
    /** Describes how the value was computed. */
    breakdown: string;
    label?: string;
    /** A proficiency in a non-armor/weapon category and not added by a feat or feature */
    custom?: true;
}

/** A proficiency with a rank that depends on another proficiency */
interface MartialProficiency extends Omit<CharacterProficiency, "custom"> {
    /** Can this proficiency be edited or deleted? */
    immutable?: boolean;
}

interface LinkedProficiency extends MartialProficiency {
}

type MagicTraditionProficiencies = null;
type CategoryProficiencies = null;

type BaseWeaponProficiencyKey = `weapon-base`;
type BaseWeaponProficiencies = Record<BaseWeaponProficiencyKey, CharacterProficiency>;

type WeaponGroupProficiencyKey = `weapon-group`;
type WeaponGroupProfiencies = Record<WeaponGroupProficiencyKey, CharacterProficiency>;

type LinkedProficiencies = Record<string, MartialProficiency>;

type MartialProficiencies = CategoryProficiencies &
    BaseWeaponProficiencies &
    WeaponGroupProfiencies &
    LinkedProficiencies;

type MartialProficiencyKey = keyof Required<MartialProficiencies>;

/** The full data for a character action (used primarily for strikes.) */
interface CharacterStrike extends StrikeData {
    slug: string;
    /** Whether this attack is visible on the sheet */
    visible: boolean;
    altUsages: CharacterStrike[];
    auxiliaryActions: AuxiliaryAction[];
    weaponTraits: TraitViewData[];
}

interface AuxiliaryAction {
    label: string;
    img: string;
    execute: () => Promise<void>;
}

/** A Pathfinder Society Faction */
type PFSFaction = "EA" | "GA" | "HH" | "VS" | "RO" | "VW";

/** A Pathfinder Society School */
type PFSSchool = "scrolls" | "spells" | "swords" | null;

/** PFS faction reputation values */
type PathfinderSocietyReputation = Record<PFSFaction, number | null>;

/** Pathfinder Society Organized Play data fields */
interface PathfinderSocietyData {
    /** Number assigned to the player. */
    playerNumber: number | null;
    /** Number assigned to the character. */
    characterNumber: number | null;
    /** Is the character currently affected by a level bump? */
    levelBump: boolean;
    /** Character's currently slotted faction */
    currentFaction: PFSFaction;

    /** Character's Pathfinder school */
    school: PFSSchool;

    /** Character's Reputation with all the factions */
    reputation: PathfinderSocietyReputation;
}

type CharacterArmorClass = Required<ArmorClassData>;

interface CharacterResources {
    /** The current number of focus points and pool size */
    focus: { value: number; max: number; cap: number };
    /** The current and maximum number of hero points */
    heroPoints: { value: number; max: number };
    /** The current and maximum number of invested items */
    investiture: { value: number; max: number };
    crafting: {
        infusedReagents: { value: number; max: number };
    };
}

interface CharacterPerception extends PerceptionData {
}

type CharacterDetails = {
    /** The key ability which class saves (and other class-related things) scale off of. */
    keyability: { value: AbilityString };

    /** How old the character is (user-provided field). */
    age: { value: string };
    /** Character height (user-provided field). */
    height: { value: string };
    /** Character weight (user-provided field). */
    weight: { value: string };
    /** Character gender/pronouns (user-provided field). */
    gender: { value: string };
    /** Character ethnicity (user-provided field). */
    ethnicity: { value: string };
    /** Character nationality (i.e, what nation they hail from; user-provided field). */
    nationality: { value: string };
    /** User-provided biography for their character; value is HTML. */
    biography: {
        /** Character appearance (user-provided field). value is HTML */
        appearance: string;
        /** Character Backstory (user-provided field). value is HTML */
        backstory: string;
        /** Character birthPlace (user-provided field). */
        birthPlace: string;
        /** Character attitude (user-provided field). */
        attitude: string;
        /** Character beliefs (user-provided field). */
        beliefs: string;
        /** Character likes (user-provided field). */
        likes: string;
        /** Character dislikes (user-provided field). */
        dislikes: string;
        /** Character catchphrases (user-provided field). */
        catchphrases: string;
        /** Campaign notes (user-provided field). value is HTML */
        campaignNotes: string;
        /** Character allies (user-provided field). value is HTML */
        allies: string;
        /** Character enemies (user-provided field). value is HTML */
        enemies: string;
        /** Character organaizations (user-provided field). value is HTML */
        organaizations: string;
    };

    /** The amount of experience this character has. */
    xp: {
        /** The current experience value.  */
        value: number;
        /** The minimum amount of experience (almost always '0'). */
        min: number;
        /** The maximum amount of experience before level up (usually '1000', but may differ.) */
        max: number;
        /** COMPUTED: The percentage completion of the current level (value / max). */
        pct: number;
    };

    /** Convenience information for easy access when the item class instance isn't available */
    ancestry: { name: string; trait: string } | null;
    heritage: { name: string; trait: string | null } | null;
    class: { name: string; trait: string } | null;
    deities: CharacterDeities;
};

interface CharacterDeities {
    primary: null;
    secondary: null;
}

interface CharacterAttributes extends CreatureAttributes {
    ac: { value: number };
    /** The perception statistic */
    perception: CharacterPerception;
    /** Used for saves related to class abilities */
    /** The best spell DC, used for certain saves related to feats */
    spellDC: { rank: number; value: number } | null;
    /** The higher between highest spellcasting DC and (if present) class DC */
    classOrSpellDC: { rank: number; value: number };
    /** Initiative, used to determine turn order in combat. */
    initiative: CreatureInitiative;
    /** The amount of HP provided per level by the character's class. */
    classhp: number;
    /** The amount of HP provided at level 1 by the character's ancestry. */
    ancestryhp: number;
    /** The number of hands this character has free */
    handsFree: number;
    /** A bonus to the maximum amount of bulk that this character can carry. */
    bonusLimitBulk: number;
    /** A bonus to the maximum amount of bulk that this character can carry without being encumbered. */
    bonusEncumbranceBulk: number;

    /** The number of familiar abilities this character's familiar has access to. */
    familiarAbilities: { value: number };

    /** Data related to character stamina, when using the variant stamina rules. */
    sp: {
        /** The current number of stamina points. */
        value: number;
        /** The minimum number of stamina points (almost always '0'). */
        min: number;
        /** The maximum number of stamina points. */
        max: number;
        /** Any details about stamina points. */
        details: string;
    };

    /**
     * Data related to the currently equipped shield. This is copied from the shield data itself and exists to
     * allow for the shield health to be shown on an actor shield and token.
     */
    shield: HeldShieldData;

    /** Used in the variant stamina rules; a resource expended to regain stamina/hp. */
    resolve: { value: number; max: number };

    /** Whether this actor is under a polymorph effect */
    polymorphed: boolean;

    /** Whether this actor is under a battle form polymorph effect */
    battleForm: boolean;
}

interface CharacterTraitsData extends CreatureTraitsData {
}

interface GrantedFeat {
    grants: GrantedFeat[];
}

interface SlottedFeat {
    id: string;
    level: number | string;
    grants: GrantedFeat[];
}

interface BonusFeat {
    grants: GrantedFeat[];
}

export {
    AuxiliaryAction,
    BaseWeaponProficiencyKey,
    BonusFeat,
    CategoryProficiencies,
    CharacterArmorClass,
    CharacterAttributes,
    CharacterData,
    CharacterDetails,
    CharacterFlags,
    CharacterProficiency,
    CharacterResources,
    CharacterSaves,
    CharacterSaveData,
    CharacterSkillData,
    CharacterSource,
    CharacterStrike,
    CharacterSystemData,
    GrantedFeat,
    LinkedProficiency,
    MagicTraditionProficiencies,
    MartialProficiencies,
    MartialProficiency,
    MartialProficiencyKey,
    SlottedFeat,
    WeaponGroupProficiencyKey,
};
