import { CreatureConfig, CreatureConfigData } from "@actor/creature/config";
import { CharacterExitNihilo } from ".";

export class CharacterConfig extends CreatureConfig<CharacterExitNihilo> {
    override async getData(options: Partial<DocumentSheetOptions> = {}): Promise<PCConfigData> {
        return {
            ...(await super.getData(options)),
        };
    }
}

interface PCConfigData extends CreatureConfigData<CharacterExitNihilo> {
}
