import { BasePhysicalItemSource, BasePhysicalItemData, Investable, PhysicalSystemSource, PhysicalSystemData } from "@item/physical/data";
import { WeaponExitNihilo } from "./document";
import { WeaponCategory, WeaponGroup, BaseWeaponType, WeaponRangeIncrement, WeaponReloadTime } from "./types";

type WeaponSource = BasePhysicalItemSource<"weapon", WeaponSystemSource>

type WeaponData = Omit<WeaponSource, "system" | "effects" | "flags"> &
    BasePhysicalItemData<WeaponExitNihilo, "weapon", WeaponSystemData, WeaponSource>

interface WeaponDamage {
    value?: string;
    dice: number;
    modifier: number;
}

interface WeaponSystemSource extends Investable<PhysicalSystemSource> {
    category: WeaponCategory;
    group: WeaponGroup | null;
    baseItem: BaseWeaponType | null;
    damage: WeaponDamage;
    bonusDamage: {
        value: number;
    };
    splashDamage: {
        value: number;
    };
    range: WeaponRangeIncrement | null;
    maxRange?: number | null;
    reload: {
        value: WeaponReloadTime | null;
    };
    selectedAmmoId: string | null;
}

interface WeaponSystemData
    extends Omit<WeaponSystemSource, | "price" | "temporary">,
        Omit<Investable<PhysicalSystemData>, "traits"> {
    baseItem: BaseWeaponType | null;
    maxRange: number | null;
    reload: {
        value: WeaponReloadTime | null;
        /** Whether the ammunition (or the weapon itself, if thrown) should be consumed upon firing */
        consume: boolean | null;
    };
}

export {
    WeaponDamage,
    WeaponData,
    WeaponSource,
    WeaponSystemData,
    WeaponSystemSource,
};
