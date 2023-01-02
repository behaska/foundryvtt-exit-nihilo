import { EncounterExitNihilo } from "@module/encounter/document";

export class EncounterTrackerExitNihilo<TEncounter extends EncounterExitNihilo | null> extends CombatTracker<TEncounter> {

    /** Make the combatants sortable */
    override activateListeners($html: JQuery): void {
        return super.activateListeners($html);
    }
}
