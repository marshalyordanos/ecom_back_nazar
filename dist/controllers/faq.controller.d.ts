import { Response, NextFunction } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
/** Public: published FAQs only. */
export declare const listPublishedFaqs: (req: AuthRequest, res: Response, next: NextFunction) => void;
/** Admin: paginated list, optional ?status=DRAFT|PUBLISHED */
export declare const listFaqsAdmin: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const getFaqById: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const createFaq: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const updateFaq: (req: AuthRequest, res: Response, next: NextFunction) => void;
export declare const deleteFaq: (req: AuthRequest, res: Response, next: NextFunction) => void;
//# sourceMappingURL=faq.controller.d.ts.map