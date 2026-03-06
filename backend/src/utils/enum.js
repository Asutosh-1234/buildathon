export const TRIP_MEMBER_ROLES = {
    OWNER: "owner",
    EDITOR: "editor",
    VIEWER: "viewer"
};

export const AvilableRoles = Object.values(TRIP_MEMBER_ROLES);

export const ACTIVITY_TYPES = {
    ATTRACTION: "attraction",
    FOOD: "food",
    TRANSPORT: "transport",
    ACCOMMODATION: "accommodation",
    OTHER: "other"
};

export const AvilableActivityTypes = Object.values(ACTIVITY_TYPES);

export const EXPENSE_TYPES = {
    FOOD: "food",
    TRANSPORT: "transport",
    ACCOMMODATION: "accommodation",
    ACTIVITY: "activity",
    OTHER: "other"
};

export const AvilableExpenseTypes = Object.values(EXPENSE_TYPES);

export { TRIP_MEMBER_ROLES, ACTIVITY_TYPES, EXPENSE_TYPES, AvilableRoles, AvilableActivityTypes, AvilableExpenseTypes };
