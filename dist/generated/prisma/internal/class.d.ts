import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "./prismaNamespace";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
    /**
   * ## Prisma Client
   *
   * Type-safe database client for TypeScript
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Shops
   * const shops = await prisma.shop.findMany()
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options: Prisma.Subset<Options, Prisma.PrismaClientOptions>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Shops
 * const shops = await prisma.shop.findMany()
 * ```
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = undefined, in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    /**
     * Connect with the database
     */
    $connect(): runtime.Types.Utils.JsPromise<void>;
    /**
     * Disconnect from the database
     */
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    /**
       * Executes a prepared raw query and returns the number of affected rows.
       * @example
       * ```
       * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
       * ```
       *
       * Read more in our [docs](https://pris.ly/d/raw-queries).
       */
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Executes a raw query and returns the number of affected rows.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Performs a prepared raw query and returns the `SELECT` data.
     * @example
     * ```
     * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Performs a raw query and returns the `SELECT` data.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
     * @example
     * ```
     * const [george, bob, alice] = await prisma.$transaction([
     *   prisma.user.create({ data: { name: 'George' } }),
     *   prisma.user.create({ data: { name: 'Bob' } }),
     *   prisma.user.create({ data: { name: 'Alice' } }),
     * ])
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
     */
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    /**
 * `prisma.shop`: Exposes CRUD operations for the **Shop** model.
  * Example usage:
  * ```ts
  * // Fetch zero or more Shops
  * const shops = await prisma.shop.findMany()
  * ```
  */
    get shop(): Prisma.ShopDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.shopLocation`: Exposes CRUD operations for the **ShopLocation** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ShopLocations
      * const shopLocations = await prisma.shopLocation.findMany()
      * ```
      */
    get shopLocation(): Prisma.ShopLocationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.user`: Exposes CRUD operations for the **User** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Users
      * const users = await prisma.user.findMany()
      * ```
      */
    get user(): Prisma.UserDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.token`: Exposes CRUD operations for the **Token** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Tokens
      * const tokens = await prisma.token.findMany()
      * ```
      */
    get token(): Prisma.TokenDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.otpRecord`: Exposes CRUD operations for the **OtpRecord** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more OtpRecords
      * const otpRecords = await prisma.otpRecord.findMany()
      * ```
      */
    get otpRecord(): Prisma.OtpRecordDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.role`: Exposes CRUD operations for the **Role** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Roles
      * const roles = await prisma.role.findMany()
      * ```
      */
    get role(): Prisma.RoleDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.permission`: Exposes CRUD operations for the **Permission** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Permissions
      * const permissions = await prisma.permission.findMany()
      * ```
      */
    get permission(): Prisma.PermissionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.rolePermission`: Exposes CRUD operations for the **RolePermission** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more RolePermissions
      * const rolePermissions = await prisma.rolePermission.findMany()
      * ```
      */
    get rolePermission(): Prisma.RolePermissionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.brand`: Exposes CRUD operations for the **Brand** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Brands
      * const brands = await prisma.brand.findMany()
      * ```
      */
    get brand(): Prisma.BrandDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.productCategory`: Exposes CRUD operations for the **ProductCategory** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ProductCategories
      * const productCategories = await prisma.productCategory.findMany()
      * ```
      */
    get productCategory(): Prisma.ProductCategoryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.product`: Exposes CRUD operations for the **Product** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Products
      * const products = await prisma.product.findMany()
      * ```
      */
    get product(): Prisma.ProductDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.productVariant`: Exposes CRUD operations for the **ProductVariant** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ProductVariants
      * const productVariants = await prisma.productVariant.findMany()
      * ```
      */
    get productVariant(): Prisma.ProductVariantDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.variantOptionValue`: Exposes CRUD operations for the **VariantOptionValue** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more VariantOptionValues
      * const variantOptionValues = await prisma.variantOptionValue.findMany()
      * ```
      */
    get variantOptionValue(): Prisma.VariantOptionValueDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.optionValue`: Exposes CRUD operations for the **OptionValue** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more OptionValues
      * const optionValues = await prisma.optionValue.findMany()
      * ```
      */
    get optionValue(): Prisma.OptionValueDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.variantOption`: Exposes CRUD operations for the **VariantOption** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more VariantOptions
      * const variantOptions = await prisma.variantOption.findMany()
      * ```
      */
    get variantOption(): Prisma.VariantOptionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.variantMedia`: Exposes CRUD operations for the **VariantMedia** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more VariantMedias
      * const variantMedias = await prisma.variantMedia.findMany()
      * ```
      */
    get variantMedia(): Prisma.VariantMediaDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.inventory`: Exposes CRUD operations for the **Inventory** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Inventories
      * const inventories = await prisma.inventory.findMany()
      * ```
      */
    get inventory(): Prisma.InventoryDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.inventoryMovement`: Exposes CRUD operations for the **InventoryMovement** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more InventoryMovements
      * const inventoryMovements = await prisma.inventoryMovement.findMany()
      * ```
      */
    get inventoryMovement(): Prisma.InventoryMovementDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.cart`: Exposes CRUD operations for the **Cart** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Carts
      * const carts = await prisma.cart.findMany()
      * ```
      */
    get cart(): Prisma.CartDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.cartItem`: Exposes CRUD operations for the **CartItem** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more CartItems
      * const cartItems = await prisma.cartItem.findMany()
      * ```
      */
    get cartItem(): Prisma.CartItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.order`: Exposes CRUD operations for the **Order** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Orders
      * const orders = await prisma.order.findMany()
      * ```
      */
    get order(): Prisma.OrderDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.orderItem`: Exposes CRUD operations for the **OrderItem** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more OrderItems
      * const orderItems = await prisma.orderItem.findMany()
      * ```
      */
    get orderItem(): Prisma.OrderItemDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Payments
      * const payments = await prisma.payment.findMany()
      * ```
      */
    get payment(): Prisma.PaymentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.shipment`: Exposes CRUD operations for the **Shipment** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Shipments
      * const shipments = await prisma.shipment.findMany()
      * ```
      */
    get shipment(): Prisma.ShipmentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.shippingAddress`: Exposes CRUD operations for the **ShippingAddress** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ShippingAddresses
      * const shippingAddresses = await prisma.shippingAddress.findMany()
      * ```
      */
    get shippingAddress(): Prisma.ShippingAddressDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.savedAddress`: Exposes CRUD operations for the **SavedAddress** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more SavedAddresses
      * const savedAddresses = await prisma.savedAddress.findMany()
      * ```
      */
    get savedAddress(): Prisma.SavedAddressDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.coupon`: Exposes CRUD operations for the **Coupon** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Coupons
      * const coupons = await prisma.coupon.findMany()
      * ```
      */
    get coupon(): Prisma.CouponDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.couponUsage`: Exposes CRUD operations for the **CouponUsage** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more CouponUsages
      * const couponUsages = await prisma.couponUsage.findMany()
      * ```
      */
    get couponUsage(): Prisma.CouponUsageDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.review`: Exposes CRUD operations for the **Review** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Reviews
      * const reviews = await prisma.review.findMany()
      * ```
      */
    get review(): Prisma.ReviewDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.productView`: Exposes CRUD operations for the **ProductView** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ProductViews
      * const productViews = await prisma.productView.findMany()
      * ```
      */
    get productView(): Prisma.ProductViewDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.searchLog`: Exposes CRUD operations for the **SearchLog** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more SearchLogs
      * const searchLogs = await prisma.searchLog.findMany()
      * ```
      */
    get searchLog(): Prisma.SearchLogDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Notifications
      * const notifications = await prisma.notification.findMany()
      * ```
      */
    get notification(): Prisma.NotificationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.syncLog`: Exposes CRUD operations for the **SyncLog** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more SyncLogs
      * const syncLogs = await prisma.syncLog.findMany()
      * ```
      */
    get syncLog(): Prisma.SyncLogDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.syncedProduct`: Exposes CRUD operations for the **SyncedProduct** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more SyncedProducts
      * const syncedProducts = await prisma.syncedProduct.findMany()
      * ```
      */
    get syncedProduct(): Prisma.SyncedProductDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.shopSetting`: Exposes CRUD operations for the **ShopSetting** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ShopSettings
      * const shopSettings = await prisma.shopSetting.findMany()
      * ```
      */
    get shopSetting(): Prisma.ShopSettingDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(): PrismaClientConstructor;
//# sourceMappingURL=class.d.ts.map