import { BasePhysicalItemSource, BasePhysicalItemData, Investable, PhysicalSystemSource, PhysicalSystemData } from "@item/physical/data";
import { ArmorExitNihilo } from "./document";
import { ArmorCategory, ArmorGroup, BaseArmorType } from "./types";

type ArmorSource = BasePhysicalItemSource<"armor", ArmorSystemSource>;

type ArmorData = Omit<ArmorSource, "system" | "effects" | "flags"> &
    BasePhysicalItemData<ArmorExitNihilo, "armor", ArmorSystemData, ArmorSource>;

interface ArmorSystemSource extends Investable<PhysicalSystemSource> {
    armor: {
        value: number;
    };
    category: ArmorCategory;
    group: ArmorGroup | null;
    baseItem: BaseArmorType | null;
}

interface ArmorSystemData
    extends Omit<ArmorSystemSource,  "price" | "temporary" | "usage">,
        Omit<Investable<PhysicalSystemData>, "traits"> {
    baseItem: BaseArmorType;
}

export { ArmorData, ArmorSource, ArmorSystemData, ArmorSystemSource };
