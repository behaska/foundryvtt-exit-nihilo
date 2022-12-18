import { CreatureExitNihilo } from "@actor/creature";
import type { CharacterData } from "@actor/character/data";

class CharacterExitNihilo extends CreatureExitNihilo {
}

interface CharacterExitNihilo {
    readonly data: CharacterData;
}

export { CharacterExitNihilo };