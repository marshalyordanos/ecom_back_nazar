import { Response, NextFunction } from "express";
import type { AuthRequest } from "./auth.middleware";
type Action = "create" | "read" | "update" | "delete";
/**
 * Require the user to have a role that has the given permission with the given action.
 * Expects req.user.roles to be set (use after protect middleware).
 */
export declare const requirePermission: (resource: string, action: Action) => (req: AuthRequest, _res: Response, next: NextFunction) => Promise<void>;
/**
 * Require any of the given permissions (resource + action pairs).
 */
export declare const requireAnyPermission: (...checks: Array<{
    resource: string;
    action: Action;
}>) => (req: AuthRequest, _res: Response, next: NextFunction) => Promise<void>;
export {};
//# sourceMappingURL=rbac.middleware.d.ts.map