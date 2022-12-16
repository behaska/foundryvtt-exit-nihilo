/** Expose public game.exitNihilo interface */
export const SetGameExitNihilo = {
    onInit: (): void => {
        const actions: Record<string, Function> = {};

        const initSafe: Partial<typeof game["exitNihilo"]> = {
            actions,
        };

        game.exitNihilo = mergeObject(game.exitNihilo ?? {}, initSafe);
    },

    onSetup: (): void => {},

    onReady: (): void => {}
};
