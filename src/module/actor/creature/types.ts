import { ActorUpdateContext } from "@actor/base";
import { ActorSheetDataExitNihilo } from "@actor/sheet/data-types";
import { CreatureExitNihilo } from ".";
import { CreatureSystemData } from "./data";

type ModeOfBeing = "living" | "undead" | "construct" | "object";

interface CreatureUpdateContext<T extends CreatureExitNihilo> extends ActorUpdateContext<T> {
    allowHPOverage?: boolean;
}

interface CreatureSheetData<TActor extends CreatureExitNihilo = CreatureExitNihilo> extends ActorSheetDataExitNihilo<TActor> {
    data: CreatureSystemData & {
    };
    skills: ConfigExitNihilo["EXITNIHILO"]["skills"];
    attitude: ConfigExitNihilo["EXITNIHILO"]["attitude"];
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
