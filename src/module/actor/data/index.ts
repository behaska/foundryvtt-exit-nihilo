import { CreatureType } from "@actor/creature/data";
import type { CharacterData } from "@actor/character/data";
import { NPCData } from "@actor/npc/data";


type CreatureData = CharacterData | NPCData;
type ActorType = CreatureType;

type ActorDataExitNihilo = CreatureData;
type ActorSourceExitNihilo = ActorDataExitNihilo["_source"];

export {
    ActorDataExitNihilo,
    ActorSourceExitNihilo,
    ActorType,
    CreatureData,
};
