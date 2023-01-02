/** Register Handlebars template partials */
export function registerTemplates(): void {
    const templatePaths = [
        // Feuille de Personnage
        "systems/exit-nihilo/templates/actors/character/partials/header.hbs",
        "systems/exit-nihilo/templates/actors/character/tabs/general.hbs",
        "systems/exit-nihilo/templates/actors/character/tabs/equipement.hbs",
        "systems/exit-nihilo/templates/actors/character/tabs/historique.hbs",
        "systems/exit-nihilo/templates/actors/character/tabs/competences.hbs",
        "systems/exit-nihilo/templates/actors/character/tabs/combat.hbs",
        "systems/exit-nihilo/templates/actors/character/sidebar/sante.hbs",
        "systems/exit-nihilo/templates/actors/character/sidebar/jauges.hbs",
        "systems/exit-nihilo/templates/actors/character/sidebar/caracteristiques.hbs",
        "systems/exit-nihilo/templates/actors/character/sidebar/attributs.hbs",

        // Composants
        "systems/exit-nihilo/templates/partials/pentagon-composant.hbs",
        "systems/exit-nihilo/templates/partials/competence-composant.hbs",
        "systems/exit-nihilo/templates/partials/competence-composant-de-combat.hbs",
        "systems/exit-nihilo/templates/partials/competence-complexe-composant.hbs",
    ];

    loadTemplates(templatePaths);
}
