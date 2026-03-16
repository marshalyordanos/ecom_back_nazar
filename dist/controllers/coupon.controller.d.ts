import { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
export declare const listCoupons: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const getCouponById: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const createCoupon: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const updateCoupon: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const deleteCoupon: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const useCoupon: (req: AuthRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=coupon.controller.d.ts.map