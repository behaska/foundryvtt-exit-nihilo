import { PhysicalItemExitNihilo } from "@item/physical/document";
import { ArmorData } from ".";

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
