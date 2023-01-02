const PHYSICAL_ITEM_TYPES = new Set([
    "armor",
    "container",
    "equipment",
    "weapon",
] as const);

const PRECIOUS_MATERIAL_TYPES = new Set([
    "silver",
] as const);

const PRECIOUS_MATERIAL_GRADES = new Set(["low", "standard", "high"] as const);

const DENOMINATIONS = ["pp", "gp", "sp", "cp"] as const;

export { DENOMINATIONS, PHYSICAL_ITEM_TYPES, PRECIOUS_MATERIAL_GRADES, PRECIOUS_MATERIAL_TYPES };
