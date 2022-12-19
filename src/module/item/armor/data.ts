import { BasePhysicalItemSource, BasePhysicalItemData, Investable, PhysicalSystemSource, PhysicalSystemData, PhysicalItemTraits } from "@item/physical/data";
import { ArmorExitNihilo } from "./document";
import { ArmorCategory, ArmorGroup, BaseArmorType, ArmorTrait, OtherArmorTag } from "./types";

type ArmorSource = BasePhysicalItemSource<"armor", ArmorSystemSource>;

type ArmorData = Omit<ArmorSource, "system" | "effects" | "flags"> &
    BasePhysicalItemData<ArmorExitNihilo, "armor", ArmorSystemData, ArmorSource>;

interface ArmorSystemSource extends Investable<PhysicalSystemSource> {
    traits: ArmorTraits;
    armor: {
        value: number;
    };
    category: ArmorCategory;
    group: ArmorGroup | null;
    baseItem: BaseArmorType | null;
}

interface ArmorSystemData
    extends Omit<ArmorSystemSource, "identification" | "price" | "temporary" | "usage">,
        Omit<Investable<PhysicalSystemData>, "traits"> {
    baseItem: BaseArmorType;
}

interface ArmorTraits extends PhysicalItemTraits<ArmorTrait> {
    otherTags: OtherArmorTag[];
}

export { ArmorData, ArmorSource, ArmorSystemData, ArmorSystemSource };
