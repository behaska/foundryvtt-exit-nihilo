import { Init } from "@scripts/init";
import { DiceSoNiceReady } from "./dice-so-nice-ready";
import { Load } from "./load";
import { Ready } from "./ready";
import { Setup } from "./setup";

export const HooksExitNihilo = {
    listen(): void {
        const listeners: { listen(): void }[] = [
            Load, // Run this first since it's not an actual hook listener
            DiceSoNiceReady,
            Init,
            Ready,
            Setup
        ];
        for (const Listener of listeners) {
            Listener.listen();
        }
    },
};