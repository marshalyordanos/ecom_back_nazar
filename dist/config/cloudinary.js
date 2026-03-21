"use strict";
// "cloudinary" TS error fix: Use dynamic require for JS compatibility (when types are missing)
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFromCloudinary = exports.uploadToCloudinary = void 0;
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
/**
 * Upload a file buffer to Cloudinary.
 * Accepts any file type supported by Cloudinary using resource_type: "auto".
 * This allows upload of images, videos, PDFs, docs, audio, and more.
 */
const uploadToCloudinary = async (buffer, folder = 'clean-addis', resourceType = 'auto') => {
    return new Promise((resolve, reject) => {
        console.log("cloudinary11111111");
        const uploadStream = cloudinary.uploader.upload_stream({
            folder,
            resource_type: resourceType,
        }, (error, result) => {
            if (error) {
                console.error("Cloudinary error:", error);
                return reject(error);
            }
            if (!result) {
                return reject(new Error('Upload failed: No result returned'));
            }
            console.log("Cloudinary success");
            resolve({
                url: result.url,
                public_id: result.public_id,
                secure_url: result.secure_url,
                format: result.format,
            });
        });
        uploadStream.end(buffer); // ✅ FIX
    });
};
exports.uploadToCloudinary = uploadToCloudinary;
/**
 * Delete a file from Cloudinary
 */
const deleteFromCloudinary = async (publicId) => {
    try {
        await cloudinary.uploader.destroy(publicId);
    }
    catch (error) {
        console.error('Error deleting from Cloudinary:', error);
        throw error;
    }
};
exports.deleteFromCloudinary = deleteFromCloudinary;
exports.default = cloudinary;
//# sourceMappingURL=cloudinary.js.map