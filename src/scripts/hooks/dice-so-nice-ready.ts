import { ExitNihiloCompetenceDie } from "@scripts/dice";

interface ColorsetOptions {
    name: string;
    description: string;
    category: string;
    texture: string;
    material: string;
    foreground: string;
    outline: string;
    edge: string;
    visibility?: "visible" | "hidden";
}

interface Dice3D {
    addSystem(system: { id: string; name: string; colorset?: string }, mode?: "default" | "preferred"): void;

    addDicePreset(
        data: { type: string; labels: string[]; bumpMaps?: string[]; system: string; colorset?: string },
        shape?: string | null
    ): void;

    addTexture(textureId: string, options: { name: string; composite: string; source: string }): Promise<void>;

    addColorset(options: ColorsetOptions, mode?: "default" | "preferred"): void;
}

const isDice3D = (obj: unknown): obj is Dice3D =>
    obj instanceof Object && ["addSystem", "addDicePreset", "addTexture", "addColorset"].every((m) => m in obj);

const DiceSoNiceReady = {
    listen: (): void => {
        Hooks.once("diceSoNiceReady", (dice3d: unknown) => {
            CONFIG.Dice.terms["s"] = ExitNihiloCompetenceDie;

            if (!isDice3D(dice3d)) return;

            // BASIC SYSTEM
            dice3d.addSystem({ id: "basic", name: "DiceExitNiholo Basique" }, "preferred");

            for (const faces of [4, 6, 8, 10, 12, 20]) {
                dice3d.addDicePreset({
                    type: `d${faces}`,
                    labels: [...Array(faces)].map((_value, idx) => String(idx + 1)),
                    system: "basic",
                });
            }

            dice3d.addDicePreset(
                {
                    type: "ds",
                    labels: [
                        "systems/exit-nihilo/dice/basic/failure.webp",
                        "systems/exit-nihilo/dice/basic/no-effect.webp",
                        "systems/exit-nihilo/dice/basic/no-effect.webp",
                        "systems/exit-nihilo/dice/basic/no-effect.webp",
                        "systems/exit-nihilo/dice/basic/partial-success.webp",
                        "systems/exit-nihilo/dice/basic/success.webp",
                    ],
                    bumpMaps: [
                        "systems/exit-nihilo/dice/basic/failure-bump.webp",
                        "systems/exit-nihilo/dice/basic/no-effect-bump.webp",
                        "systems/exit-nihilo/dice/basic/no-effect-bump.webp",
                        "systems/exit-nihilo/dice/basic/no-effect-bump.webp",
                        "systems/exit-nihilo/dice/basic/partial-success-bump.webp",
                        "systems/exit-nihilo/dice/basic/success-bump.webp",
                    ],
                    system: "basic",
                },
                "d6"
            );

            dice3d.addDicePreset({
                type: "d100",
                labels: [...Array(10)].map((_value, idx) => String((idx + 1) * 10)),
                system: "basic",
            });
        });
    },
};

export { DiceSoNiceReady, Dice3D };
