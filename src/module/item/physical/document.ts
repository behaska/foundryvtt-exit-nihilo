import { ItemExitNihilo } from "@item/base";
import { PhysicalItemData } from "@item/data";

abstract class PhysicalItemExitNihilo extends ItemExitNihilo {

    override prepareBaseData(): void {
        super.prepareBaseData();
    }

    /** Refresh certain derived properties in case of special data preparation from subclasses */
    override prepareDerivedData(): void {
        super.prepareDerivedData();
    }
}

interface PhysicalItemExitNihilo {
    readonly data: PhysicalItemData;
}

export { PhysicalItemExitNihilo };