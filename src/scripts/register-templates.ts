/** Register Handlebars template partials */
export function registerTemplates(): void {
    const templatePaths = [
        // PC Sheet
        "systems/exit-nihilo/templates/actors/character/partials/header.html",
        "systems/exit-nihilo/templates/actors/character/tabs/general.html",
        "systems/exit-nihilo/templates/actors/character/tabs/inventory.html",
        "systems/exit-nihilo/templates/actors/character/sidebar/health.html"
    ];

    loadTemplates(templatePaths);
}
