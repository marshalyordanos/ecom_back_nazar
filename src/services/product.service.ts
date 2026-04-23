import { prisma } from "../lib/prisma";
import AppError from "../utils/appError";
import { PrismaQueryFeature } from "../utils/apiFeature";
import fs from "fs";
import { uploadToCloudinary } from "../config/cloudinary";
const searchableFieldsforVariant = ["product.name","sku","product.brand.name",  "product.category.name", "product.description", "product.shortDescription"];
const searchableFields = ["name","slug","brand.name",  "category.name", "description", "shortDescription"];

const dateFields = ["createdAt", "updatedAt"];

export async function listProducts(
  shopId: string | undefined,
  track?: string,
  query?: {
    page?: number;
    pageSize?: number;
    search?: string;
    filter?: string;
    sort?: string;
  },
  req?: any,
  options?: {
    minPrice?: number;
    maxPrice?: number;
  }
) {
   // 🔥 Save search log
   if ((query && query?.search !== "" || query?.filter !== "")&& req?.user?.roles.includes("user")) {
    await prisma.searchLog.create({
      data: {
        query: query?.search || query?.filter || "",
        userId:   req.user?.id || null,
      },
    });
  }
  const rawSort = query?.sort;
  const sortWithoutVariantPrice = rawSort
    ?.split(",")
    .filter((item) => {
      const key = item.split(":")[0]?.trim();
      return key !== "variants.price" && key !== "vareints.price" && key !== "price";
    })
    .join(",");

  const feature = new PrismaQueryFeature<Record<string, unknown>, Record<string, string>>({
    ...query,
    sort: sortWithoutVariantPrice || undefined,
    searchableFields,
    dateFields,
  });
  const { skip, take, where, orderBy } = feature.getQuery();
  let whereWithShop:any = shopId ? { ...where, shopId } : where;
  if(track){
    whereWithShop = { ...whereWithShop, category: { track: { contains: track } } };
  }
  if (options?.minPrice != null || options?.maxPrice != null) {
    const priceRange: Record<string, number> = {};
    if (options.minPrice != null) priceRange.gte = options.minPrice;
    if (options.maxPrice != null) priceRange.lte = options.maxPrice;

    whereWithShop = {
      ...whereWithShop,
      variants: {
        some: {
          ...(Object.keys(priceRange).length > 0 ? { price: priceRange } : {}),
        },
      },
    };
  }

  const sortByPrice = rawSort
    ?.split(",")
    .find((item) => item.startsWith("variants.price:") || item.startsWith("vareints.price:") || item.startsWith("price:"));

  const [data, total] = await Promise.all([
    prisma.product.findMany({
      where: whereWithShop,
      orderBy,
      skip,
      take,
      include: {
        brand: { select: { id: true, name: true, slug: true } },
        category: { select: { id: true, name: true, slug: true,image: true,track: true } },
        variants: {
          take: 5,
          include: { media: { take: 1 } },
        },
      },
    }),
    prisma.product.count({ where: whereWithShop }),
  ]);
  const sortedData = sortByPrice
    ? [...data].sort((a: any, b: any) => {
        const pa = a?.variants?.[0]?.price ?? 0;
        const pb = b?.variants?.[0]?.price ?? 0;
        return sortByPrice.endsWith(":desc") ? pb - pa : pa - pb;
      })
    : data;

  return { data: sortedData, pagination: feature.getPagination(total) };
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
          variantOptionValues: {
            include: { optionValue: { include: { option: true } } },
          },
        },
      },
    },
  });
  if (!product) throw new AppError("Product not found", 404);
  return product;
}

export async function getProductByIdMobile(id: string, shopId?: string,userId?: string,sessionId?: string) {
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
          variantOptionValues: {
            include: { optionValue: { include: { option: true } } },
          },
        },
      },
    },
  });

  if (!product) throw new AppError("Product not found", 404);

   // 🔥 Track view
   await prisma.productView.create({
    data: {
      productId:product.id,
      userId: userId || null,
      sessionId: sessionId || null,
    },
  });

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

