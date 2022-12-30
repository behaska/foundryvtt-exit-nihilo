import { PreciousMaterialType } from "@item/physical/types";
import { LocalizeExitNihilo } from "@system/localize";
import {
    MELEE_WEAPON_GROUPS,
    WEAPON_CATEGORIES,
    WEAPON_GROUPS,
    WEAPON_PROPERTY_RUNE_TYPES,
    WEAPON_RANGES,
} from "./values";

type WeaponPropertyRuneType = SetElement<typeof WEAPON_PROPERTY_RUNE_TYPES>;

type WeaponCategory = SetElement<typeof WEAPON_CATEGORIES>;
type MeleeWeaponGroup = SetElement<typeof MELEE_WEAPON_GROUPS>;

type WeaponGroup = SetElement<typeof WEAPON_GROUPS>;
type BaseWeaponType = keyof typeof LocalizeExitNihilo.translations.EXITNIHILO.Weapon.Base;

type OtherWeaponTag = "crossbow" | "improvised" | "shoddy";

type WeaponRangeIncrement = SetElement<typeof WEAPON_RANGES>;
type WeaponReloadTime = "-" | "0" | "1" | "2" | "3" | "10";

type StrikingRuneType = "striking" | "greaterStriking" | "majorStriking";

type WeaponMaterialType = Exclude<PreciousMaterialType, "dragonhide" | "grisantian-pelt">;

type WeaponMaterialEffect = Extract<
    WeaponMaterialType,
    | "abysium"
    | "adamantine"
    | "coldIron"
    | "djezet"
    | "mithral"
    | "noqual"
    | "peachwood"
    | "silver"
    | "sisterstone-dusk"
    | "sisterstone-scarlet"
    | "sovereignSteel"
>;

export {
    BaseWeaponType,
    MeleeWeaponGroup,
    OtherWeaponTag,
    StrikingRuneType,
    WeaponCategory,
    WeaponGroup,
    WeaponMaterialEffect,
    WeaponMaterialType,
    WeaponPropertyRuneType,
    WeaponRangeIncrement,
    WeaponReloadTime,
};
