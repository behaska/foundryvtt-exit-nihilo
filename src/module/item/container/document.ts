import { EquipmentTrait } from "@item/equipment/data";
import { PhysicalItemExitNihilo } from "@item/physical";
import { ContainerData } from "./data";

class ContainerExitNihilo extends PhysicalItemExitNihilo {
    /** This container's contents, reloaded every data preparation cycle */
    contents: Collection<Embedded<PhysicalItemExitNihilo>> = new Collection();
}

interface ContainerExitNihilo {
    readonly data: ContainerData;

    get traits(): Set<EquipmentTrait>;
}

export { ContainerExitNihilo };
