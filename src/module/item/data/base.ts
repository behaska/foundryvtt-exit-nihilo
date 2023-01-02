import { ItemExitNihilo } from "@item/base";
import { ActiveEffectExitNihilo } from "@module/active-effect";
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

type ActionType = keyof ConfigExitNihilo["EXITNIHILO"]["actionTypes"];

interface ActionCost {
    type: Exclude<ActionType, "passive">;
}

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

export {
    ActionCost,
    ActionType,
    BaseItemDataExitNihilo,
    BaseItemSourceExitNihilo,
    ItemFlagsExitNihilo,
    ItemGrantData,
    ItemGrantDeleteAction,
    ItemGrantSource,
    ItemLevelData,
    ItemSystemData,
    ItemSystemSource,
};
