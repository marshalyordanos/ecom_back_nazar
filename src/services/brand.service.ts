import { prisma } from "../lib/prisma";
import AppError from "../utils/appError";
import { PrismaQueryFeature } from "../utils/apiFeature";
import fs from 'fs';
import { uploadToCloudinary } from "../config/cloudinary";
import { boolean } from "joi";

const searchableFields = ["name", "slug", "description"];
const dateFields = ["createdAt"];

export async function listBrands(query: {
  page?: number;
  pageSize?: number;
  search?: string;
  filter?: string;
  sort?: string;
}) {
  const feature = new PrismaQueryFeature<Record<string, unknown>, Record<string, string>>({
    ...query,
    searchableFields,
    dateFields,
  });
  const { skip, take, where, orderBy } = feature.getQuery();

  const [data, total] = await Promise.all([
    prisma.brand.findMany({ where, orderBy, skip, take }),
    prisma.brand.count({ where }),
  ]);
  return { data, pagination: feature.getPagination(total) };
}

export async function getBrandById(id: string) {
  const brand = await prisma.brand.findUnique({
    where: { id },
    include: { products: { take: 10 } },
  });
  if (!brand) throw new AppError("Brand not found", 404);
  return brand;
}

export async function createBrand(data: {
  name: string;
  slug: string;
  logoUrl?: string;
  description?: string;
  isFeatured?: boolean;
}, file: any) {
  // console.log("brand file", req.files,req.file)

  if (!file) {
    throw new AppError('No file uploaded', 400);
  }

  const fileBuffer = fs.readFileSync(file.path);
  console.log("brand11111111")

  // Upload to Cloudinary
  const uploadResult = await uploadToCloudinary(fileBuffer, 'ecommerce/brands', 'image');
  fs.unlinkSync(file.path);  
  console.log("brand111111122221")

  let isFeaturedString: string = data.isFeatured as unknown as string;
  const brand = await prisma.brand.create({
    data: {
      name: data.name,
      slug: data.slug,
      logoUrl: uploadResult.secure_url,
      description: data.description,
      isFeatured:  isFeaturedString === 'true' ,
    },
  });
  return brand;
}

export async function updateBrand(
  id: string,
  data: { name?: string; slug?: string; logoUrl?: string; description?: string; isFeatured?: boolean }
, file: any) {
  console.log("brand update", data)
  if(file){

  const fileBuffer = fs.readFileSync(file.path);

  // Upload to Cloudinary
  const uploadResult = await uploadToCloudinary(fileBuffer, 'ecommerce/brands', 'image');
  fs.unlinkSync(file.path);  
if (uploadResult.secure_url) {
    data.logoUrl = uploadResult.secure_url;
  }
  }
  let isFeaturedString: string = data.isFeatured as unknown as string;
  data.isFeatured = isFeaturedString === 'true';  
  const brand = await prisma.brand.update({
    where: { id },
    data: data as Parameters<typeof prisma.brand.update>[0]["data"],
  });
  return brand;
}

export async function deleteBrand(id: string) {
  await prisma.brand.delete({ where: { id } });
  return { message: "Brand deleted successfully" };
}
