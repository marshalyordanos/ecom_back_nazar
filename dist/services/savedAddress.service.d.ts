export declare function listMySavedAddresses(userId: string): Promise<{
    name: string;
    userId: string;
    id: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
    label: string;
    addressLine1: string;
    addressLine2: string | null;
    city: string;
    state: string | null;
    country: string;
    postalCode: string | null;
    latitude: number | null;
    longitude: number | null;
}[]>;
export declare function addMySavedAddress(userId: string, data: {
    label: string;
    name: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state?: string;
    country: string;
    postalCode?: string;
    latitude?: number;
    longitude?: number;
}): Promise<{
    name: string;
    userId: string;
    id: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
    label: string;
    addressLine1: string;
    addressLine2: string | null;
    city: string;
    state: string | null;
    country: string;
    postalCode: string | null;
    latitude: number | null;
    longitude: number | null;
}>;
export declare function deleteMySavedAddress(userId: string, addressId: string): Promise<{
    message: string;
}>;
//# sourceMappingURL=savedAddress.service.d.ts.map