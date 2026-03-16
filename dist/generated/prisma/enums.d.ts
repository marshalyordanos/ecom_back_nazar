export declare const UserStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly INACTIVE: "INACTIVE";
    readonly SUSPENDED: "SUSPENDED";
};
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export declare const ProductStatus: {
    readonly DRAFT: "DRAFT";
    readonly ACTIVE: "ACTIVE";
    readonly ARCHIVED: "ARCHIVED";
};
export type ProductStatus = (typeof ProductStatus)[keyof typeof ProductStatus];
export declare const OrderStatus: {
    readonly PENDING: "PENDING";
    readonly PAID: "PAID";
    readonly PROCESSING: "PROCESSING";
    readonly SHIPPED: "SHIPPED";
    readonly COMPLETED: "COMPLETED";
    readonly CANCELLED: "CANCELLED";
    readonly REFUNDED: "REFUNDED";
};
export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus];
export declare const PaymentStatus: {
    readonly PENDING: "PENDING";
    readonly PAID: "PAID";
    readonly FAILED: "FAILED";
    readonly REFUNDED: "REFUNDED";
};
export type PaymentStatus = (typeof PaymentStatus)[keyof typeof PaymentStatus];
export declare const ShipmentStatus: {
    readonly PENDING: "PENDING";
    readonly SHIPPED: "SHIPPED";
    readonly DELIVERED: "DELIVERED";
};
export type ShipmentStatus = (typeof ShipmentStatus)[keyof typeof ShipmentStatus];
export declare const InventoryMovementType: {
    readonly PURCHASE: "PURCHASE";
    readonly SALE: "SALE";
    readonly RETURN: "RETURN";
    readonly ADJUSTMENT: "ADJUSTMENT";
    readonly TRANSFER: "TRANSFER";
};
export type InventoryMovementType = (typeof InventoryMovementType)[keyof typeof InventoryMovementType];
export declare const CouponType: {
    readonly PERCENTAGE: "PERCENTAGE";
    readonly FIXED: "FIXED";
};
export type CouponType = (typeof CouponType)[keyof typeof CouponType];
export declare const ReviewStatus: {
    readonly PENDING: "PENDING";
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
};
export type ReviewStatus = (typeof ReviewStatus)[keyof typeof ReviewStatus];
export declare const SyncStatus: {
    readonly STARTED: "STARTED";
    readonly SUCCESS: "SUCCESS";
    readonly FAILED: "FAILED";
};
export type SyncStatus = (typeof SyncStatus)[keyof typeof SyncStatus];
//# sourceMappingURL=enums.d.ts.map