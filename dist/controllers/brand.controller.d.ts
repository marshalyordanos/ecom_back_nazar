import { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
export declare const listBrands: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const getBrandById: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const createBrand: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const updateBrand: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const deleteBrand: (req: AuthRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=brand.controller.d.ts.map