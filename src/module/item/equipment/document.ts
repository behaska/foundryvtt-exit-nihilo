import { PhysicalItemExitNihilo } from "@item/physical/document";
import { EquipmentData } from "./data";
import { EquipmentTrait } from "./types";

class EquipmentExitNihilo extends PhysicalItemExitNihilo { }

interface EquipmentExitNihilo {
    readonly data: EquipmentData;

    get traits(): Set<EquipmentTrait>;
}

export { EquipmentExitNihilo };