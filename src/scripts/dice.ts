import { ActorExitNihilo } from "@actor/base";
import { ErrorExitNihilo } from "@util/misc";
import { ExitNihiloRoll, ExitNihiloRollData } from "@system/roll";

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
        actor: ActorExitNihilo;
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
                data.caracteristique = $form.find("input:checked").val();
                data.modificateur = $form.find("[name=bonus-malus]").val();
                data.valeurCompetence = $form.find("[name=valeurCompetence]").val();
                data.titreCompetence = $form.find("[name=titreCompetence]").val();
            }

            // Execute the roll and send it to chat
            const propertyKey = `system.attributs.caracteristiquesCalculees.${data.caracteristique}`;
            const valeurDeCaracteristique = getProperty(actor, propertyKey);

            if (typeof data.valeurCompetence !== "string") {
                throw ErrorExitNihilo(`Skill value is not a string (${data.valeurCompetence}).`);
            }

            const valeurCompetence = parseInt(data.valeurCompetence as string, 10);

            if (typeof data.modificateur !== "string") {
                data.modificateur = "0";
            }

            const valeurModificateur = parseInt(data.modificateur as string, 10);

            if (typeof valeurDeCaracteristique !== "number") {
                throw ErrorExitNihilo(`Skill value is not a number (${valeurDeCaracteristique}).`);
            }

            const nombreDeDesPotentiel = valeurCompetence + valeurDeCaracteristique + valeurModificateur;

            const nombreDeDes: number = nombreDeDesPotentiel <= 0 ? 0 : nombreDeDesPotentiel;
            const options: ExitNihiloRollData = {
                caracteristique: data.caracteristique as string,
                titreCompetence: data.titreCompetence as string,
                modificateur: valeurModificateur,
                valeurCompetence: valeurCompetence,
                valeurDeCaracteristique: valeurDeCaracteristique,
                nombreDeDes: nombreDeDes,
            };

            const roll = new ExitNihiloRoll(`${nombreDeDes}ds`, data, options).roll({ async: false });
            roll.toMessage({
                speaker,
                flags: {
                    exitNihilo: {
                        context: {
                            type: rollType,
                        },
                        origin,
                    },
                },
            });
            return roll;
        };

        // Render modal dialog
        template = template || "systems/exit-nihilo/templates/dice/roll-dialog.hbs";
        const dialogData = {
            actor,
            data,
            valeurCompetence: data.valeur,
            titreCompetence: data.titre,
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
                            label: game.i18n.localize("EXITNIHILO.Dialogue.LancerDeDes.Lancer"),
                            callback: (html) => {
                                roll = _roll(html);
                            },
                        },
                        cancel: {
                            label: game.i18n.localize("EXITNIHILO.Dialogue.LancerDeDes.Annuler"),
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

class ExitNihiloCompetenceDie extends Die {
    constructor(termData?: Partial<DieData>) {
        if (termData) {
            termData.faces = 6;
        } else {
            console.error("Die has undefined or null termData:", termData);
        }
        super(termData);
    }

    /* -------------------------------------------- */

    /** @override */
    static override DENOMINATION = "s";
}

export { DiceExitNihilo, ExitNihiloCompetenceDie };