export async function listVariants(shopId?: string, query?: {
  page?: number;
  pageSize?: number;
  search?: string;
  filter?: string;
  sort?: string;
}) {
  const feature = new PrismaQueryFeature<Record<string, unknown>, Record<string, string>>({
    ...query,
    searchableFields: searchableFieldsforVariant,
    dateFields,
  });
  const { skip, take, where, orderBy } = feature.getQuery();
  let whereWithShop:any = shopId ? { ...where, shopId } : where;
  const variants = await prisma.productVariant.findMany({
    where: whereWithShop,
    orderBy,
    skip,
    take,
    include: {
      product: { select: { id: true, name: true, slug: true,brand: { select: { id: true, name: true, slug: true } }, category: { select: { id: true, name: true, slug: true } } } },
      inventories: true,
      variantOptionValues: {
        include: { optionValue: { include: { option: true } } },
      },
      media: { orderBy: { position: "asc" } },
    },
  });
  const total = await prisma.productVariant.count({ where: whereWithShop });
  return { data: variants, pagination: feature.getPagination(total) };
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

export async function getNewProducts(shopId?: string, limit = 10) {
  const where: Record<string, unknown> = { status: "ACTIVE" };
  if (shopId) (where as any).shopId = shopId;
  return prisma.product.findMany({
    where,
    orderBy: { createdAt: "desc" },
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
}

export async function getPopularProducts(shopId?: string, limit = 10) {
  const grouped = await prisma.orderItem.groupBy({
    by: ["variantId"],
    _sum: { quantity: true },
    where: shopId ? { order: { shopId } } : undefined,
    orderBy: { _sum: { quantity: "desc" } },
    take: Math.max(limit * 4, 20),
  });

  if (!grouped.length) return [];

  const variantIds = grouped.map((g) => g.variantId);
  const variants = await prisma.productVariant.findMany({
    where: { id: { in: variantIds } },
    select: { id: true, productId: true },
  });
  const productIdsByVariantId = new Map(variants.map((v) => [v.id, v.productId]));

  const seen = new Set<string>();
  const rankedProductIds: string[] = [];
  for (const row of grouped) {
    const productId = productIdsByVariantId.get(row.variantId);
    if (!productId || seen.has(productId)) continue;
    seen.add(productId);
    rankedProductIds.push(productId);
    if (rankedProductIds.length >= limit) break;
  }
  if (!rankedProductIds.length) return [];

  const products = await prisma.product.findMany({
    where: { id: { in: rankedProductIds }, status: "ACTIVE" },
    include: {
      brand: { select: { id: true, name: true, slug: true } },
      category: { select: { id: true, name: true, slug: true } },
      variants: {
        take: 3,
        include: { media: { take: 1 } },
      },
    },
  });
  const byId = new Map(products.map((p) => [p.id, p]));
  return rankedProductIds.map((id) => byId.get(id)).filter(Boolean);
}

export async function getMostViewedProducts(shopId?: string, limit = 10) {
  const grouped = await prisma.productView.groupBy({
    by: ["productId"],
    where: shopId ? { product: { shopId } } : undefined,
    _count: { id: true },
    orderBy: { _count: { id: "desc" } },
    take: Math.max(limit * 2, 20),
  });

  if (!grouped.length) return [];
  const rankedIds = grouped.map((g) => g.productId);
  const products = await prisma.product.findMany({
    where: { id: { in: rankedIds }, status: "ACTIVE" },
    include: {
      brand: { select: { id: true, name: true, slug: true } },
      category: { select: { id: true, name: true, slug: true } },
      variants: {
        take: 3,
        include: { media: { take: 1 } },
      },
    },
  });
  const byId = new Map(products.map((p) => [p.id, p]));
  return rankedIds.map((id) => byId.get(id)).filter(Boolean).slice(0, limit);
}

export async function getVariantById(id: string) {
  const variant = await prisma.productVariant.findUnique({
    where: { id },
    include: {
      inventories: true,
      variantOptionValues: {
        include: { optionValue: { include: { option: true } } },
      },
      media: { orderBy: { position: "asc" } },
    },
  });
  return variant;
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
    locationId: string;
    type: string;
    quantity: number;
  },
  file?: any
) {



  if (!file) {
    throw new AppError('No file uploaded', 400);
  }

  const fileBuffer = fs.readFileSync(file.path);
  const uploadResult = await uploadToCloudinary(fileBuffer, "ecommerce/variants", "image");
  fs.unlinkSync(file.path);

  if (!uploadResult.secure_url) {
    throw new AppError('Failed to upload image', 500);
  }

  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw new AppError("Product not found", 404);

  // Start Transaction
  const result = await prisma.$transaction(async (prismaTx) => {
    // 1. Create the product variant
    const variant = await prismaTx.productVariant.create({
      data: {
        productId,
        sku: data.sku,
        barcode: data.barcode,
        price: Number(data.price),
        comparePrice: Number(data.comparePrice),
        costPrice: Number(data.costPrice),
        weight: Number(data.weight),
        image: uploadResult.secure_url,
        status: data.status as any,
        
      },
      include: {
        inventories: true,
      },
    });

    // 2. Inventory logic ported from inventory.service.ts
   let locations= await prismaTx.shopLocation.findMany({
    where: {
      shopId: product.shopId,
    },
   });
   // create inventory for each location
   await Promise.all(locations.map(async (location) => {
    await prismaTx.inventory.create({
      data: {
        variantId: variant.id,
        locationId: location.id,
        quantity: 0,
        reservedQuantity: 0,
      },
    });
   }));

    return  await prismaTx.productVariant.findUnique({
      where: { id: variant.id },
      include: {
        inventories: true,
      },
    });;
  });
  // End Transaction

  return result;
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
    image?: string;
  },
  file?: any
) {
  // if (!file) {
  //   throw new AppError('No file uploaded', 400);
  // }
  if (file) {
  const fileBuffer = fs.readFileSync(file.path);
  const uploadResult = await uploadToCloudinary(fileBuffer, "ecommerce/variants", "image");
  fs.unlinkSync(file.path);
  // if (!uploadResult.secure_url) {
  //   throw new AppError('Failed to upload image', 500);
  // }
  if (uploadResult.secure_url) {
    data.image = uploadResult.secure_url;
  }
}
if(data.price) data.price = Number(data.price);
if(data.comparePrice) data.comparePrice = Number(data.comparePrice);
if(data.costPrice) data.costPrice = Number(data.costPrice);
if(data.weight) data.weight = Number(data.weight);
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

export async function createOptionValue(
  optionId: string,
  data: { value: string; colorValue?: string | null }
) {
  const option = await prisma.variantOption.findUnique({ where: { id: optionId } });
  if (!option) throw new AppError("Variant option not found", 404);
  const isColorOption = option.name.trim().toLowerCase() === "color";
  const optionValue = await prisma.optionValue.create({
    data: {
      optionId,
      value: data.value,
      colorValue: isColorOption ? data.colorValue ?? null : null,
    },
  });
  return optionValue;
}

export async function updateOptionValue(valueId: string, data: { value?: string; colorValue?: string | null }) {
  const existing = await prisma.optionValue.findUnique({
    where: { id: valueId },
    include: { option: true },
  });
  if (!existing) throw new AppError("Option value not found", 404);
  const isColorOption = existing.option.name.trim().toLowerCase() === "color";
  const optionValue = await prisma.optionValue.update({
    where: { id: valueId },
    data: {
      ...(typeof data.value === "string" ? { value: data.value } : {}),
      ...(isColorOption
        ? { colorValue: data.colorValue ?? existing.colorValue ?? null }
        : { colorValue: null }),
    } as Parameters<typeof prisma.optionValue.update>[0]["data"],
  });
  return optionValue;
}

export async function deleteOptionValue(valueId: string) {
  await prisma.optionValue.delete({ where: { id: valueId } });
  return { message: "Option value deleted successfully" };
}

// --------- Assign and Remove Option Values to Product Variant ---------

/**
 * Assigns option values (array of optionValueIds) to the given variantId.
 * This will add any new values and remove any values not present in the array.
 */
export async function setVariantOptionValues(
  variantId: string,
  optionValueIds: string[]
) {
  // Ensure unique input, and check existence of the variant
  const uniqueOptionValueIds = Array.from(new Set(optionValueIds));
  const variant = await prisma.productVariant.findUnique({
    where: { id: variantId },
  });
  if (!variant) throw new AppError("Variant not found", 404);

  // Get current values
  const current = await prisma.variantOptionValue.findMany({
    where: { variantId },
    select: { optionValueId: true },
  });
  const currentIds = new Set(current.map((v) => v.optionValueId));

  // Calculate adds and removes
  const toAdd = uniqueOptionValueIds.filter((id) => !currentIds.has(id));
  const toRemove = Array.from(currentIds).filter((id) => !uniqueOptionValueIds.includes(id));

  // Add missing values
  await Promise.all(
    toAdd.map((optionValueId) =>
      prisma.variantOptionValue.create({
        data: { variantId, optionValueId },
      })
    )
  );

  // Remove old values
  await Promise.all(
    toRemove.map((optionValueId) =>
      prisma.variantOptionValue.deleteMany({
        where: { variantId, optionValueId },
      })
    )
  );

  // Return updated variant with values
  const updated = await prisma.productVariant.findUnique({
    where: { id: variantId },
    include: {
      variantOptionValues: {
        include: { optionValue: { include: { option: true } } },
      }
    }
  });
  return updated;
}

/**
 * Remove a particular optionValue from the variant.
 */
export async function removeVariantOptionValue(
  variantId: string,
  optionValueId: string
) {
  await prisma.variantOptionValue.deleteMany({
    where: {
      variantId,
      optionValueId,
    },
  });
  return { message: "Variant option value removed successfully" };
}

/**
 * Add/Assign a particular optionValue to a variant (idempotent).
 */
export async function assignVariantOptionValue(
  variantId: string,
  optionValueId: string
) {
  // Checks for existing assignment
  const exists = await prisma.variantOptionValue.findUnique({
    where: { variantId_optionValueId: { variantId, optionValueId } },
  });
  if (exists) return exists;
  const result = await prisma.variantOptionValue.create({
    data: { variantId, optionValueId },
  });
  return result;
}