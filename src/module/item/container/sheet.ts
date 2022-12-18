import { PhysicalItemSheetData, PhysicalItemSheetExitNihilo } from "@item/physical";
import { ContainerExitNihilo } from ".";

export class ContainerSheetExitNihilo extends PhysicalItemSheetExitNihilo<ContainerExitNihilo> {
    override async getData(options?: Partial<DocumentSheetOptions>): Promise<PhysicalItemSheetData<ContainerExitNihilo>> {
        return {
            ...(await super.getData(options)),
            hasDetails: true,
        };
    }
}
