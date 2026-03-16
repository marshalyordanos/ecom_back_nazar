import { Request, Response, NextFunction } from "express";
/**
 * Improved global error handler for Express.
 * Ensures Prisma, JWT, and generic errors are properly unwrapped and returned with correct status, code, and message.
 */
export declare const errHandling: (err: any, _req: Request, res: Response, _next: NextFunction) => void;
//# sourceMappingURL=errorController.d.ts.map