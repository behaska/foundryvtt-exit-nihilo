const BONNE_SANTE = {
    label: "tor2e.personnage.attributs.niveau-de-vie.bonne-sante",
    value: 0
};
const LEGEREMENT_BLESSE = {
    label: "tor2e.personnage.attributs.niveau-de-vie.legerement-blesse",
    value: 1
};
const BLESSE = {
    label: "tor2e.personnage.attributs.niveau-de-vie.blesse",
    value: 2
};
const GRIEVEMENT_BLESSE = {
    label: "tor2e.personnage.attributs.niveau-de-vie.grievement-blesse",
    value: 3
};
const MOURANT = {
    label: "tor2e.personnage.attributs.niveau-de-vie.mourant",
    value: 4
};


export const NIVEAUX_DE_VIE = new Set([BONNE_SANTE, LEGEREMENT_BLESSE, BLESSE, GRIEVEMENT_BLESSE, MOURANT] as const);
