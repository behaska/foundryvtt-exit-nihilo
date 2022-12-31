import {
    BasePhysicalItemData,
    BasePhysicalItemSource,
    Investable,
    PhysicalSystemData,
    PhysicalSystemSource,
} from "@item/physical/data";
import { ContainerExitNihilo } from ".";

type ContainerSource = BasePhysicalItemSource<"backpack", ContainerSystemSource>;

type ContainerData = Omit<ContainerSource, "system" | "effects" | "flags"> &
    BasePhysicalItemData<ContainerExitNihilo, "backpack", ContainerSystemData, ContainerSource>;

interface ContainerSystemSource extends Investable<PhysicalSystemSource> {
    stowing: boolean;
    collapsed: boolean;
}

interface ContainerSystemData
    extends Omit<ContainerSystemSource, "price" | "temporary" | "usage">,
        Omit<Investable<PhysicalSystemData>, "traits"> {}

export { ContainerData, ContainerSource };
