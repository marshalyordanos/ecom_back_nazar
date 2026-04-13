export declare function triggerProductSync(shopId: string): Promise<{
    status: import("../generated/prisma/enums").SyncStatus;
    id: string;
    shopId: string;
    productsSynced: number;
    startedAt: Date;
    finishedAt: Date | null;
}>;
export declare function listSyncLogs(shopId: string | undefined, query: {
    page?: number;
    pageSize?: number;
}): Promise<{
    data: {
        status: import("../generated/prisma/enums").SyncStatus;
        id: string;
        shopId: string;
        productsSynced: number;
        startedAt: Date;
        finishedAt: Date | null;
    }[];
    pagination: {
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
    };
}>;
export declare function getSyncLogById(id: string): Promise<{
    status: import("../generated/prisma/enums").SyncStatus;
    id: string;
    shopId: string;
    productsSynced: number;
    startedAt: Date;
    finishedAt: Date | null;
}>;
//# sourceMappingURL=sync.service.d.ts.map