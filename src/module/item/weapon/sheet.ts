import { PhysicalItemSheetExitNihilo, PhysicalItemSheetData } from "@item/physical";
import { LocalizeExitNihilo } from "@system/localize";
import { WeaponExitNihilo } from "./document";
import { WEAPON_RANGES } from "./values";

export class WeaponSheetExitNihilo extends PhysicalItemSheetExitNihilo<WeaponExitNihilo> {
    override async getData(options?: Partial<DocumentSheetOptions>) {
        
        const sheetData: PhysicalItemSheetData<WeaponExitNihilo> = await super.getData(options);

        const weaponRanges = Array.from(WEAPON_RANGES).reduce(
            (ranges: Record<number, string>, range) => ({
                ...ranges,
                [range]: game.i18n.format("EXITNIHILO.WeaponRangeN", { range: range }),
            }),
            {}
        );
        return {
            ...sheetData,
            hasDetails: true,
            hasSidebar: true,
            categories: CONFIG.EXITNIHILO.weaponCategories,
            baseTypes: LocalizeExitNihilo.translations.EXITNIHILO.Weapon.Base,
            weaponRanges,
        };
    }

    override activateListeners($html: JQuery): void {
        super.activateListeners($html);
    }
}
