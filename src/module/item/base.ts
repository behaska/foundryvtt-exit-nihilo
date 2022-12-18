import { ActorExitNihilo } from "@actor/base";
import { ItemDataExitNihilo } from "./data";
import { ItemSheetExitNihilo } from "./sheet/base";

interface ItemConstructionContextExitNihilo extends DocumentConstructionContext<ItemExitNihilo> {
    exitNihilo?: {
        ready?: boolean;
    };
}

/** Override and extend the basic :class:`Item` implementation */
class ItemExitNihilo extends Item<ActorExitNihilo> {
}

interface ItemExitNihilo {
    readonly data: ItemDataExitNihilo;

    readonly parent: ActorExitNihilo | null;

    _sheet: ItemSheetExitNihilo<this> | null;
}

export { ItemExitNihilo, ItemConstructionContextExitNihilo };