import { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
export declare const listCategories: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const getCategoryById: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const createCategory: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const updateCategory: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const deleteCategory: (req: AuthRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=category.controller.d.ts.map