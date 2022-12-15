import { CreatureType } from "@actor/creature/data";

type CreatureData = CharacterData;
type ActorType = CreatureType | "hazard" | "loot" | "vehicle";

type ActorDataExitNihilo = CreatureData;

interface RollInitiativeOptionsExitNihilo extends RollInitiativeOptions {
    secret?: boolean;
    skipDialog?: boolean;
}
export {
    ActorDataExitNihilo,
    ActorType,
    CreatureData,
    RollInitiativeOptionsExitNihilo,
};
