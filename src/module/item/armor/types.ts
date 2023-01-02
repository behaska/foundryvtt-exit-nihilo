import { LocalizeExitNihilo } from "@system/localize";

type ArmorCategory = keyof ConfigExitNihilo["EXITNIHILO"]["armorTypes"];
type ArmorGroup = keyof ConfigExitNihilo["EXITNIHILO"]["armorGroups"];
type BaseArmorType = keyof typeof LocalizeExitNihilo.translations.EXITNIHILO.Item.Armor.Base;

export {  ArmorCategory, ArmorGroup, BaseArmorType };
