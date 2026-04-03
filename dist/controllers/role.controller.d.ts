import { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
export declare const listRoles: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const getRoleById: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const createRole: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const updateRole: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const deleteRole: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const assignPermissions: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const removePermissions: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const assignRoleToUser: (req: AuthRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=role.controller.d.ts.map