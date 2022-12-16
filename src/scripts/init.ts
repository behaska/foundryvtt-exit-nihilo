import { EXITNIHILOCONFIG } from "./config";
import { registerTemplates } from "./register-templates";
import { SetGameExitNihilo } from "./set-game-exit-nihilo";

export const Init = {
    listen: (): void => {
        Hooks.once("init", () => {
            console.log("ExitNihilo System | Initializing Exit Nihilo System");

            CONFIG.EXITNIHILO = EXITNIHILOCONFIG;
            CONFIG.debug.ruleElement ??= false;

            CONFIG.MeasuredTemplate.defaults.angle = 90;
            CONFIG.MeasuredTemplate.defaults.width = 1;

            // Automatically advance world time by 6 seconds each round
            CONFIG.time.roundTime = 6;
            // Decimals are 😠
            CONFIG.Combat.initiative.decimals = 0;

            // The condition in Pathfinder 2e is "blinded" rather than "blind"
            CONFIG.specialStatusEffects.BLIND = "blinded";

            // Insert templates into DOM tree so Applications can render into
            if (document.querySelector("#ui-top") !== null) {
                // Template element for effects-panel
                const uiTop = document.querySelector("#ui-top");
                const template = document.createElement("template");
                template.setAttribute("id", "exit-nihilo-effects-panel");
                uiTop?.insertAdjacentElement("afterend", template);
            }

            // configure the bundled TinyMCE editor with PF2-specific options
            CONFIG.TinyMCE.extended_valid_elements = "pf2-action[action|glyph]";
            CONFIG.TinyMCE.content_css = CONFIG.TinyMCE.content_css.concat("systems/exit-nihilo/styles/main.css");
            CONFIG.TinyMCE.style_formats = (CONFIG.TinyMCE.style_formats ?? []).concat({
                title: "EXITNIHILO",
                items: [
                    {
                        title: "Icons A D T F R",
                        inline: "span",
                        classes: ["pf2-icon"],
                        wrapper: true,
                    },
                    {
                        title: "Inline Header",
                        block: "h4",
                        classes: "inline-header",
                    },
                    {
                        title: "Info Block",
                        block: "section",
                        classes: "info",
                        wrapper: true,
                        exact: true,
                        merge_siblings: false,
                    },
                    {
                        title: "Stat Block",
                        block: "section",
                        classes: "statblock",
                        wrapper: true,
                        exact: true,
                        merge_siblings: false,
                    },
                    {
                        title: "Trait",
                        block: "section",
                        classes: "traits",
                        wrapper: true,
                    },
                    {
                        title: "Written Note",
                        block: "p",
                        classes: "message",
                    },
                    {
                        title: "GM Text Block",
                        block: "div",
                        wrapper: true,
                        attributes: {
                            "data-visibility": "gm",
                        },
                    },
                    {
                        title: "GM Text Inline",
                        inline: "span",
                        attributes: {
                            "data-visibility": "gm",
                        },
                    },
                ],
            });

            // Soft-set system-preferred core settings until they've been explicitly set by the GM
            // const schema = foundry.data.PrototypeToken.schema;
            // schema.displayName.default = schema.displayBars.default = CONST.TOKEN_DISPLAY_MODES.OWNER_HOVER;

            // Register stuff with the Foundry client
            registerTemplates();

            // Create and populate initial game.exit-nihilo interface
            SetGameExitNihilo.onInit();

        });
    },
};
