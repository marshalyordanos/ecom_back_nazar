import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly Shop: "Shop";
    readonly ShopLocation: "ShopLocation";
    readonly User: "User";
    readonly Token: "Token";
    readonly OtpRecord: "OtpRecord";
    readonly Role: "Role";
    readonly Permission: "Permission";
    readonly RolePermission: "RolePermission";
    readonly Brand: "Brand";
    readonly ProductCategory: "ProductCategory";
    readonly Product: "Product";
    readonly Favorite: "Favorite";
    readonly ProductVariant: "ProductVariant";
    readonly VariantOptionValue: "VariantOptionValue";
    readonly OptionValue: "OptionValue";
    readonly VariantOption: "VariantOption";
    readonly VariantMedia: "VariantMedia";
    readonly Inventory: "Inventory";
    readonly InventoryMovement: "InventoryMovement";
    readonly Cart: "Cart";
    readonly CartItem: "CartItem";
    readonly Order: "Order";
    readonly OrderItem: "OrderItem";
    readonly Payment: "Payment";
    readonly Shipment: "Shipment";
    readonly ShippingAddress: "ShippingAddress";
    readonly SavedAddress: "SavedAddress";
    readonly Coupon: "Coupon";
    readonly CouponUsage: "CouponUsage";
    readonly Review: "Review";
    readonly ProductView: "ProductView";
    readonly SearchLog: "SearchLog";
    readonly Notification: "Notification";
    readonly SyncLog: "SyncLog";
    readonly SyncedProduct: "SyncedProduct";
    readonly ShopSetting: "ShopSetting";
    readonly SaleFromShop: "SaleFromShop";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const ShopScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly slug: "slug";
    readonly email: "email";
    readonly phone: "phone";
    readonly logoUrl: "logoUrl";
    readonly description: "description";
    readonly currency: "currency";
    readonly timezone: "timezone";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ShopScalarFieldEnum = (typeof ShopScalarFieldEnum)[keyof typeof ShopScalarFieldEnum];
export declare const ShopLocationScalarFieldEnum: {
    readonly id: "id";
    readonly shopId: "shopId";
    readonly name: "name";
    readonly addressLine1: "addressLine1";
    readonly addressLine2: "addressLine2";
    readonly city: "city";
    readonly state: "state";
    readonly country: "country";
    readonly postalCode: "postalCode";
    readonly latitude: "latitude";
    readonly longitude: "longitude";
    readonly phone: "phone";
    readonly createdAt: "createdAt";
};
export type ShopLocationScalarFieldEnum = (typeof ShopLocationScalarFieldEnum)[keyof typeof ShopLocationScalarFieldEnum];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly phone: "phone";
    readonly passwordHash: "passwordHash";
    readonly firstName: "firstName";
    readonly lastName: "lastName";
    readonly avatarUrl: "avatarUrl";
    readonly isSuperAdmin: "isSuperAdmin";
    readonly status: "status";
    readonly emailVerifiedAt: "emailVerifiedAt";
    readonly phoneVerifiedAt: "phoneVerifiedAt";
    readonly locationId: "locationId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const TokenScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly token: "token";
    readonly type: "type";
    readonly expiresAt: "expiresAt";
    readonly createdAt: "createdAt";
};
export type TokenScalarFieldEnum = (typeof TokenScalarFieldEnum)[keyof typeof TokenScalarFieldEnum];
export declare const OtpRecordScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly channelValue: "channelValue";
    readonly otpType: "otpType";
    readonly otpPurpose: "otpPurpose";
    readonly verificationId: "verificationId";
    readonly otpHash: "otpHash";
    readonly otpExpiresAt: "otpExpiresAt";
    readonly otpAttempts: "otpAttempts";
    readonly otpCooldownUntil: "otpCooldownUntil";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type OtpRecordScalarFieldEnum = (typeof OtpRecordScalarFieldEnum)[keyof typeof OtpRecordScalarFieldEnum];
