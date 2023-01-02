import { ArmorTrait } from "@item/armor/types";
import { BaseItemSourceExitNihilo, BaseItemDataExitNihilo, ItemSystemSource, ItemLevelData, ItemSystemData, ItemTraits } from "@item/data/base";
import { EquipmentTrait } from "@item/equipment/types";
import { PhysicalItemExitNihilo } from "./document";
import { PhysicalItemType } from "./types";

type BasePhysicalItemSource<
    TType extends PhysicalItemType = PhysicalItemType,
    TSystemSource extends PhysicalSystemSource = PhysicalSystemSource
> = BaseItemSourceExitNihilo<TType, TSystemSource>;

type BasePhysicalItemData<
    TItem extends PhysicalItemExitNihilo = PhysicalItemExitNihilo,
    TType extends PhysicalItemType = PhysicalItemType,
    TSystemData extends PhysicalSystemData = PhysicalSystemData,
    TSource extends BasePhysicalItemSource<TType> = BasePhysicalItemSource<TType>
> = Omit<BasePhysicalItemSource, "system" | "effects" | "flags"> & BaseItemDataExitNihilo<TItem, TType, TSystemData, TSource>;

interface PhysicalSystemSource extends ItemSystemSource, ItemLevelData {
    quantity: number;
    baseItem: string | null;
    weight: {
        value: string;
    };
    equipped: EquippedData;
    containerId: string | null;
    temporary: boolean;
}

interface PhysicalSystemData extends PhysicalSystemSource, ItemSystemData {
    temporary: boolean;
}

type Investable<TData extends PhysicalSystemData | PhysicalSystemSource> = TData & {
    equipped: {
        invested: boolean | null;
    };
};

type EquippedData = {
    inSlot?: boolean;
    handsHeld?: number;
    invested?: boolean | null;
};

type PhysicalItemTrait = ArmorTrait | EquipmentTrait ;
interface PhysicalItemTraits<T extends PhysicalItemTrait = PhysicalItemTrait> extends ItemTraits<T> {
    otherTags: string[];
}

interface PhysicalItemHitPoints {
    value: number;
    max: number;
    brokenThreshold: number;
}

interface Coins {
    pp?: number;
    gp?: number;
    sp?: number;
    cp?: number;
}

export {
    BasePhysicalItemData,
    BasePhysicalItemSource,
    Coins,
    EquippedData,
    Investable,
    PhysicalItemHitPoints,
    PhysicalItemTrait,
    PhysicalItemTraits,
    PhysicalSystemData,
    PhysicalSystemSource,
};
