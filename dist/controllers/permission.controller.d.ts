import { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
export declare const listPermissions: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const getPermissionById: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const createPermission: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const updatePermission: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const deletePermission: (req: AuthRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=permission.controller.d.ts.map