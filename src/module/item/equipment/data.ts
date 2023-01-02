import {
    BasePhysicalItemData,
    BasePhysicalItemSource,
    Investable,
    PhysicalSystemData,
    PhysicalSystemSource,
} from "@item/physical/data";
import { EquipmentExitNihilo } from "./document";

type EquipmentSource = BasePhysicalItemSource<"equipment", EquipmentSystemSource>;

type EquipmentData = Omit<EquipmentSource, "system" | "effects" | "flags"> &
    BasePhysicalItemData<EquipmentExitNihilo, "equipment", EquipmentSystemData, EquipmentSource>;

interface EquipmentSystemSource extends Investable<PhysicalSystemSource> {
}

interface EquipmentSystemData
    extends Omit<EquipmentSystemSource, "identification" | "price" | "temporary" | "usage">,
        Omit<Investable<PhysicalSystemData>, "traits"> {}

export { EquipmentData, EquipmentSource, EquipmentSystemData, EquipmentSystemSource };
