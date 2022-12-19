import { ItemSheetExitNihilo } from "@item/sheet/base";
import { ItemSheetDataExitNihilo } from "@item/sheet/data-types";
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

interface PhysicalItemSheetData<TItem extends PhysicalItemExitNihilo> extends ItemSheetDataExitNihilo<TItem> {}

export { PhysicalItemSheetData, PhysicalItemSheetExitNihilo };