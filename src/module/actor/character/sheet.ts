import { CreatureSheetExitNihilo } from "@actor/creature/sheet";
import { CharacterExitNihilo } from ".";
import { CharacterSheetData, ExitNihiloDisplayGenre, ExitNihiloDisplayNiveauDeSante, ExitNihiloDisplayRole } from "./data/sheet";

class CharacterSheetExitNihilo extends CreatureSheetExitNihilo<CharacterExitNihilo> {

    static override get defaultOptions(): ActorSheetOptions {
        const options = super.defaultOptions;
        options.classes = [...options.classes, "character"];
        options.width = 800;
        options.height = 850;
        options.scrollY.push(".tab.active .tab-content");
        options.tabs = [
            { navSelector: ".sheet-navigation", contentSelector: ".sheet-content", initial: "general" },
            { navSelector: ".actions-nav", contentSelector: ".actions-panels", initial: "encounter" },
        ];
        return options;
    }

    override get template(): string {
        const template = this.actor.limited && !game.user.isGM ? "limited" : "sheet";
        return `systems/exit-nihilo/templates/actors/character/${template}.html`;
    }

    override async getData(options?: ActorSheetOptions): Promise<CharacterSheetData> {
        const sheetData = (await super.getData(options)) as CharacterSheetData;
        sheetData.roles = CONFIG.EXITNIHILO.roles;
        sheetData.genres = CONFIG.EXITNIHILO.genres;
        sheetData.niveauxDeSante = CONFIG.EXITNIHILO.niveauxDeSante;
        sheetData.displayRole = ExitNihiloDisplayRole.from(sheetData);
        sheetData.displayGenre = ExitNihiloDisplayGenre.from(sheetData);
        sheetData.displayNiveauDeSante = ExitNihiloDisplayNiveauDeSante.from(sheetData);
        const { biographie } = sheetData.actor.system.details;
        sheetData.enrichedContent.apparence = await TextEditor.enrichHTML(biographie.apparence.value, {
            async: true,
        });
        sheetData.enrichedContent.histoire = await TextEditor.enrichHTML(biographie.histoire.value, {
            async: true,
        });
        sheetData.enrichedContent.notes = await TextEditor.enrichHTML(biographie.notes.value, {
            async: true,
        });
        return sheetData;
    }

    override activateListeners(html: JQuery): void {
        super.activateListeners(html);
        const competenceSelector = ".competence>.valeur";
        //const html = $html[0];
        const selectedElement = html.find(competenceSelector);

        selectedElement.on("click", (event) => {
            const target = $(event.currentTarget);
            const competence = target.closest(".competence").attr("data-competence-id") ?? "";
            
            console.log("Click Gauche sur", competence);
            
        });
        
        selectedElement.on("contextmenu", async (event) => {
            const target = $(event.currentTarget);
            const competence = target.closest(".competence").attr("data-competence-id") ?? "";
            console.log("Click Droit sur", competence);
        });

    }

}

interface CharacterSheetExitNihilo extends CreatureSheetExitNihilo<CharacterExitNihilo> {
}

export { CharacterSheetExitNihilo };