import { prisma } from "../lib/prisma";
import AppError from "../utils/appError";
import { PrismaQueryFeature } from "../utils/apiFeature";
import fs from "fs";
import { uploadToCloudinary } from "../config/cloudinary";
const searchableFields = ["name", "slug", "description", "shortDescription"];
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
  },req?: any
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
  const feature = new PrismaQueryFeature<Record<string, unknown>, Record<string, string>>({
    ...query,
    searchableFields,
    dateFields,
  });
  const { skip, take, where, orderBy } = feature.getQuery();
  let whereWithShop:any = shopId ? { ...where, shopId } : where;
  if(track){
    whereWithShop = { ...whereWithShop, category: { track: { contains: track } } };
  }
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
    locationId: string;
    type: string;
    quantity: number;
  },
  file?: any
) {

  if(!data.locationId) {
    throw new AppError('Location is required', 400);
  }
  if(!data.type) {
    throw new AppError('Type is required', 400);
  }
  if(!data.quantity) {
    throw new AppError('Quantity is required', 400);
  }

  data.quantity = Number(data.quantity);

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
    let inventory = await prismaTx.inventory.findFirst({
      where: { variantId: variant.id, locationId: data.locationId },
    });
    if (!inventory) {
      inventory = await prismaTx.inventory.create({
        data: {
          variantId: variant.id,
          locationId: data.locationId,
          quantity: 0,
          reservedQuantity: 0,
        },
      });
    }

    const newQty =
      data.type === "PURCHASE" || data.type === "RETURN" || data.type === "TRANSFER"
        ? inventory.quantity + data.quantity
        : data.type === "SALE" || data.type === "ADJUSTMENT"
          ? inventory.quantity - data.quantity
          : inventory.quantity;

    await Promise.all([
      prismaTx.inventoryMovement.create({
        data: {
          variantId: variant.id,
          locationId: data.locationId,
          inventoryId: inventory.id,
          type: data.type as any,
          quantity: data.quantity,
          referenceId: undefined, // Set if needed
        },
      }),
      prismaTx.inventory.update({
        where: { id: inventory.id },
        data: { quantity: Math.max(0, newQty) },
      }),
    ]);
    
   

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