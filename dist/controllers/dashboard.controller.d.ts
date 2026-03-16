import { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
export declare const getOverview: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const getSalesSummary: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const getOrdersSummary: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const getTopProducts: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const getLowInventory: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const getNewCustomers: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const getRecentOrders: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const getRecentActivities: (req: AuthRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=dashboard.controller.d.ts.map