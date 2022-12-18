import { ItemFlagsExitNihilo } from "@item/data/base";
import { BasePhysicalItemSource, BasePhysicalItemData, PhysicalItemTraits, Investable, PhysicalSystemSource, PhysicalSystemData } from "@item/physical/data";
import { PreciousMaterialGrade, BaseMaterial } from "@item/physical/types";
import { OneToFour, ZeroToThree } from "@module/data";
import { WeaponExitNihilo } from "./document";
import { WeaponTrait, OtherWeaponTag, StrikingRuneType, WeaponPropertyRuneType, WeaponMaterialType, WeaponCategory, WeaponGroup, BaseWeaponType, WeaponRangeIncrement, WeaponReloadTime, MeleeWeaponGroup } from "./types";

type WeaponSource = BasePhysicalItemSource<"weapon", WeaponSystemSource> & {
    flags: DeepPartial<WeaponFlags>;
};

type WeaponData = Omit<WeaponSource, "system" | "effects" | "flags"> &
    BasePhysicalItemData<WeaponExitNihilo, "weapon", WeaponSystemData, WeaponSource> & {
        flags: WeaponFlags;
    };

type WeaponFlags = ItemFlagsExitNihilo & {
    pf2e: {
        comboMeleeUsage: boolean;
    };
};

interface WeaponTraits extends PhysicalItemTraits<WeaponTrait> {
    otherTags: OtherWeaponTag[];
}

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

/** A weapon can either be unspecific or specific along with baseline material and runes */
type SpecificWeaponData =
    | {
          value: false;
      }
    | {
          value: true;
          price: string;
          material: {
              type: WeaponMaterialType;
              grade: PreciousMaterialGrade;
          };
          runes: Omit<WeaponRuneData, "property">;
      };

interface WeaponPropertyRuneSlot {
    value: WeaponPropertyRuneType | null;
}

interface WeaponSystemSource extends Investable<PhysicalSystemSource> {
    traits: WeaponTraits;
    category: WeaponCategory;
    group: WeaponGroup | null;
    baseItem: BaseWeaponType | null;
    bonus: {
        value: number;
    };
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
    MAP: {
        value: string;
    };
    /** A combination weapon's melee usage */
    meleeUsage?: ComboWeaponMeleeUsage;
    /** Whether the weapon is a "specific magic weapon" */
    specific?: SpecificWeaponData;
    potencyRune: {
        value: OneToFour | null;
    };
    strikingRune: {
        value: StrikingRuneType | null;
    };
    propertyRune1: WeaponPropertyRuneSlot;
    propertyRune2: WeaponPropertyRuneSlot;
    propertyRune3: WeaponPropertyRuneSlot;
    propertyRune4: WeaponPropertyRuneSlot;
    preciousMaterial: {
        value: WeaponMaterialType | null;
    };

    // Refers to custom damage, *not* property runes
    property1: {
        value: string;
        dice: number;
        critDice: number;
        critDamage: string;
    };
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
    runes: {
        potency: number;
        striking: ZeroToThree;
        property: WeaponPropertyRuneType[];
        effects: [];
    };
    material: WeaponMaterialData;
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
