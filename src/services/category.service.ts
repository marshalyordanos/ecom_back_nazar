import { prisma } from "../lib/prisma";
import AppError from "../utils/appError";
import { PrismaQueryFeature } from "../utils/apiFeature";
import fs from "fs";
import { uploadToCloudinary } from "../config/cloudinary";

const searchableFields = ["name", "slug", "description"];
const dateFields = ["createdAt"];

export async function listCategories(query: {
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
    prisma.productCategory.findMany({
      where,
      orderBy,
      skip,
      take,
      include: {
        parent: { select: { id: true, name: true, slug: true } },
        children: { select: { id: true, name: true, slug: true } },
      },
    }),
    prisma.productCategory.count({ where }),
  ]);
  return { data, pagination: feature.getPagination(total) };
}

/** Get categories as a tree (root categories with nested children). */
export async function listCategoriesTree() {
  const roots = await prisma.productCategory.findMany({
    where: { parentId: null },
    include: {
      children: {
        include: {
          children: true,
        },
      },
    },
    orderBy: { name: "asc" },
  });
  return roots;
}

export async function getCategoryById(id: string) {
  const category = await prisma.productCategory.findUnique({
    where: { id },
    include: {
      parent: true,
      children: true,
      products: { take: 20 },
    },
  });
  if (!category) throw new AppError("Category not found", 404);
  return category;
}

export async function createCategory(data: {
  name: string;
  slug: string;
  description?: string;
  parentId?: string;
  track?: string;
}, file: any) {
  if (!file) {
    throw new AppError('No file uploaded', 400);
  }

  const fileBuffer = fs.readFileSync(file.path);
  const uploadResult = await uploadToCloudinary(fileBuffer, 'ecommerce/categories', 'image');
  fs.unlinkSync(file.path);
  if(data.parentId){
    const parent = await prisma.productCategory.findUnique({ where: { id: data.parentId } });
    if(parent){
      data.track = parent.track ?? '';
    }
  }
  const category = await prisma.productCategory.create({
    data: {
      name: data.name,
      slug: data.slug,
      description: data.description,
      parentId: data.parentId,
      image: uploadResult.secure_url,
    },
  });
  if(category){
    if(data.parentId){
  return  await prisma.productCategory.update({ where: { id: category.id }, data: { track: String(data.track)+'/'+String(category.id) } });
    }else{
   return await prisma.productCategory.update({ where: { id: category.id }, data: { track: String(category.id) } });

    }
  }
  return category;
}

export async function updateCategory(
  id: string,
  data: { name?: string; slug?: string; description?: string; parentId?: string; image?: string; track?: string },
  file: any
) {
  // if (!file) {
  //   throw new AppError('No file uploaded', 400);
  // }
  if (file) {
  const fileBuffer = fs.readFileSync(file.path);
  const uploadResult = await uploadToCloudinary(fileBuffer, 'ecommerce/categories', 'image');
  fs.unlinkSync(file.path);

  if (uploadResult.secure_url) {
    data.image = uploadResult.secure_url;
  }
}
  const category = await prisma.productCategory.update({
    where: { id },
    data: data as Parameters<typeof prisma.productCategory.update>[0]["data"],
  });
  return category;
}

export async function deleteCategory(id: string) {
  await prisma.productCategory.delete({ where: { id } });
  return { message: "Category deleted successfully" };
}
