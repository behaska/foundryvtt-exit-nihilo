import { CreatureExitNihilo } from ".";

/** A DocumentSheet presenting additional, per-actor settings */
abstract class CreatureConfig<TActor extends CreatureExitNihilo> extends DocumentSheet<TActor> {
    override get title(): string {
        const namespace = "Character";
        return game.i18n.localize(`EXITNIHILO.Actor.${namespace}.Configure.Title`);
    }

    override get template(): string {
        return `systems/pf2e/templates/actors/${this.actor.type}/config.hbs`;
    }

    get actor(): TActor {
        return this.object;
    }

    static override get defaultOptions(): DocumentSheetOptions {
        const options = super.defaultOptions;
        options.width = 450;
        return options;
    }

    override async getData(options: Partial<DocumentSheetOptions> = {}): Promise<CreatureConfigData<TActor>> {
        return {
            ...(await super.getData(options)),
        };
    }
}

interface CreatureConfigData<TActor extends CreatureExitNihilo> extends DocumentSheetData<TActor> {
}

export { CreatureConfig, CreatureConfigData };
