import { CreatureTrait } from "@actor/creature/data";
import { ItemExitNihilo } from "@item/base";
import { PhysicalItemTrait } from "@item/physical/data";
import { ActiveEffectExitNihilo } from "@module/active-effect";
import { TraitsWithRarity } from "@module/data";
import { ItemType } from ".";

interface BaseItemSourceExitNihilo<
    TType extends ItemType = ItemType,
    TSystemSource extends ItemSystemSource = ItemSystemSource
> extends foundry.data.ItemSource<TType, TSystemSource> {
    flags: ItemSourceFlagsExitNihilo;
}

interface BaseItemDataExitNihilo<
    TItem extends ItemExitNihilo = ItemExitNihilo,
    TType extends ItemType = ItemType,
    TSystemData extends ItemSystemData = ItemSystemData,
    TSource extends BaseItemSourceExitNihilo<TType> = BaseItemSourceExitNihilo<TType>
> extends Omit<BaseItemSourceExitNihilo<TType, ItemSystemSource>, "system" | "effects">,
        foundry.data.ItemData<TItem, ActiveEffectExitNihilo> {
    readonly type: TType;
    readonly system: TSystemData;
    flags: ItemFlagsExitNihilo;
    readonly _source: TSource;
}

type ItemTrait =  CreatureTrait | PhysicalItemTrait ;

type ActionType = keyof ConfigExitNihilo["EXITNIHILO"]["actionTypes"];

interface ActionCost {
    type: Exclude<ActionType, "passive">;
}

type ItemTraits<T extends ItemTrait = ItemTrait> = TraitsWithRarity<T>;

interface ItemFlagsExitNihilo extends foundry.data.ItemFlags {
    exitNihilo: {
        rulesSelections: Record<string, string | number | object>;
        itemGrants: Record<string, ItemGrantData>;
        grantedBy: ItemGrantData | null;
        [key: string]: unknown;
    };
}

interface ItemSourceFlagsExitNihilo extends DeepPartial<foundry.data.ItemFlags> {
    exitNihilo?: {
        rulesSelections?: Record<string, string | number | object>;
        itemGrants?: Record<string, ItemGrantSource>;
        grantedBy?: ItemGrantSource | null;
        [key: string]: unknown;
    };
}

type ItemGrantData = Required<ItemGrantSource>;

interface ItemGrantSource {
    id: string;
    onDelete?: ItemGrantDeleteAction;
}

type ItemGrantDeleteAction = "cascade" | "detach" | "restrict";

interface ItemLevelData {
    level: {
        value: number;
    };
}

interface ItemSystemSource {
    description: {
        value: string;
    };
    source: {
        value: string;
    };
    options?: {
        value: string[];
    };
    slug: string | null;
}

type ItemSystemData = ItemSystemSource;

interface FrequencySource {
    value?: number;
    max: number;
    /** Gap between recharges as an ISO8601 duration, or "day" for daily prep. */
    per: keyof ConfigExitNihilo["EXITNIHILO"]["frequencies"];
}

interface Frequency extends FrequencySource {
    value: number;
}

export {
    ActionCost,
    ActionType,
    BaseItemDataExitNihilo,
    BaseItemSourceExitNihilo,
    Frequency,
    FrequencySource,
    ItemFlagsExitNihilo,
    ItemGrantData,
    ItemGrantDeleteAction,
    ItemGrantSource,
    ItemLevelData,
    ItemSystemData,
    ItemSystemSource,
    ItemTrait,
    ItemTraits,
};
