import {
    ActionType,
    BaseItemDataExitNihilo,
    BaseItemSourceExitNihilo,
    Frequency,
    FrequencySource,
    ItemSystemData,
    ItemSystemSource,
    ItemTraits,
} from "@item/data/base";
import { OneToThree } from "@module/data";
import { ActionItemExitNihilo } from "./document";

type ActionItemSource = BaseItemSourceExitNihilo<"action", ActionSystemSource>;

type ActionItemData = Omit<ActionItemSource, "system" | "effects" | "flags"> &
    BaseItemDataExitNihilo<ActionItemExitNihilo, "action", ActionSystemData, ActionItemSource>;

type ActionTrait = keyof ConfigExitNihilo["EXITNIHILO"]["actionTraits"];
type ActionTraits = ItemTraits<ActionTrait>;

interface ActionSystemSource extends ItemSystemSource {
    traits: ActionTraits;
    actionType: {
        value: ActionType;
    };
    actionCategory: {
        value: string;
    };
    actions: {
        value: OneToThree | null;
    };
    requirements: {
        value: string;
    };
    trigger: {
        value: string;
    };
    deathNote: boolean;
    frequency?: FrequencySource;
    source: {
        value: string;
    };
}

interface ActionSystemData extends ActionSystemSource, Omit<ItemSystemData, "traits"> {
    frequency?: Frequency;
}

export { ActionItemSource, ActionItemData, ActionTrait, ActionTraits };
