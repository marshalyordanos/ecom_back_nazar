export declare function listRoles(query: {
    page?: number;
    pageSize?: number;
    search?: string;
    filter?: string;
    sort?: string;
}): Promise<{
    data: ({
        rolePermissions: ({
            permission: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                resource: string;
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
        name: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
    })[];
    pagination: {
        total: number;
        page: number | undefined;
        pageSize: number | undefined;
        totalPages: number;
    };
}>;
export declare function getRoleById(id: string): Promise<{
    rolePermissions: ({
        permission: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            resource: string;
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
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
}>;
export declare function createRole(data: {
    name: string;
    description?: string;
}): Promise<{
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
}>;
export declare function updateRole(id: string, data: {
    name?: string;
    description?: string;
}): Promise<{
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
}>;
export declare function deleteRole(id: string): Promise<{
    message: string;
}>;
export declare function assignPermissionsToRole(roleId: string, permissions: Array<{
    permissionId: string;
    createAction?: boolean;
    readAction?: boolean;
    updateAction?: boolean;
    deleteAction?: boolean;
}>): Promise<{
    rolePermissions: ({
        permission: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            resource: string;
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
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
}>;
export declare function removePermissionsFromRole(roleId: string, permissionIds: string[]): Promise<{
    rolePermissions: ({
        permission: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            resource: string;
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
    name: string;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    description: string | null;
}>;
//# sourceMappingURL=role.service.d.ts.map