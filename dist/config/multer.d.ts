import multer from "multer";
declare const upload: multer.Multer;
declare const uploadSingleImage: (fieldName?: string) => import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
export { upload, uploadSingleImage };
//# sourceMappingURL=multer.d.ts.map