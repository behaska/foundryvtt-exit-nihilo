import { ActorExitNihilo } from "@actor/base";

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
     * @param parts         The dice roll component parts, excluding the initial d20
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
        parts,
        data,
        template,
        title,
        speaker,
        onClose,
        dialogOptions,
        rollType = "",
    }: {
        actor: ActorExitNihilo,
        parts: (string | number)[];
        data: Record<string, unknown>;
        template?: string;
        title: string;
        speaker: foundry.data.ChatSpeakerSource;
        onClose?: Function;
        dialogOptions?: Partial<ApplicationOptions>;
        rollType?: string;
    }) {

        const _roll = (rollParts: (string | string[] | number)[], $form?: JQuery) => {
            // Don't include situational bonuses unless they are defined
            if ($form) data.itemBonus = $form.find("[name=itemBonus]").val();
            if ((!data.itemBonus || data.itemBonus === 0) && rollParts.indexOf("@itemBonus") !== -1)
                rollParts.splice(rollParts.indexOf("@itemBonus"), 1);
            if ($form) data.statusBonus = $form.find("[name=statusBonus]").val();
            if ((!data.statusBonus || data.statusBonus === 0) && rollParts.indexOf("@statusBonus") !== -1)
                rollParts.splice(rollParts.indexOf("@statusBonus"), 1);
            if ($form) data.circumstanceBonus = $form.find("[name=circumstanceBonus]").val();
            if (
                (!data.circumstanceBonus || data.circumstanceBonus === 0) &&
                rollParts.indexOf("@circumstanceBonus") !== -1
            )
                rollParts.splice(rollParts.indexOf("@circumstanceBonus"), 1);
            // Execute the roll and send it to chat
            const roll = new Roll(rollParts.join("+"), data).roll({ async: false });
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
        template = template || "systems/exit-nihilo/templates/dice/roll-dialog.html";
        const dialogData = {
            actor,
            data,
            formula: parts.join(" + "),
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
                                roll = _roll(parts, html);
                            },
                        },
                        cancel: {
                            label: game.i18n.localize("EXITNIHILO.Roll.Cancel"),
                            callback: (html) => {
                                roll = _roll(parts, html);
                            },
                        },
                    },
                    default: game.i18n.localize("EXITNIHILO.Roll.Normal"),
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
