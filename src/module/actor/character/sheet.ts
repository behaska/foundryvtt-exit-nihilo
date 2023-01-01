import { CreatureSheetExitNihilo } from "@actor/creature/sheet";
import { ErrorExitNihilo } from "@util/misc";
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
        const competenceDeCombatSelector = ".competence-de-combat>.valeur";
        const competenceSelector = ".competence>.valeur";
        const selectedCompetenceElement = html.find(competenceSelector);
        const selectedCompetenceDeCombatElement = html.find(competenceDeCombatSelector);

        selectedCompetenceElement.on("click", async (event) => {
            this.updateActorCompetenceCommune(event, 1);
        });

        selectedCompetenceElement.on("contextmenu", async (event) => {
            this.updateActorCompetenceCommune(event, -1);
        });

        selectedCompetenceDeCombatElement.on("click", async (event) => {
            this.updateActorCompetenceDeCombat(event, 1);
        });

        selectedCompetenceDeCombatElement.on("contextmenu", async (event) => {
            this.updateActorCompetenceDeCombat(event, -1);
        });
        
    }

    async updateActorCompetenceCommune(event: JQuery.MouseEventBase, modifier: number) {
        return await this.updateActorCompetence(event, ".competence", "communes", modifier);
    }

    async updateActorCompetenceDeCombat(event: JQuery.MouseEventBase, modifier: number) {
        return await this.updateActorCompetence(event, ".competence-de-combat", "combat", modifier);
    }

    private async updateActorCompetence(event: JQuery.MouseEventBase, selector: string, competenceType: string, modifier: number) {
        const target = $(event.currentTarget);
        const competence = target.closest(selector).attr("data-competence-id") ?? "";
        if (competence === "") {
            throw ErrorExitNihilo(`No skill found with attr-key ("data-competence-id").`);
        }
        const propertyKey = `system.competences.${competenceType}.${competence}.value`;
        const currentValue = getProperty(this.actor, propertyKey)
        if (typeof currentValue !== "number" || Number.isNaN(currentValue)) {
            throw ErrorExitNihilo(`Actor property (${propertyKey}) not found`);
        }

        const mayBeNewValue =  currentValue + modifier;
        const newValue =  mayBeNewValue > 5 || mayBeNewValue < 0 ? currentValue : mayBeNewValue;
        return await this.actor.update({ [`${propertyKey}`]: newValue });
    }

}

interface CharacterSheetExitNihilo extends CreatureSheetExitNihilo<CharacterExitNihilo> {
}

export { CharacterSheetExitNihilo };