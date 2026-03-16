import { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
export declare const getProductViews: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const getSearches: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const getSalesReport: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const getOrdersReport: (req: AuthRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=analytics.controller.d.ts.map