import { ActorExitNihilo } from "@actor/base";
import { ErrorExitNihilo } from "@util/misc";

/**
 * @category Other
 */
class DiceExitNihilo {
    _rolled?: boolean;
    terms?: string[];

    /**
     * A standardized helper function for managing core ExitNihilo "d20 rolls"
     *
     * Holding SHIFT, ALT, or CTRL when the attack is rolled will "fast-forward".
     * This chooses the default options of a normal attack with no bonus, Advantage, or Disadvantage respectively
     *
     * @param actor         The actor
     * @param data          Actor or item data against which to parse the roll
     * @param template      The HTML template used to render the roll dialog
     * @param title         The dice roll UI window title
     * @param speaker       The ChatMessage speaker to pass when creating the chat
     * @param fastForward   Allow fast-forward advantage selection
     * @param onClose       Callback for actions to take when the dialog form is closed
     * @param dialogOptions Modal dialog options
     */
    static async d6Roll({
        actor,
        data,
        template,
        title,
        speaker,
        onClose,
        dialogOptions,
        rollType = "",
    }: {
        actor: ActorExitNihilo,
        data: Record<string, unknown>;
        template?: string;
        title: string;
        speaker: foundry.data.ChatSpeakerSource;
        onClose?: Function;
        dialogOptions?: Partial<ApplicationOptions>;
        rollType?: string;
    }) {

        const _roll = ($form?: JQuery) => {
            // Don't include situational bonuses unless they are defined

            if ($form) {
                data.caracteristique = $form.find("input:checked").val()
                data.competence = $form.find("[name=valeurCompetence]").val()
            };

            // Execute the roll and send it to chat
            const propertyKey = `system.attributs.caracteristiquesCalculees.${data.caracteristique}`;
            const valeurDeCaracteristique = getProperty(actor, propertyKey)

            const valeurCompetence = parseInt(data.competence as string, 10);

            if (typeof valeurCompetence !== "number") {
                throw ErrorExitNihilo(`Skill value is not a number (${data.competence}).`);
            }
            
            if (typeof valeurDeCaracteristique !== "number") {
                throw ErrorExitNihilo(`Skill value is not a number (${valeurDeCaracteristique}).`);
            }

            const nombreDeDesPotentiel = valeurCompetence + valeurDeCaracteristique;

            const nombreDeDes = nombreDeDesPotentiel <= 0 ? 0 : nombreDeDesPotentiel;
            const roll = new Roll(`${nombreDeDes}d6`, data).roll({ async: false });
            roll.toMessage(
                {
                    speaker,
                    flags: {
                        exitNihilo: {
                            context: {
                                type: rollType,
                            },
                            origin,
                        },
                    },
                },
            );
            return roll;
        };


        // Render modal dialog
        template = template || "systems/exit-nihilo/templates/dice/roll-dialog.hbs";
        const dialogData = {
            actor,
            data,
            valeurCompetence: data.competence,
            rollModes: CONFIG.Dice.rollModes,
        };
        const content = await renderTemplate(template, dialogData);
        let roll: Roll;
        return new Promise((resolve) => {
            new Dialog(
                {
                    title,
                    content,
                    buttons: {
                        roll: {
                            label: game.i18n.localize("EXITNIHILO.Roll.Roll"),
                            callback: (html) => {
                                roll = _roll(html);
                            },
                        },
                        cancel: {
                            label: game.i18n.localize("EXITNIHILO.Roll.Cancel"),
                            icon: '<i class="fa fa-times"></i>',
                        },
                    },
                    default: game.i18n.localize("EXITNIHILO.Roll.Cancel"),
                    close: (html) => {
                        if (onClose) onClose(html, data);
                        resolve(roll);
                    },
                },
                dialogOptions
            ).render(true);
        });
    }

}


export { DiceExitNihilo };
