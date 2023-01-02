import { PhysicalItemExitNihilo } from "@item/physical";
import { EquipmentData, EquipmentTrait } from "./data";
import { OtherEquipmentTag } from "./types";

class EquipmentExitNihilo extends PhysicalItemExitNihilo {
    get otherTags(): Set<OtherEquipmentTag> {
        return new Set(this.system.traits.otherTags);
    }

    override prepareBaseData(): void {
        super.prepareBaseData();

        this.system.traits.otherTags ??= [];
    }
}

interface EquipmentExitNihilo {
    readonly data: EquipmentData;

    get traits(): Set<EquipmentTrait>;
}

export { EquipmentExitNihilo };
