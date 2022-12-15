import { ItemType } from "@item/data";

interface ActorExitNihilo extends Actor<TokenDocument, ItemTypeMap> {}

class ActorExitNihilo extends Actor<TokenDocument, ItemTypeMap> {}

type ItemTypeMap = {
    [K in ItemType]: InstanceType<ConfigExitNihilo["EXITNIHILO"]["Item"]["documentClasses"][K]>;
};

export { ActorExitNihilo };