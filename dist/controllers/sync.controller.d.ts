import { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
export declare const triggerSync: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const listSyncLogs: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const getSyncLogById: (req: AuthRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=sync.controller.d.ts.map