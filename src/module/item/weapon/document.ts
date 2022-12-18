import { PhysicalItemExitNihilo } from "@item/physical/document";
import { WeaponData } from "./data";
import { WeaponTrait } from "./types";

class WeaponExitNihilo extends PhysicalItemExitNihilo {
    /** Given this weapon is an alternative usage, whether it is melee or thrown */
    altUsageType: "melee" | "thrown" | null = null;

    override prepareBaseData(): void {
        super.prepareBaseData();
    }

    override prepareDerivedData(): void {
        super.prepareDerivedData();
    }
}

interface WeaponExitNihilo {
    readonly data: WeaponData;

    get traits(): Set<WeaponTrait>;
}

export { WeaponExitNihilo };
