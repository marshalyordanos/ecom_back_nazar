import { Request, Response, NextFunction } from "express";
export interface JwtPayload {
    userId: string;
    email: string;
    type: string;
}
export interface AuthRequest extends Request {
    user?: {
        id: string;
        email: string;
        roles: string[];
    };
}
/**
 * Protect routes: require valid JWT access token.
 */
export declare const protect: (req: AuthRequest, _res: Response, next: NextFunction) => Promise<void>;
/**
 * Optional auth: attach user if token present, do not require it.
 */
export declare const optionalAuth: (req: AuthRequest, _res: Response, next: NextFunction) => Promise<void>;
/**
 * Require at least one of the given roles.
 */
export declare const restrictTo: (...roleNames: string[]) => (req: AuthRequest, _res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.middleware.d.ts.map