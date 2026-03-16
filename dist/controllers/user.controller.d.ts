import { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
export declare const getMe: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const updateMe: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const updateMyPassword: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const getById: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const listUsers: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const updateUser: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const deactivateUser: (req: AuthRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=user.controller.d.ts.map