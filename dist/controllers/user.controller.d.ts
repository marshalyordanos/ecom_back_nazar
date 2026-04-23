import { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
export declare const getMe: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const updateMe: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const updateMyPassword: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const getById: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const listUsers: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const updateUser: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const deactivateUser: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const listMyNotifications: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const markMyNotificationRead: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const markAllMyNotificationsRead: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const getMyUnreadNotificationsCount: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const registerMyPushToken: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const removeMyPushToken: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const listMySavedAddresses: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const addMySavedAddress: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const deleteMySavedAddress: (req: AuthRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=user.controller.d.ts.map