import { ActorExitNihilo } from "@actor/base";
import { EncounterExitNihilo } from "./document";

class CombatantExitNihilo<
    TParent extends EncounterExitNihilo | null = EncounterExitNihilo | null,
    TActor extends ActorExitNihilo | null = ActorExitNihilo | null
> extends Combatant<TParent, TActor> { }

interface CombatantExitNihilo<
    TParent extends EncounterExitNihilo | null = EncounterExitNihilo | null,
    TActor extends ActorExitNihilo | null = ActorExitNihilo | null
> extends Combatant<TParent, TActor> { }

export { CombatantExitNihilo };
