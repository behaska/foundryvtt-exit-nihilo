import { BasePhysicalItemSource, BasePhysicalItemData, Investable, PhysicalSystemSource, PhysicalSystemData, PhysicalItemTraits } from "@item/physical/data";
import { OneToFour, ZeroToThree } from "@module/data";
import { ArmorExitNihilo } from "./document";
import { ArmorCategory, ArmorGroup, BaseArmorType, ResilientRuneType, ArmorTrait, OtherArmorTag } from "./types";

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

    strength: {
        value: number;
    };
    dex: {
        value: number;
    };
    check: {
        value: number;
    };
    speed: {
        value: number;
    };
    potencyRune: {
        value: OneToFour | null;
    };
    resiliencyRune: {
        value: ResilientRuneType | null;
    };
    propertyRune1: {
        value: string;
    };
    propertyRune2: {
        value: string;
    };
    propertyRune3: {
        value: string;
    };
    propertyRune4: {
        value: string;
    };
}

interface ArmorSystemData
    extends Omit<ArmorSystemSource, "identification" | "price" | "temporary" | "usage">,
        Omit<Investable<PhysicalSystemData>, "traits"> {
    baseItem: BaseArmorType;
    runes: {
        potency: number;
        resilient: ZeroToThree;
        property: string[];
    };
}

interface ArmorTraits extends PhysicalItemTraits<ArmorTrait> {
    otherTags: OtherArmorTag[];
}

export { ArmorData, ArmorSource, ArmorSystemData, ArmorSystemSource };
