export declare function listPermissions(query: {
    page?: number;
    pageSize?: number;
    search?: string;
    filter?: string;
    sort?: string;
}): Promise<{
    data: ({
        rolePermissions: ({
            role: {
                name: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            roleId: string;
            permissionId: string;
            createAction: boolean;
            readAction: boolean;
            updateAction: boolean;
            deleteAction: boolean;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        resource: string;
    })[];
    pagination: {
        total: number;
        page: number | undefined;
        pageSize: number | undefined;
        totalPages: number;
    };
}>;
export declare function getPermissionById(id: string): Promise<{
    rolePermissions: ({
        role: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        roleId: string;
        permissionId: string;
        createAction: boolean;
        readAction: boolean;
        updateAction: boolean;
        deleteAction: boolean;
    })[];
} & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
    resource: string;
}>;
export declare function createPermission(data: {
    resource: string;
    description?: string;
}): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
    resource: string;
}>;
export declare function updatePermission(id: string, data: {
    resource?: string;
    description?: string;
}): Promise<{
    id: string;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
    resource: string;
}>;
export declare function deletePermission(id: string): Promise<{
    message: string;
}>;
//# sourceMappingURL=permission.service.d.ts.map