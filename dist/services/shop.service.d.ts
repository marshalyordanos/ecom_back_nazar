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
            addressLine1: string;
            addressLine2: string | null;
            city: string;
            state: string | null;
            country: string;
            postalCode: string | null;
            latitude: number | null;
            longitude: number | null;
            shopId: string;
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
        addressLine1: string;
        addressLine2: string | null;
        city: string;
        state: string | null;
        country: string;
        postalCode: string | null;
        latitude: number | null;
        longitude: number | null;
        shopId: string;
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
    addressLine1: string;
    addressLine2: string | null;
    city: string;
    state: string | null;
    country: string;
    postalCode: string | null;
    latitude: number | null;
    longitude: number | null;
    shopId: string;
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
    addressLine1: string;
    addressLine2: string | null;
    city: string;
    state: string | null;
    country: string;
    postalCode: string | null;
    latitude: number | null;
    longitude: number | null;
    shopId: string;
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
    addressLine1: string;
    addressLine2: string | null;
    city: string;
    state: string | null;
    country: string;
    postalCode: string | null;
    latitude: number | null;
    longitude: number | null;
    shopId: string;
}>;
export declare function deleteLocation(locationId: string): Promise<{
    message: string;
}>;
export declare function addSalesFromShop(data: {
    locationId: string;
    variantId: string;
    quantity: number;
}): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    total: number;
    price: number;
    quantity: number;
    locationId: string;
    variantId: string;
}>;
//# sourceMappingURL=shop.service.d.ts.map