import { CreatureSheetExitNihilo } from "@actor/creature/sheet";
import { CharacterExitNihilo } from ".";
import { CharacterSheetData } from "./data/sheet";

class CharacterSheetExitNihilo extends CreatureSheetExitNihilo<CharacterExitNihilo> {

    static override get defaultOptions(): ActorSheetOptions {
        const options = super.defaultOptions;
        options.classes = [...options.classes, "character"];
        options.width = 750;
        options.height = 800;
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

        // Return data for rendering
        return sheetData;
    }

}

interface CharacterSheetExitNihilo extends CreatureSheetExitNihilo<CharacterExitNihilo> {
}

export { CharacterSheetExitNihilo };