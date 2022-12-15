import { ActorExitNihilo } from "@actor/base";
import { ItemExitNihilo } from "@item/base";
import { ChatMessageExitNihilo } from "@module/chat-message/document";
import { ActorsExitNihilo } from "@module/collection/actors";
import { EncounterExitNihilo } from "@module/encounter/document";
import { MacroExitNihilo } from "@module/macro";
import { UserExitNihilo } from "@module/user/document";
import { SceneExitNihilo } from "@scene/document";

/** Not an actual hook listener but rather things to run on initial load */
export const Load = {
    listen(): void {
        // Assign document classes
        CONFIG.Actor.collection = ActorsExitNihilo;
        CONFIG.Actor.documentClass = ActorExitNihilo;
        CONFIG.ChatMessage.documentClass = ChatMessageExitNihilo;
        CONFIG.Combat.documentClass = EncounterExitNihilo;
        CONFIG.Item.documentClass = ItemExitNihilo;
        CONFIG.Macro.documentClass = MacroExitNihilo;
        CONFIG.Scene.documentClass = SceneExitNihilo;
        CONFIG.User.documentClass = UserExitNihilo;


        // Mystery Man but with a drop shadow
        Actor.DEFAULT_ICON = "systems/exit-nihilo/icons/default-icons/mystery-man.svg";

        Roll.MATH_PROXY = mergeObject(Roll.MATH_PROXY, {
            eq: (a: number, b: number) => a === b,
            gt: (a: number, b: number) => a > b,
            gte: (a: number, b: number) => a >= b,
            lt: (a: number, b: number) => a < b,
            lte: (a: number, b: number) => a <= b,
            ne: (a: number, b: number) => a !== b,
            ternary: (condition: boolean | number, ifTrue: number, ifFalse: number) => (condition ? ifTrue : ifFalse),
        });

        // Prevent buttons from retaining focus when clicked so that canvas hotkeys still work
        document.addEventListener("mouseup", (): void => {
            const element = document.activeElement;
            if (element instanceof HTMLButtonElement && !element.classList.contains("pm-dropdown")) {
                element.blur();
            }
        });
    },
};
