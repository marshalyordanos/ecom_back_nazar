import { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
export declare const listReviews: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const listByProduct: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const getReviewById: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const createReview: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const updateReview: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const deleteReview: (req: AuthRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=review.controller.d.ts.map