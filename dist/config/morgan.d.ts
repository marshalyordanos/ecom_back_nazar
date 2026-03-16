import { Request, Response } from "express";
declare const successHandler: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, callback: (err?: Error) => void) => void;
declare const errorHandler: (req: Request<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, callback: (err?: Error) => void) => void;
export { successHandler, errorHandler };
//# sourceMappingURL=morgan.d.ts.map