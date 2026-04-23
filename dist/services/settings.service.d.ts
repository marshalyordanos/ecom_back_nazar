export declare function getShopSettings(shopId: string): Promise<Record<string, string>>;
export declare function getSettingByKey(shopId: string, key: string): Promise<{
    value: string;
    id: string;
    updatedAt: Date;
    key: string;
    shopId: string;
}>;
export declare function setSetting(shopId: string, key: string, value: string): Promise<{
    value: string;
    id: string;
    updatedAt: Date;
    key: string;
    shopId: string;
}>;
export declare function deleteSetting(shopId: string, key: string): Promise<{
    message: string;
}>;
export declare function setMultipleSettings(shopId: string, data: Record<string, string>): Promise<{
    value: string;
    id: string;
    updatedAt: Date;
    key: string;
    shopId: string;
}[]>;
//# sourceMappingURL=settings.service.d.ts.map