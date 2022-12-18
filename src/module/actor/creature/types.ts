import { ActorUpdateContext } from "@actor/base";
import { ActorSheetDataExitNihilo } from "@actor/sheet/data-types";
import { AbilityString } from "@actor/types";
import { CreatureExitNihilo } from ".";
import { CreatureSystemData, AbilityData, SkillData } from "./data";

type ModeOfBeing = "living" | "undead" | "construct" | "object";

interface CreatureUpdateContext<T extends CreatureExitNihilo> extends ActorUpdateContext<T> {
    allowHPOverage?: boolean;
}

type WithRank = { icon?: string; hover?: string; rank: null };

interface CreatureSheetData<TActor extends CreatureExitNihilo = CreatureExitNihilo> extends ActorSheetDataExitNihilo<TActor> {
    data: CreatureSystemData & {
        abilities: Record<AbilityString, AbilityData & { label?: string }>;
        attributes: {
            perception: CreatureSystemData["attributes"]["perception"] & WithRank;
        };
        skills: Record<string, SkillData & WithRank>;
    };
    abilities: ConfigExitNihilo["EXITNIHILO"]["abilities"];
    skills: ConfigExitNihilo["EXITNIHILO"]["skills"];
    rarity: ConfigExitNihilo["EXITNIHILO"]["rarityTraits"];
    frequencies: ConfigExitNihilo["EXITNIHILO"]["frequencies"];
    attitude: ConfigExitNihilo["EXITNIHILO"]["attitude"];
    pfsFactions: ConfigExitNihilo["EXITNIHILO"]["pfsFactions"];
    dying: {
        maxed: boolean;
        remainingDying: number;
        remainingWounded: number;
    };
}

export {
    CreatureSheetData,
    CreatureUpdateContext,
    ModeOfBeing,
};
