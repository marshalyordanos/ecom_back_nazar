export declare function triggerProductSync(shopId: string): Promise<{
    id: string;
    status: import("../generated/prisma/enums").SyncStatus;
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
        id: string;
        status: import("../generated/prisma/enums").SyncStatus;
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
    id: string;
    status: import("../generated/prisma/enums").SyncStatus;
    shopId: string;
    productsSynced: number;
    startedAt: Date;
    finishedAt: Date | null;
}>;
//# sourceMappingURL=sync.service.d.ts.map