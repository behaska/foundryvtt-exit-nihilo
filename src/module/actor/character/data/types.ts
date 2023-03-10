import {
    BaseCreatureData,
    BaseCreatureSource,
    CreatureAttributes,
    CreatureDetails,
    CreatureSystemData,
} from "@actor/creature/data";
import { ActorFlagsExitNihilo, ArmorClassData } from "@actor/data/base";
import { CharacterExitNihilo } from "..";
import { CharacterSheetTabVisibility } from "./sheet";
import { NIVEAUX_DE_VIE } from "./values";

interface CharacterSource extends BaseCreatureSource<"character", CharacterSystemData> {
    flags: DeepPartial<CharacterFlags>;
}

interface CharacterData
    extends Omit<CharacterSource, "data" | "flags" | "effects" | "items" | "prototypeToken" | "system" | "type">,
        BaseCreatureData<CharacterExitNihilo, "character", CharacterSystemData, CharacterSource> {}

type CharacterFlags = ActorFlagsExitNihilo & {
    exitNihilo: {
        favoredWeaponRank: number;
        /** Which sheet tabs are displayed */
        sheetTabs: CharacterSheetTabVisibility;
    };
};

/** The raw information contained within the actor data object for characters. */
interface CharacterSystemData extends CreatureSystemData {
    configuration: ConfigurationDuPersonnage;

    attributs: AttributsDuPersonnage;

    resources: CharacterResources;

    competences: CompetencesDuPersonnage;
}

/** Block de données qui stockent les compétences du personnage (cf. template.json) */
interface CompetencesDuPersonnage {
    /** compétences hors combat */
    communes: CompetencesCommunes;
    /** compétences de combat */
    combat: CompetencesDeCombat;
}

/** Block de données qui stockent les infos de configuration du personnage ou de sa feuille (cf. template.json) */
interface ConfigurationDuPersonnage {
    /** est ce que la feuille de personnage est vérouillée à la modification */
    verrou: boolean;
    /** l'onglet a ouvrir par défaut */
    onglet: string;
    toggles: ConfigurationToggles;
}

interface ConfigurationToggles {
    adulte: boolean;
    adolescence: boolean;
    enfance: boolean;
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
    label: string;
    value: number;
    type: string;
}

type CategoryProficiencies = null;

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
    caracteristiques: Caracteristiques;
    caracteristiquesCalculees: CaracteristiquesDuPersonnage;
    niveauDeVie: NiveauDeVie;
}

interface Caracteristiques {
    physique: Caracteristique;
    agilite: Caracteristique;
    social: Caracteristique;
    esprit: Caracteristique;
    caractere: Caracteristique;
}

interface Caracteristique {
    value: number;
    type: string;
    label: string;
    labelPremiere: string;
    labelDeuxieme: string;
    premierEstPrincipal: string; // Boolean
}

interface CaracteristiquesDuPersonnage {
    puissance: number;
    vitalite: number;
    adresse: number;
    coordination: number;
    raisonnement: number;
    apprentissage: number;
    volonte: number;
    conscience: number;
    communication: number;
    empathie: number;
}

class CaracteristiquesDuPersonnage {
    private constructor() {}

    static from(systemData: CharacterSystemData): CaracteristiquesDuPersonnage {
        const caracteristiques = systemData.attributs.caracteristiques;
        const physique = caracteristiques.physique;
        const agilite = caracteristiques.agilite;
        const esprit = caracteristiques.esprit;
        const caractere = caracteristiques.caractere;
        const social = caracteristiques.social;

        // JSON.parse(physique.premierEstPrincipal)

        let vitalite,
            puissance,
            adresse,
            coordination,
            raisonnement,
            apprentissage,
            conscience,
            volonte,
            communication,
            empathie;
        if (JSON.parse(physique.premierEstPrincipal)) {
            puissance = physique.value + 1;
            vitalite = physique.value;
        } else {
            puissance = physique.value;
            vitalite = physique.value + 1;
        }

        if (JSON.parse(agilite.premierEstPrincipal)) {
            adresse = agilite.value;
            coordination = agilite.value + 1;
        } else {
            adresse = agilite.value + 1;
            coordination = agilite.value;
        }

        if (JSON.parse(esprit.premierEstPrincipal)) {
            raisonnement = esprit.value + 1;
            apprentissage = esprit.value;
        } else {
            raisonnement = esprit.value;
            apprentissage = esprit.value + 1;
        }

        if (JSON.parse(caractere.premierEstPrincipal)) {
            volonte = caractere.value + 1;
            conscience = caractere.value;
        } else {
            volonte = caractere.value;
            conscience = caractere.value + 1;
        }

        if (JSON.parse(social.premierEstPrincipal)) {
            communication = social.value + 1;
            empathie = social.value;
        } else {
            communication = social.value;
            empathie = social.value + 1;
        }

        const result = {
            puissance,
            vitalite,
            adresse,
            coordination,
            raisonnement,
            apprentissage,
            volonte,
            conscience,
            communication,
            empathie,
        };

        return result;
    }
}

type NiveauDeVie = SetElement<typeof NIVEAUX_DE_VIE>;

export {
    AuxiliaryAction,
    CategoryProficiencies,
    CharacterArmorClass,
    Competence,
    CharacterData,
    CharacterDetails,
    CaracteristiquesDuPersonnage,
    CharacterFlags,
    CharacterResources,
    CharacterSource,
    CharacterSystemData,
};