export declare const RoleScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type RoleScalarFieldEnum = (typeof RoleScalarFieldEnum)[keyof typeof RoleScalarFieldEnum];
export declare const PermissionScalarFieldEnum: {
    readonly id: "id";
    readonly resource: "resource";
    readonly description: "description";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PermissionScalarFieldEnum = (typeof PermissionScalarFieldEnum)[keyof typeof PermissionScalarFieldEnum];
export declare const RolePermissionScalarFieldEnum: {
    readonly id: "id";
    readonly roleId: "roleId";
    readonly permissionId: "permissionId";
    readonly createAction: "createAction";
    readonly readAction: "readAction";
    readonly updateAction: "updateAction";
    readonly deleteAction: "deleteAction";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type RolePermissionScalarFieldEnum = (typeof RolePermissionScalarFieldEnum)[keyof typeof RolePermissionScalarFieldEnum];
export declare const BrandScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly slug: "slug";
    readonly logoUrl: "logoUrl";
    readonly description: "description";
    readonly isFeatured: "isFeatured";
    readonly createdAt: "createdAt";
};
export type BrandScalarFieldEnum = (typeof BrandScalarFieldEnum)[keyof typeof BrandScalarFieldEnum];
export declare const ProductCategoryScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly slug: "slug";
    readonly description: "description";
    readonly image: "image";
    readonly parentId: "parentId";
    readonly track: "track";
    readonly createdAt: "createdAt";
};
export type ProductCategoryScalarFieldEnum = (typeof ProductCategoryScalarFieldEnum)[keyof typeof ProductCategoryScalarFieldEnum];
export declare const ProductScalarFieldEnum: {
    readonly id: "id";
    readonly shopId: "shopId";
    readonly name: "name";
    readonly slug: "slug";
    readonly description: "description";
    readonly shortDescription: "shortDescription";
    readonly brandId: "brandId";
    readonly categoryId: "categoryId";
    readonly track: "track";
    readonly isFeatured: "isFeatured";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum];
