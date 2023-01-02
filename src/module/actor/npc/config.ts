import { CreatureConfig, CreatureConfigData } from "@actor/creature/config";
import { NPCExitNihilo } from ".";

export class NPCConfig extends CreatureConfig<NPCExitNihilo> {
    override async getData(options: Partial<DocumentSheetOptions> = {}): Promise<NPCConfigData> {

        return {
            ...(await super.getData(options)),
        };
    }
}

interface NPCConfigData extends CreatureConfigData<NPCExitNihilo> {
}
