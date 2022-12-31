/** Register Handlebars template partials */
export function registerTemplates(): void {
    const templatePaths = [
        // Feuille de Personnage
        "systems/exit-nihilo/templates/actors/character/partials/header.html",
        "systems/exit-nihilo/templates/actors/character/tabs/general.html",
        "systems/exit-nihilo/templates/actors/character/tabs/equipement.html",
        "systems/exit-nihilo/templates/actors/character/tabs/historique.html",
        "systems/exit-nihilo/templates/actors/character/tabs/competences.html",
        "systems/exit-nihilo/templates/actors/character/tabs/combat.html",
        "systems/exit-nihilo/templates/actors/character/sidebar/sante.html",
        "systems/exit-nihilo/templates/actors/character/sidebar/jauges.html",
        "systems/exit-nihilo/templates/actors/character/sidebar/caracteristiques.html",
        "systems/exit-nihilo/templates/actors/character/sidebar/attributs.html",

        // Composants
        "systems/exit-nihilo/templates/partials/pentagon-composant.html",
        "systems/exit-nihilo/templates/partials/competence-composant.html",
        "systems/exit-nihilo/templates/partials/competence-complexe-composant.html",
    ];

    loadTemplates(templatePaths);
}
