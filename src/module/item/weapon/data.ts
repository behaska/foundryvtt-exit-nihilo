import { ItemFlagsExitNihilo } from "@item/data/base";
import { BasePhysicalItemSource, BasePhysicalItemData, Investable, PhysicalSystemSource, PhysicalSystemData } from "@item/physical/data";
import { PreciousMaterialGrade, BaseMaterial } from "@item/physical/types";
import { OneToFour } from "@module/data";
import { WeaponExitNihilo } from "./document";
import { WeaponTrait, StrikingRuneType, WeaponPropertyRuneType, WeaponMaterialType, WeaponCategory, WeaponGroup, BaseWeaponType, WeaponRangeIncrement, WeaponReloadTime, MeleeWeaponGroup } from "./types";

type WeaponSource = BasePhysicalItemSource<"weapon", WeaponSystemSource> & {
    flags: DeepPartial<WeaponFlags>;
};

type WeaponData = Omit<WeaponSource, "system" | "effects" | "flags"> &
    BasePhysicalItemData<WeaponExitNihilo, "weapon", WeaponSystemData, WeaponSource> & {
        flags: WeaponFlags;
    };

type WeaponFlags = ItemFlagsExitNihilo & {
    exitNihilo: {
        comboMeleeUsage: boolean;
    };
};

interface WeaponDamage {
    value?: string;
    dice: number;
    modifier: number;
}

interface WeaponRuneData {
    potency: OneToFour | null;
    striking: StrikingRuneType | null;
    property: Record<OneToFour, WeaponPropertyRuneType | null>;
}

interface WeaponPropertyRuneSlot {
    value: WeaponPropertyRuneType | null;
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
    /** A combination weapon's melee usage */
    meleeUsage?: ComboWeaponMeleeUsage;
    selectedAmmoId: string | null;
}

interface WeaponSystemData
    extends Omit<WeaponSystemSource, "identification" | "price" | "temporary">,
        Omit<Investable<PhysicalSystemData>, "traits"> {
    baseItem: BaseWeaponType | null;
    maxRange: number | null;
    reload: {
        value: WeaponReloadTime | null;
        /** Whether the ammunition (or the weapon itself, if thrown) should be consumed upon firing */
        consume: boolean | null;
    };
}

interface WeaponMaterialData {
    /** The "base material" or category: icon/steel (metal), wood, rope, etc. */
    base: BaseMaterial[];
    /** The precious material of which this weapon is composed */
    precious: {
        type: WeaponMaterialType;
        grade: PreciousMaterialGrade;
    } | null;
}

interface ComboWeaponMeleeUsage {
    group: MeleeWeaponGroup;
    traits: WeaponTrait[];
}

export {
    ComboWeaponMeleeUsage,
    WeaponDamage,
    WeaponData,
    WeaponMaterialData,
    WeaponPropertyRuneSlot,
    WeaponRuneData,
    WeaponSource,
    WeaponSystemData,
    WeaponSystemSource,
};
