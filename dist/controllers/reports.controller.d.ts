import { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
export declare const getSalesReport: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const getOrdersReport: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const getOrdersByStatus: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const getInventoryReport: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const getSyncReport: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const getSyncReportById: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const getTopProductsReport: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const getProductViewsReport: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const getCouponsReport: (req: AuthRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=reports.controller.d.ts.map