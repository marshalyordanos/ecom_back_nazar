import { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
export declare const listShipments: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const getShipmentById: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const getTracking: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const updateStatus: (req: AuthRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=shipment.controller.d.ts.map