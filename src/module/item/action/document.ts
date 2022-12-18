import { ItemExitNihilo } from "@item/base";
import { ActionItemData } from "./data";

class ActionItemExitNihilo extends ItemExitNihilo {
    override prepareBaseData(): void {
        super.prepareBaseData();

        // Initialize frequency uses if not set
        if (this.actor && this.system.frequency) {
            this.system.frequency.value ??= this.system.frequency.max;
        }
    }
}

interface ActionItemExitNihilo {
    readonly data: ActionItemData;
}

export { ActionItemExitNihilo };
