import { PhysicalItemSheetData, PhysicalItemSheetExitNihilo } from "@item/physical";
import { EquipmentExitNihilo } from ".";

export class EquipmentSheetExitNihilo extends PhysicalItemSheetExitNihilo<EquipmentExitNihilo> {
    override async getData(options?: Partial<DocumentSheetOptions>): Promise<EquipmentSheetData> {
        const sheetData = await super.getData(options);
        return {
            ...sheetData,
        };
    }
}

interface EquipmentSheetData extends PhysicalItemSheetData<EquipmentExitNihilo> {
}
