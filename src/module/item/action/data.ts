import {
    ItemTraits,
} from "@item/data/base";

type ActionTrait = keyof ConfigExitNihilo["EXITNIHILO"]["actionTraits"];
type ActionTraits = ItemTraits<ActionTrait>;



export {  ActionTrait, ActionTraits };
