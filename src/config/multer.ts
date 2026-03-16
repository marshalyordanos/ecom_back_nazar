import multer from "multer";
import path from "path";
import fs from "fs";
// import AppError from "../utils/appError";

// Base upload directory: <project-root>/server/public/uploads
const uploadsRoot = path.join(__dirname, "..", "..", "public", "uploads");

if (!fs.existsSync(uploadsRoot)) {
  fs.mkdirSync(uploadsRoot, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsRoot);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext).replace(/\s+/g, "_");
    const uniqueSuffix = Date.now();
    cb(null, `${baseName}-${uniqueSuffix}${ext}`);
  },
});

const imageFileFilter = (
  _req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (!file.mimetype.startsWith("image/")) {
    // return cb(new AppError("Only image files are allowed", 400));
    return cb(null, true);
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter: imageFileFilter,
});

// Common helpers to reuse in different modules
const uploadSingleImage = (fieldName: string = "image") =>
  upload.single(fieldName);

export { upload, uploadSingleImage };