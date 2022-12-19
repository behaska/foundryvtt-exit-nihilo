import { BaseCreatureData, BaseCreatureSource, CreatureAttributes, CreatureDetails, CreatureSystemData, CreatureTraitsData } from "@actor/creature/data";
import { ActorFlagsExitNihilo, StrikeData, TraitViewData, ArmorClassData } from "@actor/data/base";
import { CharacterExitNihilo } from "..";
import { CharacterSheetTabVisibility } from "./sheet";
import { NIVEAUX_DE_VIE } from "./values";

interface CharacterSource extends BaseCreatureSource<"character", CharacterSystemData> {
    flags: DeepPartial<CharacterFlags>;
}

interface CharacterData
    extends Omit<CharacterSource, "data" | "flags" | "effects" | "items" | "prototypeToken" | "system" | "type">,
    BaseCreatureData<CharacterExitNihilo, "character", CharacterSystemData, CharacterSource> { }

type CharacterFlags = ActorFlagsExitNihilo & {
    exitNihilo: {
        favoredWeaponRank: number;
        /** Which sheet tabs are displayed */
        sheetTabs: CharacterSheetTabVisibility;
    };
};

/** The raw information contained within the actor data object for characters. */
interface CharacterSystemData extends CreatureSystemData {
    attributs: AttributsDuPersonnage;

    resources: CharacterResources;

    traits: CharacterTraitsData;

    competences: CompetencesDuPersonnage;
}

/** Block de données qui stockent les compétences du personnage (cf. template.json) */
interface CompetencesDuPersonnage {
    /** compétences hors combat */
    communes: CompetencesCommunes;
    /** compétences de combat */
    combat: CompetencesDeCombat;
}

/** Block de données qui stockent les compétences communes du personnage (cf. template.json) */
interface CompetencesCommunes {
    argumenter: Competence;
    art1: Competence;
    art2: Competence;
    athletisme: Competence;
    baratin: Competence;
    bricolage: Competence;
    chercher: Competence;
    cuisine: Competence;
    discretion: Competence;
    dressage: Competence;
    equitation: Competence;
    esquive: Competence;
    grimper: Competence;
    jardinage: Competence;
    langues: Competence;
    manipulation: Competence;
    nager: Competence;
    perception: Competence;
    pilotage: Competence;
    premiersSoins: Competence;
    profession1: Competence;
    profession2: Competence;
    psychologie: Competence;
    surgie: Competence;
    technologie: Competence;
}

/** Block de données qui stockent les compétences de combat du personnage (cf. template.json) */
interface CompetencesDeCombat {
    corpsACorps: Competence;
    corpsACorpsArme: Competence;
    armeAProjectile: Competence;
    armeDePoing: Competence;
    fusil: Competence;
    fusilDAssaut: Competence;
    fusilDePrecision: Competence;
    explosif: Competence;
}

/** Block de données qui stockent les compétences de combat du personnage (cf. template.json) */
interface Competence {
}

type CategoryProficiencies = null;

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

type CharacterArmorClass = Required<ArmorClassData>;

interface CharacterResources {
    /** The current number of focus points and pool size */
    humanite: { value: number; max: number; cap: number };
    /** The current and maximum number of hero points */
    resilience: { value: number; max: number };
    /** The current and maximum number of invested items */
}

type CharacterDetails = Omit<CreatureDetails, "level"> & {
    /** How old the character is (user-provided field). */
    age: { value: string };
    /** Character height (user-provided field). */
    taille: { value: string };
    /** Character weight (user-provided field). */
    poids: { value: string };
    /** Character gender/pronouns (user-provided field). */
    genre: { value: string };
    /** Character ethnicity (user-provided field). */
    ethnie: { value: string };
    /** Character nationality (i.e, what nation they hail from; user-provided field). */
    nationalite: { value: string };
    /** User-provided biography for their character; value is HTML. */
    biography: {
        /** Character appearance (user-provided field). value is HTML */
        apparence: string;
        /** Character Backstory (user-provided field). value is HTML */
        histoire: string;
        /** Character birthPlace (user-provided field). */
        lieuDeNaissance: string;
        /** Character attitude (user-provided field). */
        attitude: string;
        /** Character beliefs (user-provided field). */
        croyances: string;
        /** Character likes (user-provided field). */
        gouts: string;
        /** Character dislikes (user-provided field). */
        aversions: string;
        /** Character catchphrases (user-provided field). */
        slogans: string;
        /** Campaign notes (user-provided field). value is HTML */
        notes: string;
        /** Character allies (user-provided field). value is HTML */
        allies: string;
        /** Character enemies (user-provided field). value is HTML */
        ennemis: string;
        /** Character organaizations (user-provided field). value is HTML */
        organisations: string;
    };

    /** Convenience information for easy access when the item class instance isn't available */
    profession: { name: string; trait: string | null } | null;
    role: { name: string; trait: string } | null;
};

interface AttributsDuPersonnage extends CreatureAttributes {
    caracteristiques: CaracteristiquesDuPersonnage;
    niveauDeVie: NiveauDeVie;
}

interface CaracteristiquesDuPersonnage {
    physique: CaracteristiquesPhysique;
    adresse: CaracteristiquesAdresse;
    social: CaracteristiquesSocial;
    intellect: CaracteristiquesIntellect;
    caractere: CaracteristiquesCaractere;
}

interface CaracteristiquesPhysique {
    label: string;
    base: number;
    puissance: Caracteristique;
    vitalite: Caracteristique;
}
interface CaracteristiquesAdresse {
    label: string;
    base: number;
    agilite: Caracteristique;
    precision: Caracteristique;
}
interface CaracteristiquesSocial {
    label: string;
    base: number;
    communication: Caracteristique;
    empathie: Caracteristique;
}
interface CaracteristiquesIntellect {
    label: string;
    base: number;
    raisonnement: Caracteristique;
    apprentissage: Caracteristique;
}
interface CaracteristiquesCaractere {
    label: string;
    base: number;
    volonte: Caracteristique;
    intuition: Caracteristique;
}

interface Caracteristique {
    label: string;
    value: number;
}

type NiveauDeVie = SetElement<typeof NIVEAUX_DE_VIE>;

interface CharacterTraitsData extends CreatureTraitsData {
}

export {
    AuxiliaryAction,
    CategoryProficiencies,
    CharacterArmorClass,
    AttributsDuPersonnage as CharacterAttributes,
    CharacterData,
    CharacterDetails,
    CharacterFlags,
    CharacterResources,
    CharacterSource,
    CharacterStrike,
    CharacterSystemData,
};