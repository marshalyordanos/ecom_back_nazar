import { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
export declare const listPayments: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const getPaymentById: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const capturePayment: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const refundPayment: (req: AuthRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=payment.controller.d.ts.map