// "cloudinary" TS error fix: Use dynamic require for JS compatibility (when types are missing)

import { Readable } from 'stream';

const cloudinary: any = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
export const uploadToCloudinary = async (
  buffer: Buffer,
  folder: string = 'clean-addis',
  resourceType: 'auto' | 'image' | 'video' | 'raw' = 'auto'
): Promise<UploadResult> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType, // 'auto' lets Cloudinary detect file type
      },
      (error: any, result: any) => {
        if (error) {
          return reject(error);
        }
        if (!result) {
          return reject(new Error('Upload failed: No result returned'));
        }
        resolve({
          url: result.url,
          public_id: result.public_id,
          secure_url: result.secure_url,
          format: result.format,
        });
      }
    );

    const readableStream = new Readable();
    readableStream.push(buffer);
    readableStream.push(null);
    readableStream.pipe(uploadStream);
  });
};

/**
 * Delete a file from Cloudinary
 */
export const deleteFromCloudinary = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    throw error;
  }
};

export default cloudinary;