export declare const FavoriteScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly productId: "productId";
    readonly createdAt: "createdAt";
};
export type FavoriteScalarFieldEnum = (typeof FavoriteScalarFieldEnum)[keyof typeof FavoriteScalarFieldEnum];
export declare const ProductVariantScalarFieldEnum: {
    readonly id: "id";
    readonly productId: "productId";
    readonly sku: "sku";
    readonly barcode: "barcode";
    readonly price: "price";
    readonly comparePrice: "comparePrice";
    readonly costPrice: "costPrice";
    readonly weight: "weight";
    readonly status: "status";
    readonly image: "image";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ProductVariantScalarFieldEnum = (typeof ProductVariantScalarFieldEnum)[keyof typeof ProductVariantScalarFieldEnum];
export declare const VariantOptionValueScalarFieldEnum: {
    readonly id: "id";
    readonly variantId: "variantId";
    readonly optionValueId: "optionValueId";
};
export type VariantOptionValueScalarFieldEnum = (typeof VariantOptionValueScalarFieldEnum)[keyof typeof VariantOptionValueScalarFieldEnum];
export declare const OptionValueScalarFieldEnum: {
    readonly id: "id";
    readonly value: "value";
    readonly optionId: "optionId";
    readonly createdAt: "createdAt";
};
export type OptionValueScalarFieldEnum = (typeof OptionValueScalarFieldEnum)[keyof typeof OptionValueScalarFieldEnum];
export declare const VariantOptionScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type VariantOptionScalarFieldEnum = (typeof VariantOptionScalarFieldEnum)[keyof typeof VariantOptionScalarFieldEnum];
export declare const VariantMediaScalarFieldEnum: {
    readonly id: "id";
    readonly variantId: "variantId";
    readonly url: "url";
    readonly type: "type";
    readonly position: "position";
};
export type VariantMediaScalarFieldEnum = (typeof VariantMediaScalarFieldEnum)[keyof typeof VariantMediaScalarFieldEnum];
export declare const InventoryScalarFieldEnum: {
    readonly id: "id";
    readonly variantId: "variantId";
    readonly locationId: "locationId";
    readonly quantity: "quantity";
    readonly reservedQuantity: "reservedQuantity";
    readonly reorderLevel: "reorderLevel";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type InventoryScalarFieldEnum = (typeof InventoryScalarFieldEnum)[keyof typeof InventoryScalarFieldEnum];
export declare const InventoryMovementScalarFieldEnum: {
    readonly id: "id";
    readonly variantId: "variantId";
    readonly locationId: "locationId";
    readonly inventoryId: "inventoryId";
    readonly type: "type";
    readonly quantity: "quantity";
    readonly referenceId: "referenceId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type InventoryMovementScalarFieldEnum = (typeof InventoryMovementScalarFieldEnum)[keyof typeof InventoryMovementScalarFieldEnum];
export declare const CartScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CartScalarFieldEnum = (typeof CartScalarFieldEnum)[keyof typeof CartScalarFieldEnum];
export declare const CartItemScalarFieldEnum: {
    readonly id: "id";
    readonly cartId: "cartId";
    readonly variantId: "variantId";
    readonly quantity: "quantity";
    readonly price: "price";
    readonly createdAt: "createdAt";
};
export type CartItemScalarFieldEnum = (typeof CartItemScalarFieldEnum)[keyof typeof CartItemScalarFieldEnum];
export declare const OrderScalarFieldEnum: {
    readonly id: "id";
    readonly shopId: "shopId";
    readonly userId: "userId";
    readonly orderNumber: "orderNumber";
    readonly status: "status";
    readonly subtotal: "subtotal";
    readonly taxTotal: "taxTotal";
    readonly discountTotal: "discountTotal";
    readonly grandTotal: "grandTotal";
    readonly currency: "currency";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum];
export declare const OrderItemScalarFieldEnum: {
    readonly id: "id";
    readonly orderId: "orderId";
    readonly variantId: "variantId";
    readonly productName: "productName";
    readonly variantName: "variantName";
    readonly price: "price";
    readonly quantity: "quantity";
    readonly total: "total";
};
export type OrderItemScalarFieldEnum = (typeof OrderItemScalarFieldEnum)[keyof typeof OrderItemScalarFieldEnum];
export declare const PaymentScalarFieldEnum: {
    readonly id: "id";
    readonly orderId: "orderId";
    readonly provider: "provider";
    readonly providerTransactionId: "providerTransactionId";
    readonly amount: "amount";
    readonly currency: "currency";
    readonly status: "status";
    readonly transactionId: "transactionId";
    readonly paidAt: "paidAt";
    readonly createdAt: "createdAt";
};
export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum];
export declare const ShipmentScalarFieldEnum: {
    readonly id: "id";
    readonly orderId: "orderId";
    readonly trackingNumber: "trackingNumber";
    readonly carrier: "carrier";
    readonly status: "status";
    readonly shippedAt: "shippedAt";
    readonly deliveredAt: "deliveredAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ShipmentScalarFieldEnum = (typeof ShipmentScalarFieldEnum)[keyof typeof ShipmentScalarFieldEnum];
export declare const ShippingAddressScalarFieldEnum: {
    readonly id: "id";
    readonly orderId: "orderId";
    readonly name: "name";
    readonly phone: "phone";
    readonly addressLine1: "addressLine1";
    readonly addressLine2: "addressLine2";
    readonly city: "city";
    readonly state: "state";
    readonly country: "country";
    readonly postalCode: "postalCode";
    readonly latitude: "latitude";
    readonly longitude: "longitude";
};
export type ShippingAddressScalarFieldEnum = (typeof ShippingAddressScalarFieldEnum)[keyof typeof ShippingAddressScalarFieldEnum];
export declare const SavedAddressScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly label: "label";
    readonly name: "name";
    readonly phone: "phone";
    readonly addressLine1: "addressLine1";
    readonly addressLine2: "addressLine2";
    readonly city: "city";
    readonly state: "state";
    readonly country: "country";
    readonly postalCode: "postalCode";
    readonly latitude: "latitude";
    readonly longitude: "longitude";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type SavedAddressScalarFieldEnum = (typeof SavedAddressScalarFieldEnum)[keyof typeof SavedAddressScalarFieldEnum];
export declare const CouponScalarFieldEnum: {
    readonly id: "id";
    readonly code: "code";
    readonly type: "type";
    readonly value: "value";
    readonly minOrderAmount: "minOrderAmount";
    readonly usageLimit: "usageLimit";
    readonly usedCount: "usedCount";
    readonly expiresAt: "expiresAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CouponScalarFieldEnum = (typeof CouponScalarFieldEnum)[keyof typeof CouponScalarFieldEnum];
export declare const CouponUsageScalarFieldEnum: {
    readonly id: "id";
    readonly couponId: "couponId";
    readonly userId: "userId";
    readonly orderId: "orderId";
    readonly usedAt: "usedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CouponUsageScalarFieldEnum = (typeof CouponUsageScalarFieldEnum)[keyof typeof CouponUsageScalarFieldEnum];
export declare const ReviewScalarFieldEnum: {
    readonly id: "id";
    readonly productId: "productId";
    readonly userId: "userId";
    readonly rating: "rating";
    readonly title: "title";
    readonly comment: "comment";
    readonly status: "status";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum];
export declare const ProductViewScalarFieldEnum: {
    readonly id: "id";
    readonly productId: "productId";
    readonly userId: "userId";
    readonly sessionId: "sessionId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ProductViewScalarFieldEnum = (typeof ProductViewScalarFieldEnum)[keyof typeof ProductViewScalarFieldEnum];
export declare const SearchLogScalarFieldEnum: {
    readonly id: "id";
    readonly query: "query";
    readonly userId: "userId";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type SearchLogScalarFieldEnum = (typeof SearchLogScalarFieldEnum)[keyof typeof SearchLogScalarFieldEnum];
export declare const NotificationScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly type: "type";
    readonly title: "title";
    readonly message: "message";
    readonly readAt: "readAt";
    readonly metadata: "metadata";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum];
export declare const SyncLogScalarFieldEnum: {
    readonly id: "id";
    readonly shopId: "shopId";
    readonly status: "status";
    readonly productsSynced: "productsSynced";
    readonly startedAt: "startedAt";
    readonly finishedAt: "finishedAt";
};
export type SyncLogScalarFieldEnum = (typeof SyncLogScalarFieldEnum)[keyof typeof SyncLogScalarFieldEnum];
export declare const SyncedProductScalarFieldEnum: {
    readonly id: "id";
    readonly productId: "productId";
    readonly externalProductId: "externalProductId";
    readonly syncedAt: "syncedAt";
};
export type SyncedProductScalarFieldEnum = (typeof SyncedProductScalarFieldEnum)[keyof typeof SyncedProductScalarFieldEnum];
export declare const ShopSettingScalarFieldEnum: {
    readonly id: "id";
    readonly shopId: "shopId";
    readonly key: "key";
    readonly value: "value";
    readonly updatedAt: "updatedAt";
};
export type ShopSettingScalarFieldEnum = (typeof ShopSettingScalarFieldEnum)[keyof typeof ShopSettingScalarFieldEnum];
export declare const SaleFromShopScalarFieldEnum: {
    readonly id: "id";
    readonly locationId: "locationId";
    readonly variantId: "variantId";
    readonly quantity: "quantity";
    readonly price: "price";
    readonly total: "total";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type SaleFromShopScalarFieldEnum = (typeof SaleFromShopScalarFieldEnum)[keyof typeof SaleFromShopScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: "DbNull";
    readonly JsonNull: "JsonNull";
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: "DbNull";
    readonly JsonNull: "JsonNull";
    readonly AnyNull: "AnyNull";
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map