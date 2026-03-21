import { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
export declare const listShops: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const getShopById: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const updateShop: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const createOrUpdateShop: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const listShopLocations: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const addShopLocation: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const updateLocation: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const deleteLocation: (req: AuthRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=shop.controller.d.ts.map