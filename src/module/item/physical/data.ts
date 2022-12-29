import { ArmorTrait } from "@item/armor/types";
import { ConsumableTrait } from "@item/consumable/types";
import { BaseItemSourceExitNihilo, BaseItemDataExitNihilo, ItemSystemSource, ItemLevelData, ItemSystemData, ActionCost, Frequency, ItemTraits } from "@item/data/base";
import { EquipmentTrait } from "@item/equipment/types";
import { WeaponTrait } from "@item/weapon/types";
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
    price: PartialPrice;
    equipped: EquippedData;
    containerId: string | null;
    temporary?: boolean;
}

interface PhysicalSystemData extends PhysicalSystemSource, ItemSystemData {
    price: Price;
    temporary: boolean;
}

type Investable<TData extends PhysicalSystemData | PhysicalSystemSource> = TData & {
    equipped: {
        invested: boolean | null;
    };
};

interface ActivatedEffectData {
    activation: {
        type: string;
        cost: number;
        condition: string;
    };
    duration: {
        value: unknown;
        units: string;
    };
    target: {
        value: unknown;
        units: string;
        type: string;
    };
    range: {
        value: unknown;
        long: unknown;
        units: unknown;
    };
    uses: {
        value: number;
        max: number;
        per: number;
    };
}

type IdentificationStatus = "identified" | "unidentified";

interface MystifiedData {
    name: string;
    img: ImagePath;
    data: {
        description: {
            value: string;
        };
    };
}

type IdentifiedData = DeepPartial<MystifiedData>;

interface IdentificationSource {
    status: IdentificationStatus;
    unidentified: MystifiedData;
    misidentified: {};
}

interface IdentificationData extends IdentificationSource {
    identified: MystifiedData;
}

type EquippedData = {
    inSlot?: boolean;
    handsHeld?: number;
    invested?: boolean | null;
};

type PhysicalItemTrait = ArmorTrait | ConsumableTrait | EquipmentTrait | WeaponTrait;
interface PhysicalItemTraits<T extends PhysicalItemTrait = PhysicalItemTrait> extends ItemTraits<T> {
    otherTags: string[];
}

interface ItemActivation {
    id: string;
    description: {
        value: string;
    };
    actionCost: ActionCost;
    components: {
        command: boolean;
        envision: boolean;
        interact: boolean;
        cast: boolean;
    };
    frequency?: Frequency;
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

interface PartialPrice {
    value: Coins;
    per?: number;
}

interface Price extends PartialPrice {
    per: number;
}

export {
    ActivatedEffectData,
    BasePhysicalItemData,
    BasePhysicalItemSource,
    Coins,
    EquippedData,
    IdentificationData,
    IdentificationStatus,
    IdentifiedData,
    Investable,
    ItemActivation,
    MystifiedData,
    PartialPrice,
    PhysicalItemHitPoints,
    PhysicalItemTrait,
    PhysicalItemTraits,
    PhysicalSystemData,
    PhysicalSystemSource,
    Price,
};
