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
/**
 * Returns product categories as a tree, each category includes:
 * - totalSalesAmount: Total money sales for the category and all its descendants.
 * - totalProductsSold: Total quantity of products sold for the category and all its descendants.
 */

type CategoryNode = {
  id: string;
  parentId: string | null;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  track: string;
  children?: CategoryNode[];
  totalSalesAmount: number;
  totalProductsSold: number;
};

/** Get categories as a tree (root categories with nested children). */
export async function listCategoriesTree2() {
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

export async function listCategoriesTree() {
  // Step 1: Get all categories (ensure track is string, not null)
  const allCategoriesRaw = await prisma.productCategory.findMany({
    select: {
      id: true,
      parentId: true,
      name: true,
      slug: true,
      description: true,
      image: true,
      track: true,
    },
    orderBy: { name: "asc" },
  });

  // Preprocessing for easier descendant lookup
  const allCategories: Omit<CategoryNode, 'totalSalesAmount' | 'totalProductsSold' | 'children'>[] = allCategoriesRaw.map(cat => ({
    id: cat.id,
    parentId: cat.parentId,
    name: cat.name,
    slug: cat.slug,
    description: cat.description,
    image: cat.image,
    track: cat.track ?? "",
  }));

  // Step 2: For every category, find all its descendant ids using track
  const categoryDescendants: Record<string, Set<string>> = {};
  const separator = '/';
  for (const cat of allCategories) {
    const trackPrefix = cat.track ? cat.track + separator : '';
    // A category's descendants are any category whose track starts with cat.track + '/'
    categoryDescendants[cat.id] = new Set([cat.id]);
    for (const otherCat of allCategories) {
      if (
        otherCat.id !== cat.id &&
        otherCat.track &&
        cat.track &&
        otherCat.track.startsWith(trackPrefix)
      ) {
        categoryDescendants[cat.id].add(otherCat.id);
      }
    }
  }

  // Step 3: For each category, gather product IDs for it + all descendants
  // Also, compute sales and product count for each category tree
  const salesInfoByCategory: Record<
    string,
    { totalSalesAmount: number; totalProductsSold: number; totalProducts: number }
  > = {};

  for (const [catId, allIds] of Object.entries(categoryDescendants)) {
    // 1. All descendant categories (including itself)
    const categoryIds = Array.from(allIds);

    // 2. Fetch all products in these categories
    const products = await prisma.product.findMany({
      where: { categoryId: { in: categoryIds } },
      select: { id: true }
    });
    const productIds = products.map((p) => p.id);
    let categoryTotalAmount = 0;
    let categoryTotalSold = 0;
    let categoryTotalProducts = productIds.length;

    if (productIds.length > 0) {
      // Compute aggregate order stats for all these products
      const res = await prisma.orderItem.aggregate({
        _sum: { total: true, quantity: true },
        where: { variant: { productId: { in: productIds } } },
      });
      categoryTotalAmount = res._sum.total ?? 0;
      categoryTotalSold = res._sum.quantity ?? 0;
    }

    salesInfoByCategory[catId] = {
      totalSalesAmount: categoryTotalAmount,
      totalProductsSold: categoryTotalSold,
      totalProducts: categoryTotalProducts,
    };
  }

  // Step 4: Treeify categories
  type CategoryTreeNode = CategoryNode & { totalProducts: number; children?: CategoryTreeNode[] };

  function buildTree(
    nodes: (Omit<CategoryNode, 'totalSalesAmount' | 'totalProductsSold' | 'children'>)[],
    parentId: string | null
  ): CategoryTreeNode[] {
    return nodes
      .filter((node) => node.parentId === parentId)
      .map((node) => ({
        ...node,
        totalSalesAmount: salesInfoByCategory[node.id]?.totalSalesAmount || 0,
        totalProductsSold: salesInfoByCategory[node.id]?.totalProductsSold || 0,
        totalProducts: salesInfoByCategory[node.id]?.totalProducts || 0,
        children: buildTree(nodes, node.id)
      }));
  }

  const tree = buildTree(allCategories, null);
  return tree;
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
      return await prisma.productCategory.update({ where: { id: category.id }, data: { track: String(data.track)+'/'+String(category.id) } });
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
  if (data.parentId === "") {
    (data as { parentId?: string | null }).parentId = null;
  }
  if(data.parentId){
    const parent = await prisma.productCategory.findUnique({ where: { id: data.parentId } });
    if(parent){
      data.track = String(parent.track)+'/'+String(id);
    }
  }else{
    data.track = String(id);
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
