import { prisma } from "../lib/prisma";
import AppError from "../utils/appError";
import { PrismaQueryFeature } from "../utils/apiFeature";
import fs from "fs";
import { uploadToCloudinary } from "../config/cloudinary";

const searchableFields = ["name", "slug", "email", "description"];
const dateFields = ["createdAt", "updatedAt"];

export async function listShops(query: {
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
    prisma.shop.findMany({
      where,
      orderBy,
      skip,
      take,
      select: {
        id: true,
        name: true,
        slug: true,
        email: true,
        phone: true,
        logoUrl: true,
        description: true,
        currency: true,
        timezone: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        locations:true
      },
    }),
    prisma.shop.count({ where }),
  ]);
  return { data, pagination: feature.getPagination(total) };
}

export async function getShopById(id: string) {
  const shop = await prisma.shop.findUnique({
    where: { id },
    include: { locations: true },
  });
  if (!shop) throw new AppError("Shop not found", 404);
  return shop;
}

// Create or update the single shop (since only one shop row is allowed).
// If any shop exists, update it, otherwise create a new one.
// For logo, support uploading via Cloudinary if a file is provided.
export async function createOrUpdateShop(
  data: {
    name: string;
    slug: string;
    email?: string;
    phone?: string;
    description?: string;
    currency: string;
    timezone: string;
    status: string;
    logoUrl?: string;
  },
  file?: any
) {
  let logoUrl = data.logoUrl;

  if (file) {
    const fileBuffer = fs.readFileSync(file.path);
    const uploadResult = await uploadToCloudinary(fileBuffer, "ecommerce/shops", "image");
    fs.unlinkSync(file.path);
    if (uploadResult.secure_url) {
      logoUrl = uploadResult.secure_url;
    }
  }

  const existingShop = await prisma.shop.findFirst();

  if (existingShop) {
    // Update the only shop row
    const shop = await prisma.shop.update({
      where: { id: existingShop.id },
      data: {
        ...data,
        logoUrl,
      } as Parameters<typeof prisma.shop.update>[0]["data"],
    });
    return shop;
  } else {
    // Create the shop row
    const shop = await prisma.shop.create({
      data: {
        ...data,
        logoUrl,
      },
    });
    return shop;
  }
}

export async function updateShop(
  id: string,
  data: {
    name?: string;
    email?: string;
    phone?: string;
    logoUrl?: string;
    description?: string;
    currency?: string;
    timezone?: string;
    status?: string;
  },
  file?: any
) {
  let newData = { ...data };

  if (file) {
    const fileBuffer = fs.readFileSync(file.path);
    const uploadResult = await uploadToCloudinary(fileBuffer, "ecommerce/shops", "image");
    fs.unlinkSync(file.path);
    if (uploadResult.secure_url) {
      newData.logoUrl = uploadResult.secure_url;
    }
  }

  const shop = await prisma.shop.update({
    where: { id },
    data: newData as Parameters<typeof prisma.shop.update>[0]["data"],
  });
  return shop;
}

export async function listShopLocations(shopId: string) {
  const locations = await prisma.shopLocation.findMany({
    where: { shopId },
    orderBy: { createdAt: "desc" },
  });
  return locations;
}

export async function addShopLocation(
  shopId: string,
  data: {
    name: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state?: string;
    country: string;
    postalCode?: string;
    latitude?: number;
    longitude?: number;
    phone?: string;
  }
) {
  const location = await prisma.shopLocation.create({
    data: { shopId, ...data },
  });
  return location;
}

export async function updateLocation(
  locationId: string,
  data: {
    name?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    latitude?: number;
    longitude?: number;
    phone?: string;
  }
) {
  const location = await prisma.shopLocation.update({
    where: { id: locationId },
    data: data as Parameters<typeof prisma.shopLocation.update>[0]["data"],
  });
  return location;
}

export async function deleteLocation(locationId: string) {
  await prisma.shopLocation.delete({ where: { id: locationId } });
  return { message: "Location deleted successfully" };
}

type SaleLineInput = { variantId: string; quantity: number };

export type AddSalesFromShopBody = {
  locationId: string;
  items?: SaleLineInput[];
  variantId?: string;
  quantity?: number;
};

function normalizeSaleLines(body: AddSalesFromShopBody): SaleLineInput[] {
  if (Array.isArray(body.items) && body.items.length > 0) {
    return body.items.map((row) => ({
      variantId: String(row.variantId ?? ""),
      quantity: Number(row.quantity),
    }));
  }
  if (body.variantId != null && body.quantity != null) {
    return [{ variantId: String(body.variantId), quantity: Number(body.quantity) }];
  }
  return [];
}

