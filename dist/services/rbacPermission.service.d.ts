/** Resource keys used in Permission.resource and RolePermission; keep in sync with seed + admin UI. */
export declare const PERMISSION_RESOURCES: readonly ["users", "products", "orders", "shops", "shop_sales", "inventory", "payments", "shipments", "categories", "brands", "coupons", "reviews", "roles", "permissions", "analytics", "sync", "settings", "reports", "statistics"];
export type PermissionResource = (typeof PERMISSION_RESOURCES)[number];
export type MergedPermissionRow = {
    resource: string;
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
};
export type MergedPermissionMap = Record<string, {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
}>;
export declare function getMergedPermissionsForUser(userId: string): Promise<MergedPermissionMap>;
export declare function mergedMapToList(map: MergedPermissionMap): MergedPermissionRow[];
export declare function hasPermission(map: MergedPermissionMap, resource: string, action: "create" | "read" | "update" | "delete"): boolean;
//# sourceMappingURL=rbacPermission.service.d.ts.map