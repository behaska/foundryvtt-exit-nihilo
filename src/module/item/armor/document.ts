import { PhysicalItemExitNihilo } from "@item/physical/document";

class ArmorExitNihilo extends PhysicalItemExitNihilo {

    override prepareBaseData(): void {
        super.prepareBaseData();
    }

    override prepareDerivedData(): void {
        super.prepareDerivedData();
    }
}

interface ArmorExitNihilo {
    readonly data: ArmorData;
}

export { ArmorExitNihilo };
