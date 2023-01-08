import { UserExitNihilo } from "@module/user/document";
import { ErrorExitNihilo, isObject } from "@util";

class ExitNihiloRoll extends Roll {
    roller: UserExitNihilo | null;
    caracteristique: string;
    competence: string;
    nombreDeDes: number;
    modificateur: number;
    valeurCompetence: number;
    valeurCaracteristique: number;

    constructor(formula: string, data = {}, options?: ExitNihiloRollData) {
        const wrapped = formula.startsWith("{") ? formula : `{${formula}}`;
        super(wrapped, data, options);
        this.roller = game.users.get(options?.rollerId ?? "") ?? null;
        this.caracteristique = options?.caracteristique ?? "Unknown";
        this.competence = options?.titreCompetence ?? "Unknown";
        this.nombreDeDes = options?.nombreDeDes ?? -1;
        this.modificateur = options?.modificateur ?? 0;
        this.valeurCompetence = options?.valeurCompetence ?? 0;
        this.valeurCaracteristique = options?.valeurDeCaracteristique ?? 0;
    }

    static override CHAT_TEMPLATE = "systems/exit-nihilo/templates/dice/jet-de-competence.hbs";
    static override TOOLTIP_TEMPLATE = "systems/exit-nihilo/templates/dice/jet-de-competence-tooltip.hbs";

    /** Identify each "DiceTerm" raw object with a non-abstract subclass name */
    static classifyDice(data: RollTermData): void {
        // Find all dice terms and resolve their class
        type PreProcessedDiceTerm = { class?: string; faces?: string | number | object };
        const isDiceTerm = (v: unknown): v is PreProcessedDiceTerm =>
            isObject<PreProcessedDiceTerm>(v) && v.class === "DiceTerm";
        const deepFindDice = (value: object): PreProcessedDiceTerm[] => {
            const accumulated: PreProcessedDiceTerm[] = [];
            if (isDiceTerm(value)) {
                accumulated.push(value);
            } else if (value instanceof Object) {
                const objects = Object.values(value).filter((v): v is object => v instanceof Object);
                accumulated.push(...objects.flatMap((o) => deepFindDice(o)));
            }

            return accumulated;
        };
        const diceTerms = deepFindDice(data);

        for (const term of diceTerms) {
            if (typeof term.faces === "number") {
                term.class = "Die";
            } else if (typeof term.faces === "string") {
                const termClassName = CONFIG.Dice.terms[term.faces]?.name;
                if (!termClassName) throw ErrorExitNihilo(`No matching DiceTerm class for "${term.faces}"`);
                term.class = termClassName;
            }
        }
    }

    static override fromData<TRoll extends Roll>(this: AbstractConstructorOf<TRoll>, data: RollJSON): TRoll;
    static override fromData(data: RollJSON): Roll {
        for (const term of data.terms) {
            this.classifyDice(term);
        }
        return super.fromData(data);
    }

    override async getTooltip(): Promise<string> {
        const parts = this.dice.map((die) => {
            const cls = die.constructor;
            const data = this.data;
            return {
                formula: this.formula,
                total: die.total,
                faces: die.faces,
                flavor: die.flavor,
                data: data,
                rolls: die.results.map((result) => {
                    const hasSuccess = result.success !== undefined;
                    const hasFailure = result.failure !== undefined;
                    const isMax = result.result === die.faces || result.result === (die.faces ?? 0 - 1);
                    const isMin = result.result === 1;
                    return {
                        result: result.result,
                        classes: [
                            /* cls.getCssClassName ? cls.getCssClassName(index, data) :*/ "",
                            cls.name.toLowerCase(),
                            "die" + die.faces,
                            result.success ? "success" : null,
                            result.failure ? "failure" : null,
                            result.rerolled ? "rerolled" : null,
                            result.exploded ? "exploded" : null,
                            result.discarded ? "discarded" : null,
                            !(hasSuccess || hasFailure) && isMin ? "min" : null,
                            !(hasSuccess || hasFailure) && isMax ? "max" : null,
                        ]
                            .filter((c) => c)
                            .join(" "),
                    };
                }),
            };
        });

        return renderTemplate(ExitNihiloRoll.TOOLTIP_TEMPLATE, { parts });
    }

    /** Work around upstream issue in which display base formula is used for chat messages instead of display formula */
    override async render({
        template = ExitNihiloRoll.CHAT_TEMPLATE,
        isPrivate = false,
    }: RollRenderOptions = {}): Promise<string> {
        if (!this._evaluated) await this.evaluate({ async: true });
        const chatData = {
            formula: this.formula,
            user: game.user.id,
            tooltip: isPrivate ? "" : await this.getTooltip(),
            total: isPrivate ? "?" : Math.floor((this.total! * 100) / 100),
            exitNihiloResult: this.computeCustomResult(),
            caracteristique: this.caracteristique,
            valeurCaracteristique: this.valeurCaracteristique,
            modificateur: this.modificateur,
            estModifie: this.modificateur !== 0,
            nbDeDes: this.nombreDeDes,
            competence: {
                titre: this.competence,
                valeur: this.valeurCompetence,
            },
        };
        return renderTemplate(template, chatData);
    }

    private computeCustomResult(): ExitNihiloRollCustomResult {
        const results = this.dice.flatMap((die) => die.results.map((result) => result.result));
        const nbSucces = results.filter((result) => result === 6).length;
        const nbSuccesPartiel = results.filter((result) => result === 5).length;
        const nbEchecCritique = results.filter((result) => result === 1).length;
        let extraCss: string, label: string;
        if (nbSucces > 1) {
            extraCss = "succes-critique";
            label = "Réussite Critique";
        } else if (nbSucces > 0) {
            extraCss = "succes";
            label = "Réussite";
        } else if (nbSuccesPartiel > 0) {
            extraCss = "succes-partiel";
            label = "Réussite Partielle";
        } else if (nbEchecCritique > 0) {
            extraCss = "echec-critique";
            label = "Échec Critique";
        } else {
            extraCss = "echec";
            label = "Échec";
        }
        return {
            extraCss,
            label,
        };
    }
}

interface ExitNihiloRollCustomResult {
    extraCss: string;
    label: string;
}

interface ExitNihiloRollData extends RollOptions {
    rollerId?: string;
    totalModifier?: number;
    caracteristique: string;
    titreCompetence: string;
    valeurCompetence: number;
    valeurDeCaracteristique: number;
    modificateur: number;
    nombreDeDes: number;
}

export { ExitNihiloRoll, ExitNihiloRollData };
