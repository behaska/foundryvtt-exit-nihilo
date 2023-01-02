import { ActorExitNihilo } from "@actor/base";
import { ItemDataExitNihilo, ItemSourceExitNihilo } from "./data";
import { ItemSheetExitNihilo } from "./sheet/base";

interface ItemConstructionContextExitNihilo extends DocumentConstructionContext<ItemExitNihilo> {
    exitNihilo?: {
        ready?: boolean;
    };
}

/** Override and extend the basic :class:`Item` implementation */
class ItemExitNihilo extends Item<ActorExitNihilo> {
    private initialized?: true;

    constructor(data: PreCreate<ItemSourceExitNihilo>, context: ItemConstructionContextExitNihilo = {}) {
        if (context.exitNihilo?.ready) {
            super(data, context);
        } else {
            context.exitNihilo = mergeObject(context.exitNihilo ?? {}, { ready: true });
            const ItemConstructor = CONFIG.EXITNIHILO.Item.documentClasses[data.type];
            return ItemConstructor ? new ItemConstructor(data, context) : new ItemExitNihilo(data, context);
        }
    }

    /** Refresh the Item Directory if this item isn't owned */
    override prepareData(): void {
        super.prepareData();
        if (!this.isOwned && ui.items && this.initialized) ui.items.render();
    }

    /** Ensure the presence of the pf2e flag scope with default properties and values */
    override prepareBaseData(): void {
        super.prepareBaseData();
    }
}

interface ItemExitNihilo {
    readonly data: ItemDataExitNihilo;

    readonly parent: ActorExitNihilo | null;

    _sheet: ItemSheetExitNihilo<this> | null;
}

export { ItemExitNihilo, ItemConstructionContextExitNihilo };