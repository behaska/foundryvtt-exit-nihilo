import { ItemExitNihilo } from "@item/base";
import { PhysicalItemData } from "@item/data";

abstract class PhysicalItemExitNihilo extends ItemExitNihilo {
 }

interface PhysicalItemExitNihilo {
    readonly data: PhysicalItemData;
}

export { PhysicalItemExitNihilo };