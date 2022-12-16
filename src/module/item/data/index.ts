export type NonPhysicalItemType =
    | "equipment"
    | "condition";

export type ItemType = NonPhysicalItemType;

export interface ItemSummaryData {
    [key: string]: unknown;
    description?: {
        value: string;
    };
    traits?: TraitChatData[];
    properties?: (string | number | null)[];
}

export interface TraitChatData {
    value: string;
    label: string;
    description?: string;
    mystified?: boolean;
    excluded?: boolean;
}