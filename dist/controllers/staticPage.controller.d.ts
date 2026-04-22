import { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
/** Public */
export declare const getPageByType: (req: AuthRequest, res: Response, next: NextFunction) => void;
/** Admin */
export declare const upsertPageByType: (req: AuthRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=staticPage.controller.d.ts.map