function mergeDuplicateVariantLines(lines: SaleLineInput[]): SaleLineInput[] {
  const merged = new Map<string, number>();
  for (const { variantId, quantity } of lines) {
    merged.set(variantId, (merged.get(variantId) ?? 0) + quantity);
  }
  return Array.from(merged.entries()).map(([variantId, quantity]) => ({ variantId, quantity }));
}

export async function addSalesFromShop(body: AddSalesFromShopBody) {
  const { locationId } = body;
  if (!locationId || typeof locationId !== "string") {
    throw new AppError("locationId is required", 400);
  }

  const rawItems = normalizeSaleLines(body);
  if (rawItems.length === 0) {
    throw new AppError("items[] or variantId and quantity are required", 400);
  }

  for (const row of rawItems) {
    if (!row.variantId) {
      throw new AppError("Each item must have a variantId", 400);
    }
    if (!Number.isFinite(row.quantity) || row.quantity < 1 || !Number.isInteger(row.quantity)) {
      throw new AppError("Each quantity must be a positive integer", 400);
    }
  }

  const lines = mergeDuplicateVariantLines(rawItems);

  const location = await prisma.shopLocation.findUnique({ where: { id: locationId } });
  if (!location) throw new AppError("Location not found", 404);

  const result = await prisma.$transaction(async (tx) => {
    type LineMeta = {
      variantId: string;
      quantity: number;
      variant: NonNullable<Awaited<ReturnType<typeof tx.productVariant.findUnique>>>;
    };

    const validated: LineMeta[] = [];

    for (const line of lines) {
      const variant = await tx.productVariant.findUnique({
        where: { id: line.variantId },
        include: { product: { select: { name: true } } },
      });
      if (!variant) {
        throw new AppError("Variant not found", 404);
      }

      const inventory = await tx.inventory.findUnique({
        where: {
          variantId_locationId: {
            variantId: line.variantId,
            locationId,
          },
        },
      });

      if (!inventory) {
        const label = variant.product?.name ? `${variant.product.name} (${variant.sku})` : variant.sku;
        throw new AppError(`No inventory for this variant at this location: ${label}`, 400);
      }

      if (inventory.quantity < line.quantity) {
        const label = variant.product?.name ? `${variant.product.name} (${variant.sku})` : variant.sku;
        throw new AppError(
          `Insufficient stock for ${label}. Available: ${inventory.quantity}, requested: ${line.quantity}`,
          400
        );
      }

      validated.push({ variantId: line.variantId, quantity: line.quantity, variant });
    }

    const sales = [];
    for (const row of validated) {
      const sale = await tx.saleFromShop.create({
        data: {
          locationId,
          variantId: row.variantId,
          quantity: row.quantity,
          price: row.variant.price,
          total: row.variant.price * row.quantity,
        },
      });
      await tx.inventory.update({
        where: {
          variantId_locationId: {
            variantId: row.variantId,
            locationId,
          },
        },
        data: { quantity: { decrement: row.quantity } },
      });
      sales.push(sale);
    }

    return sales;
  });

  return { sales: result };
}

const saleFromShopInclude = {
  variant: {
    include: {
      product: { select: { id: true, name: true } },
    },
  },
  location: {
    include: {
      shop: { select: { id: true, name: true } },
    },
  },
} as const;

const saleFromShopSearchableFields = [
  "variant.sku",
  "variant.product.name",
  "location.name",
  "location.shop.name",
];

const saleFromShopDateFields = ["createdAt", "updatedAt"];

export async function listSalesFromShop(query: {
  page?: number;
  pageSize?: number;
  search?: string;
  filter?: string;
  sort?: string;
  shopId?: string;
  locationId?: string;
}) {
  const feature = new PrismaQueryFeature<Record<string, unknown>, Record<string, string>>({
    ...query,
    searchableFields: saleFromShopSearchableFields,
    dateFields: saleFromShopDateFields,
  });
  const { skip, take, where, orderBy } = feature.getQuery();

  const parts: Record<string, unknown>[] = [];
  if (Object.keys(where).length > 0) parts.push(where);
  if (query.shopId) parts.push({ location: { shopId: query.shopId } });
  if (query.locationId) parts.push({ locationId: query.locationId });
  const whereFinal =
    parts.length === 0 ? {} : parts.length === 1 ? parts[0]! : { AND: parts };

  const [data, total] = await Promise.all([
    prisma.saleFromShop.findMany({
      where: whereFinal,
      orderBy,
      skip,
      take,
      include: saleFromShopInclude,
    }),
    prisma.saleFromShop.count({ where: whereFinal }),
  ]);
  return { data, pagination: feature.getPagination(total) };
}

