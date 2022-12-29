import { PhysicalItemExitNihilo } from "@item/physical/document";
import { WeaponData } from "./data";

class WeaponExitNihilo extends PhysicalItemExitNihilo {
    override prepareBaseData(): void {
        super.prepareBaseData();
    }

    override prepareDerivedData(): void {
        super.prepareDerivedData();
    }
}

interface WeaponExitNihilo {
    readonly data: WeaponData;
}

export { WeaponExitNihilo };
