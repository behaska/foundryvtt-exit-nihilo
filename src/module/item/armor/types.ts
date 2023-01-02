import { LocalizeExitNihilo } from "@system/localize";

type ArmorTrait = keyof ConfigExitNihilo["EXITNIHILO"]["armorTraits"];
type ArmorCategory = keyof ConfigExitNihilo["EXITNIHILO"]["armorTypes"];
type ArmorGroup = keyof ConfigExitNihilo["EXITNIHILO"]["armorGroups"];
type BaseArmorType = keyof typeof LocalizeExitNihilo.translations.EXITNIHILO.Item.Armor.Base;

export { ArmorTrait, ArmorCategory, ArmorGroup, BaseArmorType };
