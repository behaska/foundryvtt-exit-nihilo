import { registerSheets } from "@scripts/register-sheets";
import { LocalizeExitNihilo } from "@system/localize";

/** This runs after game data has been requested and loaded from the servers, so entities exist */
export const Setup = {
    listen: (): void => {
        Hooks.once("setup", () => {
            LocalizeExitNihilo.ready = true;

            // Register actor and item sheets
            registerSheets();
        });
    },
};
