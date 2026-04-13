import { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
export declare const register: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const createSuperAdmin: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const login: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const logout: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const refresh: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const forgotPassword: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const sendVerificationOtp: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const resendVerificationOtp: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const verifyAccount: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const requestPasswordReset: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const resendResetOtp: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const verifyResetOtp: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const resetPassword: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const changePassword: (req: AuthRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=auth.controller.d.ts.map