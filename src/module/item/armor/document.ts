import { PhysicalItemExitNihilo } from "@item/physical/document";
import { setHasElement } from "@util/misc";

class ArmorExitNihilo extends PhysicalItemExitNihilo {

    override prepareBaseData(): void {
        super.prepareBaseData();

        this.system.potencyRune.value ||= null;
        this.system.resiliencyRune.value ||= null;

        // Add traits from potency rune
        const baseTraits = this.system.traits.value;
        const fromRunes: ("invested" | "abjuration")[] =
            this.system.potencyRune.value || this.system.resiliencyRune.value ? ["invested", "abjuration"] : [];
        const hasTraditionTraits = baseTraits.some((t) => setHasElement(MAGIC_TRADITIONS, t));
        const magicTraits: "magical"[] = fromRunes.length > 0 && !hasTraditionTraits ? ["magical"] : [];

        const { traits } = this.system;
        traits.value = Array.from(new Set([...baseTraits, ...fromRunes, ...magicTraits]));
    }

    override prepareDerivedData(): void {
        super.prepareDerivedData();
    }
}

interface ArmorExitNihilo {
    readonly data: ArmorData;
}

export { ArmorExitNihilo };
