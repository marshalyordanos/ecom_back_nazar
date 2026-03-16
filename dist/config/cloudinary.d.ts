declare const cloudinary: any;
export interface UploadResult {
    url: string;
    public_id: string;
    secure_url: string;
    format?: string;
}
/**
 * Upload a file buffer to Cloudinary.
 * Accepts any file type supported by Cloudinary using resource_type: "auto".
 * This allows upload of images, videos, PDFs, docs, audio, and more.
 */
export declare const uploadToCloudinary: (buffer: Buffer, folder?: string, resourceType?: "auto" | "image" | "video" | "raw") => Promise<UploadResult>;
/**
 * Delete a file from Cloudinary
 */
export declare const deleteFromCloudinary: (publicId: string) => Promise<void>;
export default cloudinary;
//# sourceMappingURL=cloudinary.d.ts.map