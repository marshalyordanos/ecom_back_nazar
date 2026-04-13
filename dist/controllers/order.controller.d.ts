import { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
export declare const listMyOrders: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const getOrderById: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const trackOrder: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const cancelOrder: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const completeOrder: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const listOrderItems: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const listOrdersAdmin: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const createOrderAdmin: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const guestCheckout: (req: AuthRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=order.controller.d.ts.map