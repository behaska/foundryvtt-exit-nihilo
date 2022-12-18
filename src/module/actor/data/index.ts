import { CreatureType } from "@actor/creature/data";
import type { CharacterData } from "@actor/character/data";


type CreatureData = CharacterData;
type ActorType = CreatureType | "hazard" | "loot" | "vehicle";

type ActorDataExitNihilo = CreatureData;
type ActorSourceExitNihilo = ActorDataExitNihilo["_source"];

interface RollInitiativeOptionsExitNihilo extends RollInitiativeOptions {
    secret?: boolean;
    skipDialog?: boolean;
}
export {
    ActorDataExitNihilo,
    ActorSourceExitNihilo,
    ActorType,
    CreatureData,
    RollInitiativeOptionsExitNihilo,
};
