import { ActorExitNihilo } from "@actor/base";
import { ItemExitNihilo } from "@item/base";
import { ActorDirectoryExitNihilo } from "@module/apps/ui/actor-directory";
import { ChatLogExitNihilo } from "@module/apps/ui/chat-log";
import { CompendiumDirectoryExitNihilo } from "@module/apps/ui/compendium-directory";
import { EncounterTrackerExitNihilo } from "@module/apps/ui/encounter-tracker";
import { ChatMessageExitNihilo } from "@module/chat-message/document";
import { ActorsExitNihilo } from "@module/collection/actors";
import { CombatantExitNihilo } from "@module/encounter/combatant";
import { EncounterExitNihilo } from "@module/encounter/document";
import { MacroExitNihilo } from "@module/macro";
import { UserExitNihilo } from "@module/user/document";
import { SceneExitNihilo } from "@scene/document";
import { EXITNIHILOCONFIG } from "@scripts/config";

declare global {
    interface Game {
        exitNihilo: {
        };
    }

    interface ConfigExitNihilo extends ConfiguredConfig {
        debug: ConfiguredConfig["debug"] & {
            ruleElement: boolean;
        };
        EXITNIHILO: typeof EXITNIHILOCONFIG;
        time: {
            roundTime: number;
        };
    }

    const CONFIG: ConfigExitNihilo;

    namespace globalThis {
        // eslint-disable-next-line no-var
        var game: Game<ActorExitNihilo, ActorsExitNihilo, ChatMessageExitNihilo, EncounterExitNihilo, ItemExitNihilo, MacroExitNihilo, SceneExitNihilo, UserExitNihilo>;

        // eslint-disable-next-line no-var
        var ui: FoundryUI<ActorExitNihilo, ActorDirectoryExitNihilo<ActorExitNihilo>, ItemExitNihilo, ChatLogExitNihilo, CompendiumDirectoryExitNihilo>;
    }

    interface Window {
    }

    interface ClientSettings {
    }

    interface ClientSettingsMap {
        get(key: "exit-nihilo.worldClock.worldCreatedOn"): SettingConfig & { default: string };
    }

    interface RollMathProxy {
        eq: (a: number, b: number) => boolean;
        gt: (a: number, b: number) => boolean;
        gte: (a: number, b: number) => boolean;
        lt: (a: number, b: number) => boolean;
        lte: (a: number, b: number) => boolean;
        ne: (a: number, b: number) => boolean;
        ternary: (condition: boolean | number, ifTrue: number, ifFalse: number) => number;
    }

    const BUILD_MODE: "development" | "production";
}

type ConfiguredConfig = Config<
    AmbientLightDocument,
    ActiveEffect,
    ActorExitNihilo,
    ActorDirectoryExitNihilo<ActorExitNihilo>,
    ChatLogExitNihilo,
    ChatMessageExitNihilo,
    EncounterExitNihilo,
    CombatantExitNihilo,
    EncounterTrackerExitNihilo<EncounterExitNihilo | null>,
    CompendiumDirectoryExitNihilo,
    Hotbar,
    ItemExitNihilo,
    MacroExitNihilo,
    MeasuredTemplateDocument,
    TileDocument,
    TokenDocument,
    SceneExitNihilo,
    UserExitNihilo,
    EffectsCanvasGroup
>;
