const BONNE_SANTE = {
    label: "EXITNIHILO.personnage.attributs.niveau-de-vie.bonne-sante",
    value: 0
};
const LEGEREMENT_BLESSE = {
    label: "EXITNIHILO.personnage.attributs.niveau-de-vie.legerement-blesse",
    value: 1
};
const BLESSE = {
    label: "EXITNIHILO.personnage.attributs.niveau-de-vie.blesse",
    value: 2
};
const GRIEVEMENT_BLESSE = {
    label: "EXITNIHILO.personnage.attributs.niveau-de-vie.grievement-blesse",
    value: 3
};
const MOURANT = {
    label: "EXITNIHILO.personnage.attributs.niveau-de-vie.mourant",
    value: 4
};


export const NIVEAUX_DE_VIE = new Set([BONNE_SANTE, LEGEREMENT_BLESSE, BLESSE, GRIEVEMENT_BLESSE, MOURANT] as const);
