import { prisma } from "../lib/prisma";
import AppError from "../utils/appError";
import { PrismaQueryFeature } from "../utils/apiFeature";

const searchableFields = ["name", "slug", "description", "shortDescription"];
const dateFields = ["createdAt", "updatedAt"];

export async function listProducts(
  shopId: string | undefined,
  query: {
    page?: number;
    pageSize?: number;
    search?: string;
    filter?: string;
    sort?: string;
  }
) {
  const feature = new PrismaQueryFeature<Record<string, unknown>, Record<string, string>>({
    ...query,
    searchableFields,
    dateFields,
  });
  const { skip, take, where, orderBy } = feature.getQuery();
  const whereWithShop = shopId ? { ...where, shopId } : where;

  const [data, total] = await Promise.all([
    prisma.product.findMany({
      where: whereWithShop,
      orderBy,
      skip,
      take,
      include: {
        brand: { select: { id: true, name: true, slug: true } },
        category: { select: { id: true, name: true, slug: true } },
        variants: {
          take: 5,
          include: { media: { take: 1 } },
        },
      },
    }),
    prisma.product.count({ where: whereWithShop }),
  ]);
  return { data, pagination: feature.getPagination(total) };
}

export async function getProductById(id: string, shopId?: string) {
  const where: Record<string, unknown> = { id };
  if (shopId) (where as any).shopId = shopId;
  const product = await prisma.product.findFirst({
    where,
    include: {
      shop: { select: { id: true, name: true, slug: true } },
      brand: true,
      category: true,
      variants: {
        include: {
          media: { orderBy: { position: "asc" } },
          inventories: { include: { location: true } },
        },
      },
    },
  });
  if (!product) throw new AppError("Product not found", 404);
  return product;
}

export async function createProduct(
  shopId: string,
  data: {
    name: string;
    slug: string;
    description?: string;
    shortDescription?: string;
    brandId?: string;
    categoryId?: string;
    isFeatured?: boolean;
    status: string;
  }
) {
  const product = await prisma.product.create({
    data: {
      shopId,
      name: data.name,
      slug: data.slug,
      description: data.description,
      shortDescription: data.shortDescription,
      brandId: data.brandId,
      categoryId: data.categoryId,
      isFeatured: data.isFeatured ?? false,
      status: data.status as any,
    },
  });
  return product;
}

export async function updateProduct(
  id: string,
  shopId: string,
  data: {
    name?: string;
    slug?: string;
    description?: string;
    shortDescription?: string;
    brandId?: string;
    categoryId?: string;
    isFeatured?: boolean;
    status?: string;
  }
) {
  const product = await prisma.product.update({
    where: { id },
    data: data as Parameters<typeof prisma.product.update>[0]["data"],
  });
  return product;
}

export async function deleteProduct(id: string, _shopId?: string) {
  await prisma.product.delete({ where: { id } });
  return { message: "Product deleted successfully" };
}

export async function getFeaturedProducts(shopId?: string, limit = 10) {
  const where: Record<string, unknown> = { isFeatured: true, status: "ACTIVE" };
  if (shopId) (where as any).shopId = shopId;
  const products = await prisma.product.findMany({
    where,
    take: limit,
    include: {
      brand: { select: { id: true, name: true, slug: true } },
      category: { select: { id: true, name: true, slug: true } },
      variants: {
        take: 3,
        include: { media: { take: 1 } },
      },
    },
  });
  return products;
}

// --------- Variants ---------
export async function createVariant(
  productId: string,
  data: {
    sku: string;
    barcode?: string;
    price: number;
    comparePrice?: number;
    costPrice?: number;
    weight?: number;
    status: string;
  }
) {
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw new AppError("Product not found", 404);
  const variant = await prisma.productVariant.create({
    data: {
      productId,
      sku: data.sku,
      barcode: data.barcode,
      price: data.price,
      comparePrice: data.comparePrice,
      costPrice: data.costPrice,
      weight: data.weight,
      status: data.status as any,
    },
  });
  return variant;
}

export async function updateVariant(
  variantId: string,
  data: {
    sku?: string;
    barcode?: string;
    price?: number;
    comparePrice?: number;
    costPrice?: number;
    weight?: number;
    status?: string;
  }
) {
  const variant = await prisma.productVariant.update({
    where: { id: variantId },
    data: data as Parameters<typeof prisma.productVariant.update>[0]["data"],
  });
  return variant;
}

export async function deleteVariant(variantId: string) {
  await prisma.productVariant.delete({ where: { id: variantId } });
  return { message: "Variant deleted successfully" };
}

export async function addVariantMedia(variantId: string, url: string, type: string, position?: number) {
  const media = await prisma.variantMedia.create({
    data: { variantId, url, type, position: position ?? null },
  });
  return media;
}

export async function removeVariantMedia(mediaId: string) {
  await prisma.variantMedia.delete({ where: { id: mediaId } });
  return { message: "Media removed successfully" };
}

// --------- VariantOption (e.g. Size, Color) ---------
export async function listVariantOptions() {
  const options = await prisma.variantOption.findMany({
    orderBy: { name: "asc" },
    include: { values: true },
  });
  return options;
}

export async function getVariantOptionById(optionId: string) {
  const option = await prisma.variantOption.findUnique({
    where: { id: optionId },
    include: { values: true },
  });
  if (!option) throw new AppError("Variant option not found", 404);
  return option;
}

export async function createVariantOption(data: { name: string }) {
  const option = await prisma.variantOption.create({
    data: { name: data.name },
  });
  return option;
}

export async function updateVariantOption(optionId: string, data: { name?: string }) {
  const option = await prisma.variantOption.update({
    where: { id: optionId },
    data: data as Parameters<typeof prisma.variantOption.update>[0]["data"],
  });
  return option;
}

export async function deleteVariantOption(optionId: string) {
  await prisma.variantOption.delete({ where: { id: optionId } });
  return { message: "Variant option deleted successfully" };
}

// --------- OptionValue (e.g. S, M, L under Size) ---------
export async function listOptionValues(optionId: string) {
  const option = await prisma.variantOption.findUnique({ where: { id: optionId } });
  if (!option) throw new AppError("Variant option not found", 404);
  const values = await prisma.optionValue.findMany({
    where: { optionId },
    orderBy: { value: "asc" },
  });
  return values;
}

export async function getOptionValueById(valueId: string) {
  const value = await prisma.optionValue.findUnique({
    where: { id: valueId },
    include: { option: true },
  });
  if (!value) throw new AppError("Option value not found", 404);
  return value;
}

export async function createOptionValue(optionId: string, data: { value: string }) {
  const option = await prisma.variantOption.findUnique({ where: { id: optionId } });
  if (!option) throw new AppError("Variant option not found", 404);
  const optionValue = await prisma.optionValue.create({
    data: { optionId, value: data.value },
  });
  return optionValue;
}

export async function updateOptionValue(valueId: string, data: { value?: string }) {
  const optionValue = await prisma.optionValue.update({
    where: { id: valueId },
    data: data as Parameters<typeof prisma.optionValue.update>[0]["data"],
  });
  return optionValue;
}

export async function deleteOptionValue(valueId: string) {
  await prisma.optionValue.delete({ where: { id: valueId } });
  return { message: "Option value deleted successfully" };
}
