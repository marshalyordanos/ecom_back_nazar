"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadSingleImage = exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// import AppError from "../utils/appError";
// Base upload directory: <project-root>/server/public/uploads
const uploadsRoot = path_1.default.join(__dirname, "..", "..", "public", "uploads");
if (!fs_1.default.existsSync(uploadsRoot)) {
    fs_1.default.mkdirSync(uploadsRoot, { recursive: true });
}
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadsRoot);
    },
    filename: (_req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        const baseName = path_1.default.basename(file.originalname, ext).replace(/\s+/g, "_");
        const uniqueSuffix = Date.now();
        cb(null, `${baseName}-${uniqueSuffix}${ext}`);
    },
});
const imageFileFilter = (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
        // return cb(new AppError("Only image files are allowed", 400));
        return cb(null, true);
    }
    cb(null, true);
};
const upload = (0, multer_1.default)({
    storage,
    fileFilter: imageFileFilter,
});
exports.upload = upload;
// Common helpers to reuse in different modules
const uploadSingleImage = (fieldName = "image") => upload.single(fieldName);
exports.uploadSingleImage = uploadSingleImage;
//# sourceMappingURL=multer.js.map