import { PhysicalItemExitNihilo } from "@item/physical";
import { EquipmentData } from "./data";

class EquipmentExitNihilo extends PhysicalItemExitNihilo {

    override prepareBaseData(): void {
        super.prepareBaseData();
    }
}

interface EquipmentExitNihilo {
    readonly data: EquipmentData;
}

export { EquipmentExitNihilo };
