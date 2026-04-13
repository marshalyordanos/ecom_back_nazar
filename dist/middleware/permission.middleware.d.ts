import { Response, NextFunction } from "express";
import type { AuthRequest } from "./auth.middleware";
export declare function requirePermission(resource: string, action: "create" | "read" | "update" | "delete"): (req: AuthRequest, _res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=permission.middleware.d.ts.map