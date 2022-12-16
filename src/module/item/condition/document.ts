import { AbstractEffectExitNihilo } from "@item/abstract-effect/document";

class ConditionExitNihilo extends AbstractEffectExitNihilo {
}

interface ConditionExitNihilo {
}

interface ConditionModificationContext<T extends ConditionExitNihilo> extends DocumentModificationContext<T> {
    conditionValue?: number | null;
}

export { ConditionExitNihilo, ConditionModificationContext };
