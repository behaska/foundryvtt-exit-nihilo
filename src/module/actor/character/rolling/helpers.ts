import { ActorExitNihilo } from "@actor/base";
import { Competence } from "../data/types";

export async function renderConfigurationJetDeDes(
    actor: ActorExitNihilo,
    competence: Competence
): Promise<void> {
    const content = await renderTemplate("systems/exit-nihilo/templates/dice/rolling.html", {
        competence,
    });

    new Dialog({
        title: game.i18n.localize("EXITNIHILO.Actions.Craft.SelectSpellDialog.Title"),
        content,
        buttons: {
            cancel: {
                icon: '<i class="fa fa-times"></i>',
                label: game.i18n.localize("Cancel"),
            },
            craft: {
                icon: '<i class="fa fa-hammer"></i>',
                label: game.i18n.localize("EXITNIHILO.Actions.Craft.SelectSpellDialog.CraftButtonLabel"),
                callback: async ($dialog) => {
                    return undefined;
                },
            },
        },
        default: "craft",
    }).render(true);
}