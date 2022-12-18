import { ItemSheetExitNihilo } from "@item/sheet/base";
import { ItemSheetDataExitNihilo } from "@item/sheet/data-types";
import { ItemActivation } from "./data";
import { PhysicalItemExitNihilo } from "./document";

class PhysicalItemSheetExitNihilo<TItem extends PhysicalItemExitNihilo = PhysicalItemExitNihilo> extends ItemSheetExitNihilo<TItem> {
    /** Show the identified data for editing purposes */
    override async getData(options?: Partial<DocumentSheetOptions>): Promise<PhysicalItemSheetData<TItem>> {
        const sheetData: ItemSheetDataExitNihilo<TItem> = await super.getData(options);
        return {
            ...sheetData,
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
