import { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
export declare const listInventory: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const getByVariantId: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const updateInventory: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const listMovements: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const addMovement: (req: AuthRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=inventory.controller.d.ts.map