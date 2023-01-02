import { CharacterExitNihilo } from "@actor/character";
import { ActorType } from "@actor/data";
import { NPCExitNihilo } from "@actor/npc/document";
import { ArmorExitNihilo } from "@item/armor/document";
import { ContainerExitNihilo } from "@item/container/document";
import { EquipmentExitNihilo } from "@item/equipment/document";
import { WeaponExitNihilo } from "@item/weapon/document";
import { JournalSheetExitNihilo } from "@module/journal-entry/sheet";

export type StatusEffectIconTheme = "default" | "blackWhite";

const actorTypes: Record<ActorType, string> = {
    character: "ACTOR.TypeCharacter",
    npc: "ACTOR.TypeNpc",
};

/** Non-detection- and attitude- related conditions added to the Token HUD */
const tokenHUDConditions = {
    blinded: "EXITNIHILO.ConditionTypeBlinded",
    broken: "EXITNIHILO.ConditionTypeBroken",
    clumsy: "EXITNIHILO.ConditionTypeClumsy",
    concealed: "EXITNIHILO.ConditionTypeConcealed",
    confused: "EXITNIHILO.ConditionTypeConfused",
    controlled: "EXITNIHILO.ConditionTypeControlled",
    dazzled: "EXITNIHILO.ConditionTypeDazzled",
    deafened: "EXITNIHILO.ConditionTypeDeafened",
    doomed: "EXITNIHILO.ConditionTypeDoomed",
    drained: "EXITNIHILO.ConditionTypeDrained",
    dying: "EXITNIHILO.ConditionTypeDying",
    encumbered: "EXITNIHILO.ConditionTypeEncumbered",
    enfeebled: "EXITNIHILO.ConditionTypeEnfeebled",
    fascinated: "EXITNIHILO.ConditionTypeFascinated",
    fatigued: "EXITNIHILO.ConditionTypeFatigued",
    "flat-footed": "EXITNIHILO.ConditionTypeFlatFooted",
    fleeing: "EXITNIHILO.ConditionTypeFleeing",
    frightened: "EXITNIHILO.ConditionTypeFrightened",
    grabbed: "EXITNIHILO.ConditionTypeGrabbed",
    immobilized: "EXITNIHILO.ConditionTypeImmobilized",
    invisible: "EXITNIHILO.ConditionTypeInvisible",
    paralyzed: "EXITNIHILO.ConditionTypeParalyzed",
    "persistent-damage": "EXITNIHILO.ConditionTypePersistent",
    petrified: "EXITNIHILO.ConditionTypePetrified",
    prone: "EXITNIHILO.ConditionTypeProne",
    quickened: "EXITNIHILO.ConditionTypeQuickened",
    restrained: "EXITNIHILO.ConditionTypeRestrained",
    sickened: "EXITNIHILO.ConditionTypeSickened",
    slowed: "EXITNIHILO.ConditionTypeSlowed",
    stunned: "EXITNIHILO.ConditionTypeStunned",
    stupefied: "EXITNIHILO.ConditionTypeStupefied",
    unconscious: "EXITNIHILO.ConditionTypeUnconscious",
    undetected: "EXITNIHILO.ConditionTypeUndetected",
    wounded: "EXITNIHILO.ConditionTypeWounded",
};

const weaponCategories = {
    simple: "EXITNIHILO.WeaponTypeSimple",
    martial: "EXITNIHILO.WeaponTypeMartial",
    advanced: "EXITNIHILO.WeaponTypeAdvanced",
    unarmed: "EXITNIHILO.WeaponTypeUnarmed",
};

/** Base weapon types that are considered equivalent for all rules purposes */
const equivalentWeapons = {
    "composite-longbow": "longbow",
    "composite-shortbow": "shortbow",
    "big-boom-gun": "hand-cannon",
    "spoon-gun": "hand-cannon",
} as const;

