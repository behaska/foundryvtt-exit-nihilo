export const ATTRIBUTE_ABBREVIATIONS = new Set(["phy", "adr", "int", "psy", "soc"] as const);

export const CREATURE_ACTOR_TYPES = ["character", "npc"] as const;

export const SKILL_ABBREVIATIONS = new Set([
    "arg",
    "art",
    "ath",
    "bar",
    "bri",
    "che",
    "cui",
    "cul",
    "dis",
    "equ",
    "esq",
    "inf",
    "lan",
    "man",
    "nag",
    "per",
] as const);


export const SKILL_DICTIONARY = {
    arg: "argumenter",
    art: "arts",
    ath: "athletisme",
    bar: "baratin",
    bri: "bricolage",
    che: "chercher",
    cui: "cuisine",
    cul: "culture",
    dis: "discretion",
    equ: "equitation",
    esq: "esquive",
    inf: "influencer",
    lan: "langues",
    man: "manipulation",
    nag: "nager",
    per: "perception",
} as const;

export const SKILL_LONG_FORMS = new Set(Object.values(SKILL_DICTIONARY));