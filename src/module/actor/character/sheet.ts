import { CreatureSheetExitNihilo } from "@actor/creature/sheet";
import { DiceExitNihilo } from "@scripts/dice";
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

        const selectedCompetenceElement = html.find(".competence>.titre");
        const selectedCompetenceDeCombatElement = html.find(".competence-de-combat>.titre");

        const selectedbuttonVerrouilleDeverouilleElement = html.find(".verouille-deverouille-bouton");

        selectedbuttonVerrouilleDeverouilleElement.on("click", async () => {
            const propertyKey: string = "system.configuration.verrou";
            const currentValue = getProperty(this.actor, propertyKey);
            return await this.actor.update({ [`${propertyKey}`]: !currentValue });
        });

        selectedCompetenceElement.on("click", async (event) => {
            await this.rollSkill(event, ".competence", "communes");
        });

        selectedCompetenceDeCombatElement.on("click", async (event) => {
            await this.rollSkill(event, ".competence-de-combat", "combat");
        });


        if (!this.actor.system.configuration.verrou) {
            const selectedValeurDeCompetenceElement = html.find(".competence>.valeur");
            const selectedValeurDeCompetenceDeCombatElement = html.find(".competence-de-combat>.valeur");

            selectedValeurDeCompetenceElement.on("click", async (event) => {
                this.updateActorCompetenceCommune(event, 1);
            });

            selectedValeurDeCompetenceElement.on("contextmenu", async (event) => {
                this.updateActorCompetenceCommune(event, -1);
            });

            selectedValeurDeCompetenceDeCombatElement.on("click", async (event) => {
                this.updateActorCompetenceDeCombat(event, 1);
            });

            selectedValeurDeCompetenceDeCombatElement.on("contextmenu", async (event) => {
                this.updateActorCompetenceDeCombat(event, -1);
            });
        }

    }

    private async rollSkill(event: JQuery.ClickEvent<HTMLElement, undefined, HTMLElement, HTMLElement>,
        selector: string,
        type: string) {
        const competenceId = this.getCompetenceId(event, selector);
        if (competenceId === "") {
            throw ErrorExitNihilo(`No skill found with attr-key ("data-competence-id") with selector ${selector}.`);
        }
        const propertyKey = `system.competences.${type}.${competenceId}.value`;
        const competence = getProperty(this.actor, propertyKey);

        if (typeof competence !== "number") {
            throw ErrorExitNihilo(`Actor property (${propertyKey}) not found`);
        }

        const title = "Fenêtre de configuration de Lancer de Dés";
        const data = { competence };
        const speaker = ChatMessage.getSpeaker({ token: this.token, actor: this.actor });

        await DiceExitNihilo.d6Roll(
            {
                actor: this.actor,
                data,
                title,
                speaker
            });
    }

    private async updateActorCompetenceCommune(event: JQuery.MouseEventBase, modifier: number) {
        return await this.updateActorCompetence(event, ".competence", "communes", modifier);
    }

    private async updateActorCompetenceDeCombat(event: JQuery.MouseEventBase, modifier: number) {
        return await this.updateActorCompetence(event, ".competence-de-combat", "combat", modifier);
    }

    private async updateActorCompetence(event: JQuery.MouseEventBase, selector: string, competenceType: string, modifier: number) {
        const competence = this.getCompetenceId(event, selector);
        if (competence === "") {
            throw ErrorExitNihilo(`No skill found with attr-key ("data-competence-id").`);
        }
        const propertyKey = `system.competences.${competenceType}.${competence}.value`;
        const currentValue = getProperty(this.actor, propertyKey)
        if (typeof currentValue !== "number" || Number.isNaN(currentValue)) {
            throw ErrorExitNihilo(`Actor property (${propertyKey}) not found`);
        }

        const mayBeNewValue = currentValue + modifier;
        const newValue = mayBeNewValue > 5 || mayBeNewValue < 0 ? currentValue : mayBeNewValue;
        return await this.actor.update({ [`${propertyKey}`]: newValue });
    }


    private getCompetenceId(event: JQuery.MouseEventBase<any, any, any, any>, selector: string) {
        const target = $(event.currentTarget);
        const competence = target.closest(selector).attr("data-competence-id") ?? "";
        return competence;
    }
}

interface CharacterSheetExitNihilo extends CreatureSheetExitNihilo<CharacterExitNihilo> {
}

export { CharacterSheetExitNihilo };