import { PhysicalItemSheetExitNihilo, PhysicalItemSheetData } from "@item/physical";
import { LocalizeExitNihilo } from "@system/localize";
import { ArmorExitNihilo } from "./document";
import { ArmorCategory, ArmorGroup, BaseArmorType } from "./types";

class ArmorSheetExitNihilo extends PhysicalItemSheetExitNihilo<ArmorExitNihilo> {
    override async getData(options?: Partial<DocumentSheetOptions>): Promise<ArmorSheetData> {
        const sheetData = await super.getData(options);

        return {
            ...sheetData,
            categories: CONFIG.EXITNIHILO.armorTypes,
            groups: CONFIG.EXITNIHILO.armorGroups,
            baseTypes: LocalizeExitNihilo.translations.EXITNIHILO.Item.Armor.Base,
        };
    }

}

interface ArmorSheetData extends PhysicalItemSheetData<ArmorExitNihilo> {
    categories: Record<ArmorCategory, string>;
    groups: Record<ArmorGroup, string>;
    baseTypes: Record<BaseArmorType, string>;
}

export { ArmorSheetExitNihilo };