export async function getSaleFromShopById(id: string) {
  const sale = await prisma.saleFromShop.findUnique({
    where: { id },
    include: saleFromShopInclude,
  });
  if (!sale) throw new AppError("Sale not found", 404);
  return sale;
}

export async function updateSaleFromShop(
  id: string,
  body: { quantity?: number; price?: number; variantId?: unknown; locationId?: unknown }
) {
  if (body.variantId !== undefined || body.locationId !== undefined) {
    throw new AppError("Cannot change variant or location on an existing sale", 400);
  }
  const hasQty = body.quantity !== undefined;
  const hasPrice = body.price !== undefined;
  if (!hasQty && !hasPrice) {
    throw new AppError("quantity or price is required", 400);
  }

  return prisma.$transaction(async (tx) => {
    const sale = await tx.saleFromShop.findUnique({ where: { id } });
    if (!sale) throw new AppError("Sale not found", 404);

    const newQty = hasQty ? Math.floor(Number(body.quantity)) : sale.quantity;
    const newPrice = hasPrice ? Number(body.price) : sale.price;

    if (!Number.isInteger(newQty) || newQty < 1) {
      throw new AppError("quantity must be a positive integer", 400);
    }
    if (!Number.isFinite(newPrice) || newPrice < 0) {
      throw new AppError("price must be a non-negative number", 400);
    }

    const delta = newQty - sale.quantity;
    if (delta !== 0) {
      const inv = await tx.inventory.findUnique({
        where: {
          variantId_locationId: {
            variantId: sale.variantId,
            locationId: sale.locationId,
          },
        },
      });
      if (!inv) {
        throw new AppError("No inventory row for this variant at this location", 400);
      }
      if (delta > 0 && inv.quantity < delta) {
        throw new AppError(
          `Insufficient stock. Available: ${inv.quantity}, additional units needed: ${delta}`,
          400
        );
      }
      await tx.inventory.update({
        where: {
          variantId_locationId: {
            variantId: sale.variantId,
            locationId: sale.locationId,
          },
        },
        data: {
          quantity: delta > 0 ? { decrement: delta } : { increment: -delta },
        },
      });
    }

    return tx.saleFromShop.update({
      where: { id },
      data: {
        quantity: newQty,
        price: newPrice,
        total: newQty * newPrice,
      },
      include: saleFromShopInclude,
    });
  });
}

export async function deleteSaleFromShop(id: string) {
  await prisma.$transaction(async (tx) => {
    const sale = await tx.saleFromShop.findUnique({ where: { id } });
    if (!sale) throw new AppError("Sale not found", 404);

    const inv = await tx.inventory.findUnique({
      where: {
        variantId_locationId: {
          variantId: sale.variantId,
          locationId: sale.locationId,
        },
      },
    });
    if (!inv) {
      throw new AppError(
        "Cannot restore stock: no inventory row for this variant at this location",
        400
      );
    }

    await tx.inventory.update({
      where: {
        variantId_locationId: {
          variantId: sale.variantId,
          locationId: sale.locationId,
        },
      },
      data: { quantity: { increment: sale.quantity } },
    });
    await tx.saleFromShop.delete({ where: { id } });
  });
  return { message: "Sale deleted successfully" };
}

/** Stats use UTC calendar month boundaries for revenueThisMonth. */
export async function getSalesFromShopStats() {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = now.getUTCMonth();
  const startOfMonth = new Date(Date.UTC(y, m, 1, 0, 0, 0, 0));
  const startOfNextMonth = new Date(Date.UTC(y, m + 1, 1, 0, 0, 0, 0));

  const [totals, monthTotals, totalRecords] = await Promise.all([
    prisma.saleFromShop.aggregate({
      _sum: { total: true, quantity: true },
    }),
    prisma.saleFromShop.aggregate({
      where: {
        createdAt: {
          gte: startOfMonth,
          lt: startOfNextMonth,
        },
      },
      _sum: { total: true },
    }),
    prisma.saleFromShop.count(),
  ]);

  return {
    totalRecords,
    totalRevenue: totals._sum.total ?? 0,
    totalQuantity: totals._sum.quantity ?? 0,
    revenueThisMonth: monthTotals._sum.total ?? 0,
  };
}
