import { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
export declare const getCart: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const addToCart: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const updateCartItem: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const removeCartItem: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const checkout: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const handleChapaCallback: (req: AuthRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=cart.controller.d.ts.map