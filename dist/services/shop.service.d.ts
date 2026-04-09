export declare function listShops(query: {
    page?: number;
    pageSize?: number;
    search?: string;
    filter?: string;
    sort?: string;
}): Promise<{
    data: {
        name: string;
        email: string | null;
        id: string;
        phone: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        slug: string;
        logoUrl: string | null;
        currency: string;
        timezone: string;
        locations: {
            name: string;
            id: string;
            phone: string | null;
            createdAt: Date;
            shopId: string;
            addressLine1: string;
            addressLine2: string | null;
            city: string;
            state: string | null;
            country: string;
            postalCode: string | null;
            latitude: number | null;
            longitude: number | null;
        }[];
    }[];
    pagination: {
        total: number;
        page: number | undefined;
        pageSize: number | undefined;
        totalPages: number;
    };
}>;
export declare function getShopById(id: string): Promise<{
    locations: {
        name: string;
        id: string;
        phone: string | null;
        createdAt: Date;
        shopId: string;
        addressLine1: string;
        addressLine2: string | null;
        city: string;
        state: string | null;
        country: string;
        postalCode: string | null;
        latitude: number | null;
        longitude: number | null;
    }[];
} & {
    name: string;
    email: string | null;
    id: string;
    phone: string | null;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
    slug: string;
    logoUrl: string | null;
    currency: string;
    timezone: string;
}>;
export declare function createOrUpdateShop(data: {
    name: string;
    slug: string;
    email?: string;
    phone?: string;
    description?: string;
    currency: string;
    timezone: string;
    status: string;
    logoUrl?: string;
}, file?: any): Promise<{
    name: string;
    email: string | null;
    id: string;
    phone: string | null;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
    slug: string;
    logoUrl: string | null;
    currency: string;
    timezone: string;
}>;
export declare function updateShop(id: string, data: {
    name?: string;
    email?: string;
    phone?: string;
    logoUrl?: string;
    description?: string;
    currency?: string;
    timezone?: string;
    status?: string;
}, file?: any): Promise<{
    name: string;
    email: string | null;
    id: string;
    phone: string | null;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
    slug: string;
    logoUrl: string | null;
    currency: string;
    timezone: string;
}>;
export declare function listShopLocations(shopId: string): Promise<{
    name: string;
    id: string;
    phone: string | null;
    createdAt: Date;
    shopId: string;
    addressLine1: string;
    addressLine2: string | null;
    city: string;
    state: string | null;
    country: string;
    postalCode: string | null;
    latitude: number | null;
    longitude: number | null;
}[]>;
export declare function addShopLocation(shopId: string, data: {
    name: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state?: string;
    country: string;
    postalCode?: string;
    latitude?: number;
    longitude?: number;
    phone?: string;
}): Promise<{
    name: string;
    id: string;
    phone: string | null;
    createdAt: Date;
    shopId: string;
    addressLine1: string;
    addressLine2: string | null;
    city: string;
    state: string | null;
    country: string;
    postalCode: string | null;
    latitude: number | null;
    longitude: number | null;
}>;
export declare function updateLocation(locationId: string, data: {
    name?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    latitude?: number;
    longitude?: number;
    phone?: string;
}): Promise<{
    name: string;
    id: string;
    phone: string | null;
    createdAt: Date;
    shopId: string;
    addressLine1: string;
    addressLine2: string | null;
    city: string;
    state: string | null;
    country: string;
    postalCode: string | null;
    latitude: number | null;
    longitude: number | null;
}>;
export declare function deleteLocation(locationId: string): Promise<{
    message: string;
}>;
type SaleLineInput = {
    variantId: string;
    quantity: number;
};
export type AddSalesFromShopBody = {
    locationId: string;
    items?: SaleLineInput[];
    variantId?: string;
    quantity?: number;
};
export declare function addSalesFromShop(body: AddSalesFromShopBody): Promise<{
    sales: {
        id: string;
        locationId: string;
        createdAt: Date;
        updatedAt: Date;
        total: number;
        variantId: string;
        quantity: number;
        price: number;
    }[];
}>;
export declare function listSalesFromShop(query: {
    page?: number;
    pageSize?: number;
    search?: string;
    filter?: string;
    sort?: string;
    shopId?: string;
    locationId?: string;
}): Promise<{
    data: ({
        location: {
            shop: {
                name: string;
                id: string;
            };
        } & {
            name: string;
            id: string;
            phone: string | null;
            createdAt: Date;
            shopId: string;
            addressLine1: string;
            addressLine2: string | null;
            city: string;
            state: string | null;
            country: string;
            postalCode: string | null;
            latitude: number | null;
            longitude: number | null;
        };
        variant: {
            product: {
                name: string;
                id: string;
            };
        } & {
            id: string;
            status: import("../generated/prisma/enums").ProductStatus;
            createdAt: Date;
            updatedAt: Date;
            image: string | null;
            price: number;
            productId: string;
            sku: string;
            barcode: string | null;
            comparePrice: number | null;
            costPrice: number | null;
            weight: number | null;
        };
    } & {
        id: string;
        locationId: string;
        createdAt: Date;
        updatedAt: Date;
        total: number;
        variantId: string;
        quantity: number;
        price: number;
    })[];
    pagination: {
        total: number;
        page: number | undefined;
        pageSize: number | undefined;
        totalPages: number;
    };
}>;
export declare function getSaleFromShopById(id: string): Promise<{
    location: {
        shop: {
            name: string;
            id: string;
        };
    } & {
        name: string;
        id: string;
        phone: string | null;
        createdAt: Date;
        shopId: string;
        addressLine1: string;
        addressLine2: string | null;
        city: string;
        state: string | null;
        country: string;
        postalCode: string | null;
        latitude: number | null;
        longitude: number | null;
    };
    variant: {
        product: {
            name: string;
            id: string;
        };
    } & {
        id: string;
        status: import("../generated/prisma/enums").ProductStatus;
        createdAt: Date;
        updatedAt: Date;
        image: string | null;
        price: number;
        productId: string;
        sku: string;
        barcode: string | null;
        comparePrice: number | null;
        costPrice: number | null;
        weight: number | null;
    };
} & {
    id: string;
    locationId: string;
    createdAt: Date;
    updatedAt: Date;
    total: number;
    variantId: string;
    quantity: number;
    price: number;
}>;
export declare function updateSaleFromShop(id: string, body: {
    quantity?: number;
    price?: number;
    variantId?: unknown;
    locationId?: unknown;
}): Promise<{
    location: {
        shop: {
            name: string;
            id: string;
        };
    } & {
        name: string;
        id: string;
        phone: string | null;
        createdAt: Date;
        shopId: string;
        addressLine1: string;
        addressLine2: string | null;
        city: string;
        state: string | null;
        country: string;
        postalCode: string | null;
        latitude: number | null;
        longitude: number | null;
    };
    variant: {
        product: {
            name: string;
            id: string;
        };
    } & {
        id: string;
        status: import("../generated/prisma/enums").ProductStatus;
        createdAt: Date;
        updatedAt: Date;
        image: string | null;
        price: number;
        productId: string;
        sku: string;
        barcode: string | null;
        comparePrice: number | null;
        costPrice: number | null;
        weight: number | null;
    };
} & {
    id: string;
    locationId: string;
    createdAt: Date;
    updatedAt: Date;
    total: number;
    variantId: string;
    quantity: number;
    price: number;
}>;
export declare function deleteSaleFromShop(id: string): Promise<{
    message: string;
}>;
/** Stats use UTC calendar month boundaries for revenueThisMonth. */
export declare function getSalesFromShopStats(): Promise<{
    totalRecords: number;
    totalRevenue: number;
    totalQuantity: number;
    revenueThisMonth: number;
}>;
export {};
//# sourceMappingURL=shop.service.d.ts.map