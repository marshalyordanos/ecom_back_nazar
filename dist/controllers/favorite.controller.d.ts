import { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
export declare const listFavoriteIds: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const listFavorites: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const addFavorite: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const removeFavorite: (req: AuthRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=favorite.controller.d.ts.map