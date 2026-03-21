export declare function listMySavedAddresses(userId: string): Promise<any>;
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
}): Promise<any>;
export declare function deleteMySavedAddress(userId: string, addressId: string): Promise<{
    message: string;
}>;
//# sourceMappingURL=savedAddress.service.d.ts.map