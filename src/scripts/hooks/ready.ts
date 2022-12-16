import { SetGameExitNihilo } from "@scripts/set-game-exit-nihilo";

export const Ready = {
    listen: (): void => {
        Hooks.once("ready", () => {
            /** Once the entire VTT framework is initialized, check to see if we should perform a data migration */
            console.log("ExitNihilo System | Starting Exit Nihilo System");
            console.debug(`ExitNihilo System | Build mode: ${BUILD_MODE}`);

            // Some of game.exit-nihilo must wait until the ready phase
            SetGameExitNihilo.onReady();

            // Prepare familiars now that all actors are initialized
            for (const familiar of game.actors.filter((a) => a.type === "familiar")) {
                familiar.reset();
            }

            // Announce the system is ready in case any module needs access to an application not available until now
            Hooks.callAll("exit-nihilo.systemReady");
        });
    },
};
