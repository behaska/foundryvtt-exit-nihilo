import { Load } from "./load";

export const HooksExitNihilo = {
    listen(): void {
        const listeners: { listen(): void }[] = [
            Load // Run this first since it's not an actual hook listener
        ];
        for (const Listener of listeners) {
            Listener.listen();
        }
    },
};