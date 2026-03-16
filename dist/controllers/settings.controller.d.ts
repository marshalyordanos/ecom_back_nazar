import { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
export declare const getSettings: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const getSettingByKey: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const setSetting: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const updateSetting: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const deleteSetting: (req: AuthRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=settings.controller.d.ts.map