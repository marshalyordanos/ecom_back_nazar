import { Request, Response, NextFunction } from "express";
type AsyncFunction<T extends Request = Request> = (req: T, res: Response, next: NextFunction) => Promise<any>;
declare const catchAsync: <T extends Request = Request>(fn: AsyncFunction<T>) => (req: T, res: Response, next: NextFunction) => void;
export default catchAsync;
//# sourceMappingURL=catchAsync.d.ts.map