export const EXITNIHILOCONFIG = {
    chatDamageButtonShieldToggle: false,

    genres: {
        "male": "EXITNIHILO.Personnage.Genres.Male.Titre",
        "femelle": "EXITNIHILO.Personnage.Genres.Femelle.Titre",
        "autres": "EXITNIHILO.Personnage.Genres.Autres.Titre",
    },

    niveauxDeSante: {
        "pleineSante": "EXITNIHILO.Personnage.Sante.NiveauDeSante.pleineSante.Titre",
        "legerementBlesse": "EXITNIHILO.Personnage.Sante.NiveauDeSante.legerementBlesse.Titre",
        "blesse": "EXITNIHILO.Personnage.Sante.NiveauDeSante.blesse.Titre",
        "grievementBlesse": "EXITNIHILO.Personnage.Sante.NiveauDeSante.grievementBlesse.Titre",
        "mourant": "EXITNIHILO.Personnage.Sante.NiveauDeSante.mourant.Titre",
        "mort": "EXITNIHILO.Personnage.Sante.NiveauDeSante.mort.Titre",

    },

    roles: {
        protecteur: "EXITNIHILO.Personnage.Roles.Protecteur.Titre",
        approvisionneur: "EXITNIHILO.Personnage.Roles.Approvisionneur.Titre",
        dirigeant: "EXITNIHILO.Personnage.Roles.Dirigeant.Titre",
        animateur: "EXITNIHILO.Personnage.Roles.Animateur.Titre",
        soigneur: "EXITNIHILO.Personnage.Roles.Soigneur.Titre",
        sachant: "EXITNIHILO.Personnage.Roles.Sachant.Titre",
        bricoleur: "EXITNIHILO.Personnage.Roles.Bricoleur.Titre",
    },

    statusEffects: {
        lastIconTheme: "default" as StatusEffectIconTheme,
        iconDir: "systems/exit-nihilo/icons/conditions/",
        conditions: tokenHUDConditions,
    },

    actorTypes,

    attributes: {
        perception: "EXITNIHILO.PerceptionLabel",
        stealth: "EXITNIHILO.StealthLabel",
        initiative: "EXITNIHILO.PerceptionLabel",
    },

    dcAdjustments: {
        "incredibly easy": "EXITNIHILO.DCAdjustmentIncrediblyEasy",
        "very easy": "EXITNIHILO.DCAdjustmentVeryEasy",
        easy: "EXITNIHILO.DCAdjustmentEasy",
        normal: "EXITNIHILO.DCAdjustmentNormal",
        hard: "EXITNIHILO.DCAdjustmentHard",
        "very hard": "EXITNIHILO.DCAdjustmentVeryHard",
        "incredibly hard": "EXITNIHILO.DCAdjustmentIncrediblyHard",
    },

    skills: {
        acr: "EXITNIHILO.SkillAcr",
        arc: "EXITNIHILO.SkillArc",
        ath: "EXITNIHILO.SkillAth",
        cra: "EXITNIHILO.SkillCra",
        dec: "EXITNIHILO.SkillDec",
        dip: "EXITNIHILO.SkillDip",
        itm: "EXITNIHILO.SkillItm",
        med: "EXITNIHILO.SkillMed",
        nat: "EXITNIHILO.SkillNat",
        occ: "EXITNIHILO.SkillOcc",
        prf: "EXITNIHILO.SkillPrf",
        rel: "EXITNIHILO.SkillRel",
        soc: "EXITNIHILO.SkillSoc",
        ste: "EXITNIHILO.SkillSte",
        sur: "EXITNIHILO.SkillSur",
        thi: "EXITNIHILO.SkillThi",
    },

    martialSkills: {
        unarmored: "EXITNIHILO.MartialUnarmored",
        light: "EXITNIHILO.MartialLight",
        medium: "EXITNIHILO.MartialMedium",
        heavy: "EXITNIHILO.MartialHeavy",
        simple: "EXITNIHILO.MartialSimple",
        martial: "EXITNIHILO.MartialMartial",
        advanced: "EXITNIHILO.MartialAdvanced",
        unarmed: "EXITNIHILO.MartialUnarmed",
    },

    currencies: {
        pp: "EXITNIHILO.CurrencyPP",
        gp: "EXITNIHILO.CurrencyGP",
        sp: "EXITNIHILO.CurrencySP",
        cp: "EXITNIHILO.CurrencyCP",
    },

    damageSubtypes: {
        persistent: "EXITNIHILO.ConditionTypePersistentShort",
        splash: "EXITNIHILO.TraitSplash",
    },

    stackGroups: {
        arrows: "EXITNIHILO.StackGroupArrows",
        bolts: "EXITNIHILO.StackGroupBolts",
        slingBullets: "EXITNIHILO.StackGroupSlingBullets",
        blowgunDarts: "EXITNIHILO.StackGroupBlowgunDarts",
        woodenTaws: "EXITNIHILO.StackGroupWoodenTaws",
        rounds5: "EXITNIHILO.StackGroupRounds5",
        rounds10: "EXITNIHILO.StackGroupRounds10",
        rations: "EXITNIHILO.StackGroupRations",
        coins: "EXITNIHILO.StackGroupCoins",
        gems: "EXITNIHILO.StackGroupGems",
        sacks: "EXITNIHILO.StackGroupSacks",
    },

    weaponDamage: {
        bludgeoning: "EXITNIHILO.TraitBludgeoning",
        piercing: "EXITNIHILO.TraitPiercing",
        slashing: "EXITNIHILO.TraitSlashing",
        modular: "EXITNIHILO.TraitModular",
    },

    healingTypes: {
        healing: "EXITNIHILO.TraitHealing",
        temphp: "EXITNIHILO.HealingTypeTemporaryHealing",
    },

    weaponCategories,
    equivalentWeapons,

    weaponDescriptions: {
        club: "EXITNIHILO.WeaponDescriptionClub",
        knife: "EXITNIHILO.WeaponDescriptionKnife",
        brawling: "EXITNIHILO.WeaponDescriptionBrawling",
        spear: "EXITNIHILO.WeaponDescriptionSpear",
        sword: "EXITNIHILO.WeaponDescriptionSword",
        axe: "EXITNIHILO.WeaponDescriptionAxe",
        flail: "EXITNIHILO.WeaponDescriptionFlail",
        polearm: "EXITNIHILO.WeaponDescriptionPolearm",
        pick: "EXITNIHILO.WeaponDescriptionPick",
        hammer: "EXITNIHILO.WeaponDescriptionHammer",
        shield: "EXITNIHILO.WeaponDescriptionShield",
        dart: "EXITNIHILO.WeaponDescriptionDart",
        bow: "EXITNIHILO.WeaponDescriptionBow",
        sling: "EXITNIHILO.WeaponDescriptionSling",
        bomb: "EXITNIHILO.WeaponDescriptionBomb",
    },

    weaponHands: {
        1: "EXITNIHILO.WeaponHands1",
        "1+": "EXITNIHILO.WeaponHands1Plus",
        2: "EXITNIHILO.WeaponHands2",
    },

    armorTypes: {
        unarmored: "EXITNIHILO.ArmorTypeUnarmored",
        light: "EXITNIHILO.ArmorTypeLight",
        medium: "EXITNIHILO.ArmorTypeMedium",
        heavy: "EXITNIHILO.ArmorTypeHeavy",
        shield: "EXITNIHILO.ArmorTypeShield",
    },

    armorGroups: {
        composite: "EXITNIHILO.ArmorGroupComposite",
        chain: "EXITNIHILO.ArmorGroupChain",
        cloth: "EXITNIHILO.ArmorGroupCloth",
        leather: "EXITNIHILO.ArmorGroupLeather",
        plate: "EXITNIHILO.ArmorGroupPlate",
    },

    attitude: {
        hostile: "EXITNIHILO.Attitudes.Hostile",
        unfriendly: "EXITNIHILO.Attitudes.Unfriendly",
        indifferent: "EXITNIHILO.Attitudes.Indifferent",
        friendly: "EXITNIHILO.Attitudes.Friendly",
        helpful: "EXITNIHILO.Attitudes.Helpful",
    },

    skillList: {
        acrobatics: "EXITNIHILO.SkillAcrobatics",
        arcana: "EXITNIHILO.SkillArcana",
        athletics: "EXITNIHILO.SkillAthletics",
        crafting: "EXITNIHILO.SkillCrafting",
        deception: "EXITNIHILO.SkillDeception",
        diplomacy: "EXITNIHILO.SkillDiplomacy",
        intimidation: "EXITNIHILO.SkillIntimidation",
        medicine: "EXITNIHILO.SkillMedicine",
        nature: "EXITNIHILO.SkillNature",
        occultism: "EXITNIHILO.SkillOccultism",
        performance: "EXITNIHILO.SkillPerformance",
        religion: "EXITNIHILO.SkillReligion",
        society: "EXITNIHILO.SkillSociety",
        stealth: "EXITNIHILO.SkillStealth",
        survival: "EXITNIHILO.SkillSurvival",
        thievery: "EXITNIHILO.SkillThievery",
        lore: "EXITNIHILO.SkillLore",
    },

    actionTypes: {
        action: "EXITNIHILO.ActionTypeAction",
        reaction: "EXITNIHILO.ActionTypeReaction",
        free: "EXITNIHILO.ActionTypeFree",
        passive: "EXITNIHILO.ActionTypePassive",
    },

    actionsNumber: {
        1: "EXITNIHILO.ActionNumber1",
        2: "EXITNIHILO.ActionNumber2",
        3: "EXITNIHILO.ActionNumber3",
    },

    actionCategories: {
        interaction: "EXITNIHILO.ActionCategoryInteraction",
        defensive: "EXITNIHILO.ActionCategoryDefensive",
        offensive: "EXITNIHILO.ActionCategoryOffensive",
    },

    speedTypes: {
        swim: "EXITNIHILO.SpeedTypesSwim",
        climb: "EXITNIHILO.SpeedTypesClimb",
        fly: "EXITNIHILO.SpeedTypesFly",
        burrow: "EXITNIHILO.SpeedTypesBurrow",
    },

    prerequisitePlaceholders: {
    },

    pfsFactions: {
    },

    pfsSchools: {
    },

    // Languages, alphabetical by common, uncommon, secret
    languages: {
    },

    attackEffects: {
        grab: "EXITNIHILO.AttackEffectGrab",
        "improved-grab": "EXITNIHILO.AttackEffectImprovedGrab",
        constrict: "EXITNIHILO.AttackEffectConstrict",
        "greater-constrict": "EXITNIHILO.AttackEffectGreaterConstrict",
        knockdown: "EXITNIHILO.AttackEffectKnockdown",
        "improved-knockdown": "EXITNIHILO.AttackEffectImprovedKnockdown",
        push: "EXITNIHILO.AttackEffectPush",
        "improved-push": "EXITNIHILO.AttackEffectImprovedPush",
        trip: "EXITNIHILO.AttackEffectTrip",
    },

    // Year offsets relative to the current actual year
    worldClock: {
    },

    monsterAbilities: () => {
        return {
        };
    },

    SETTINGS: {
    },

    Actor: {
        documentClasses: {
            character: CharacterExitNihilo,
            npc: NPCExitNihilo,
        },
    },

    Item: {
        documentClasses: {
            armor: ArmorExitNihilo,
            container: ContainerExitNihilo,
            equipment: EquipmentExitNihilo,
            weapon: WeaponExitNihilo,
        },
    },

    JournalEntry: { sheetClass: JournalSheetExitNihilo },

    Canvas: {
        darkness: {
            default: CONFIG.Canvas.darknessColor,
            gmVision: 0x76739e,
        },
    },
};
