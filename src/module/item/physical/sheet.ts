import { ItemSheetExitNihilo } from "@item/sheet/base";
import { ItemSheetDataExitNihilo } from "@item/sheet/data-types";
import { objectHasKey } from "@util/misc";
import { ItemActivation, BasePhysicalItemSource } from "./data";
import { PhysicalItemExitNihilo } from "./document";
import { PreciousMaterialGrade } from "./types";
import { PRECIOUS_MATERIAL_GRADES } from "./values";

class PhysicalItemSheetExitNihilo<TItem extends PhysicalItemExitNihilo = PhysicalItemExitNihilo> extends ItemSheetExitNihilo<TItem> {
    /** Show the identified data for editing purposes */
    override async getData(options?: Partial<DocumentSheetOptions>): Promise<PhysicalItemSheetData<TItem>> {
        const sheetData: ItemSheetDataExitNihilo<TItem> = await super.getData(options);
        return {
            ...sheetData,
            itemType: game.i18n.localize("EXITNIHILO.ItemTitle"),
            basePriceString: "",
            priceString: "",
            actionTypes: CONFIG.EXITNIHILO.actionTypes,
            actionsNumber: CONFIG.EXITNIHILO.actionsNumber,
            bulkTypes: CONFIG.EXITNIHILO.bulkTypes,
            frequencies: CONFIG.EXITNIHILO.frequencies,
            stackGroups: CONFIG.EXITNIHILO.stackGroups,
            usage: CONFIG.EXITNIHILO.usageTraits,
            isPhysical: true,
            // Do not let user set bulk if in a stack group because the group determines bulk
            bulkDisabled: !!sheetData.data?.stackGroup?.trim(),            
        };
    }
}

interface PhysicalItemSheetData<TItem extends PhysicalItemExitNihilo> extends ItemSheetDataExitNihilo<TItem> {
    isPhysical: true;
    basePriceString: string;
    priceString: string;
    actionTypes: ConfigExitNihilo["EXITNIHILO"]["actionTypes"];
    actionsNumber: ConfigExitNihilo["EXITNIHILO"]["actionsNumber"];
    bulkTypes: ConfigExitNihilo["EXITNIHILO"]["bulkTypes"];
    frequencies: ConfigExitNihilo["EXITNIHILO"]["frequencies"];
    stackGroups: ConfigExitNihilo["EXITNIHILO"]["stackGroups"];
    usage: ConfigExitNihilo["EXITNIHILO"]["usageTraits"];
    bulkDisabled: boolean;
    activations: {
        action: ItemActivation;
        id: string;
        base: string;
        description: string;
    }[];
}

export { PhysicalItemSheetData, PhysicalItemSheetExitNihilo };
