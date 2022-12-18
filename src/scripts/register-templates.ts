/** Register Handlebars template partials */
export function registerTemplates(): void {
    const templatePaths = [
        // PC Sheet
        "systems/exit-nihilo/templates/actors/character/partials/header.html",
        "systems/exit-nihilo/templates/actors/character/tabs/general.html",
        "systems/exit-nihilo/templates/actors/character/tabs/equipement.html",
        "systems/exit-nihilo/templates/actors/character/tabs/historique.html",
        "systems/exit-nihilo/templates/actors/character/tabs/competences.html",
        "systems/exit-nihilo/templates/actors/character/sidebar/sante.html",
        "systems/exit-nihilo/templates/actors/character/sidebar/jauges.html",
        "systems/exit-nihilo/templates/actors/character/sidebar/attributs.html"
    ];

    loadTemplates(templatePaths);
}
