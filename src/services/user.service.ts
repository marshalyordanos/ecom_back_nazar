import { prisma } from "../lib/prisma";
import AppError from "../utils/appError";
import { hashPassword } from "../utils/hash";
import { PrismaQueryFeature } from "../utils/apiFeature";
import fs from "fs";
import { uploadToCloudinary } from "../config/cloudinary";
import { formatPhoneTo251 } from "../utils/helper";
const userSearchableFields = ["email", "firstName", "lastName", "phone"];
const userDateFields = [
  "createdAt",
  "updatedAt",
  "emailVerifiedAt",
  "phoneVerifiedAt",
];

export async function getMe(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      phone: true,
      firstName: true,
      lastName: true,
      avatarUrl: true,
      status: true,
      emailVerifiedAt: true,
      phoneVerifiedAt: true,
      roles: { select: { id: true, name: true, description: true } },
      locationId: true,
      location: { select: { id: true, name: true, shopId: true } },
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!user) throw new AppError("User not found", 404);
  return user;
}

export async function updateMe(
  userId: string,
  data: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    avatarUrl?: string;
  },
  file?: Express.Multer.File,
) {
  let resolvedAvatarUrl = data.avatarUrl;

  if (file?.path) {
    const fileBuffer = fs.readFileSync(file.path);
    const uploadResult = await uploadToCloudinary(
      fileBuffer,
      "ecommerce/users",
      "image",
    );
    fs.unlinkSync(file.path);
    resolvedAvatarUrl = uploadResult.secure_url || uploadResult.url;
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      ...(data.firstName !== undefined && { firstName: data.firstName }),
      ...(data.lastName !== undefined && { lastName: data.lastName }),
      ...(data.phone !== undefined && { phone: data.phone ? formatPhoneTo251(data.phone) : data.phone }),
      ...(resolvedAvatarUrl !== undefined && { avatarUrl: resolvedAvatarUrl }),
    },
    select: {
      id: true,
      email: true,
      phone: true,
      firstName: true,
      lastName: true,
      avatarUrl: true,
      status: true,
      roles: { select: { name: true } },
      createdAt: true,
      updatedAt: true,
    },
  });
  return user;
}

export async function updatePassword(userId: string, newPassword: string) {
  const passwordHash = await hashPassword(newPassword);
  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash },
  });
  return { message: "Password updated successfully" };
}

export async function getById(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    include: { roles: { select: { id: true, name: true } } },
  });
  if (!user) throw new AppError("User not found", 404);
  const { passwordHash, ...rest } = user;
  return rest;
}

export async function listUsers(
  query: {
    page?: number;
    pageSize?: number;
    search?: string;
    filter?: string;
    sort?: string;
    roleId?: string;
  },
  onlyUsers?: boolean,
) {
  const feature = new PrismaQueryFeature<
    Record<string, unknown>,
    Record<string, string>
  >({
    ...query,
    searchableFields: userSearchableFields,
    dateFields: userDateFields,
  });
  const { skip, take, where: rawWhere, orderBy } = feature.getQuery();

  const w = { ...rawWhere } as Record<string, unknown>;
  const roleIdFromFilter = w.roleId as string | undefined;
  delete w.roleId;
  const roleId = query.roleId || roleIdFromFilter;

  const parts: Record<string, unknown>[] = [];
  if (Object.keys(w).length > 0) parts.push(w);
  if (onlyUsers) parts.push({ roles: { some: { name: "user" } } });
  if (roleId) parts.push({ roles: { some: { id: roleId } } });

  const where =
    parts.length === 0 ? {} : parts.length === 1 ? parts[0]! : { AND: parts };

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      orderBy,
      skip,
      take,
      select: {
        id: true,
        email: true,
        phone: true,
        firstName: true,
        lastName: true,
        avatarUrl: true,
        status: true,
        locationId: true,
        location: { select: { id: true, name: true, shopId: true } },
        roles: { select: { id: true, name: true } },
        createdAt: true,
        updatedAt: true,
      },
    }),
    prisma.user.count({ where }),
  ]);

  return {
    data: users,
    pagination: feature.getPagination(total),
  };
}

export async function updateUser(
  id: string,
  data: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    status?: string;
    avatarUrl?: string;
    roleIds?: string[];
    locationId?: string | null;
  },
) {
  const existing = await prisma.user.findUnique({ where: { id } });
  if (!existing) throw new AppError("User not found", 404);

  const updateData: Record<string, unknown> = {
    ...(data.firstName !== undefined && { firstName: data.firstName }),
    ...(data.lastName !== undefined && { lastName: data.lastName }),
    ...(data.phone !== undefined && { phone: data.phone }),
    ...(data.status !== undefined && { status: data.status as any }),
    ...(data.avatarUrl !== undefined && { avatarUrl: data.avatarUrl }),
  };
  if (data.roleIds !== undefined) {
    updateData.roles = { set: data.roleIds.map((rid) => ({ id: rid })) };
  }
  if (data.locationId !== undefined) {
    if (data.locationId === null) {
      updateData.locationId = null;
    } else {
      const loc = await prisma.shopLocation.findUnique({
        where: { id: data.locationId },
      });
      if (!loc) throw new AppError("Location not found", 404);
      updateData.locationId = data.locationId;
    }
  }

  const user = await prisma.user.update({
    where: { id },
    data: updateData as Parameters<typeof prisma.user.update>[0]["data"],
    include: {
      roles: { select: { id: true, name: true } },
      location: { select: { id: true, name: true, shopId: true } },
    },
  });
  const { passwordHash, ...rest } = user;
  return rest;
}

export async function deactivateUser(id: string) {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new AppError("User not found", 404);
  await prisma.user.update({
    where: { id },
    data: { status: "INACTIVE" },
  });
  return { message: "User deactivated successfully" };
}

export async function getUserAnalytics(userId: string, shopId?: string) {
  const orderShopFilter = shopId ? { shopId } : {};
  const productShopFilter = shopId ? { product: { shopId } } : {};

  const [
    totalViews,
    recentlyViewedGrouped,
    mostViewedGrouped,
    orderAgg,
    lastOrder,
    firstOrder,
    totalItemsAgg,
    mostPurchasedGrouped,
    orderItemsForCategory,
  ] = await Promise.all([
    prisma.productView.count({ where: { userId } }),
    prisma.productView.groupBy({
      by: ["productId"],
      where: { userId, ...productShopFilter },
      _max: { createdAt: true },
      orderBy: { _max: { createdAt: "desc" } },
      take: 5,
    }),
    prisma.productView.groupBy({
      by: ["productId"],
      where: { userId, ...productShopFilter },
      _count: { id: true },
      orderBy: { _count: { id: "desc" } },
      take: 5,
    }),
    prisma.order.aggregate({
      where: { userId, ...orderShopFilter },
      _count: { id: true },
      _sum: { grandTotal: true },
      _avg: { grandTotal: true },
    }),
    prisma.order.findFirst({
      where: { userId, ...orderShopFilter },
      orderBy: { createdAt: "desc" },
      select: { createdAt: true },
    }),
    prisma.order.findFirst({
      where: { userId, ...orderShopFilter },
      orderBy: { createdAt: "asc" },
      select: { createdAt: true },
    }),
    prisma.orderItem.aggregate({
      where: { order: { userId, ...orderShopFilter } },
      _sum: { quantity: true },
    }),
    prisma.orderItem.groupBy({
      by: ["variantId"],
      where: { order: { userId, ...orderShopFilter } },
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: "desc" } },
      take: 5,
    }),
    prisma.orderItem.findMany({
      where: { order: { userId, ...orderShopFilter } },
      select: {
        quantity: true,
        variant: {
          select: {
            product: {
              select: { category: { select: { id: true, name: true } } },
            },
          },
        },
      },
      take: 200,
    }),
  ]);

  const recentProductIds = recentlyViewedGrouped.map((g) => g.productId);
  const mostViewedProductIds = mostViewedGrouped.map((g) => g.productId);
  const mostPurchasedVariantIds = mostPurchasedGrouped.map((g) => g.variantId);

  const productInclude = {
    brand: { select: { id: true, name: true, slug: true } },
    category: { select: { id: true, name: true, slug: true } },
    variants: { take: 1 as const, include: { media: { take: 1 as const } } },
  };

  const [recentProducts, mostViewedProducts, mostPurchasedVariants] = await Promise.all([
    recentProductIds.length
      ? prisma.product.findMany({
          where: { id: { in: recentProductIds }, ...(shopId ? { shopId } : {}) },
          include: productInclude,
        })
      : ([] as any[]),
    mostViewedProductIds.length
      ? prisma.product.findMany({
          where: { id: { in: mostViewedProductIds }, ...(shopId ? { shopId } : {}) },
          include: productInclude,
        })
      : ([] as any[]),
    mostPurchasedVariantIds.length
      ? prisma.productVariant.findMany({
          where: { id: { in: mostPurchasedVariantIds } },
          include: {
            product: {
              select: {
                id: true,
                name: true,
                slug: true,
                category: { select: { id: true, name: true } },
              },
            },
            media: { take: 1 },
          },
        })
      : ([] as any[]),
  ]);

  const recentProductById = new Map(recentProducts.map((p: any) => [p.id, p]));
  const recentlyViewed = recentProductIds.map((id) => recentProductById.get(id)).filter(Boolean);

  const mostViewedProductById = new Map(mostViewedProducts.map((p: any) => [p.id, p]));
  const mostViewed = mostViewedProductIds.map((id) => mostViewedProductById.get(id)).filter(Boolean);

  const mostPurchasedVariantById = new Map(mostPurchasedVariants.map((v: any) => [v.id, v]));
  const mostPurchasedProducts = mostPurchasedGrouped
    .map((g) => ({
      variant: mostPurchasedVariantById.get(g.variantId),
      totalQuantity: g._sum.quantity ?? 0,
    }))
    .filter((x) => x.variant != null);

  // Aggregate category purchase counts in memory
  const categoryCount = new Map<string, { name: string; count: number }>();
  for (const item of orderItemsForCategory) {
    const cat = item.variant?.product?.category;
    if (!cat) continue;
    const existing = categoryCount.get(cat.id);
    if (existing) {
      existing.count += item.quantity;
    } else {
      categoryCount.set(cat.id, { name: cat.name, count: item.quantity });
    }
  }
  let frequentCategory: string | null = null;
  let maxCatCount = 0;
  for (const entry of categoryCount.values()) {
    if (entry.count > maxCatCount) {
      maxCatCount = entry.count;
      frequentCategory = entry.name;
    }
  }

  const totalOrders = orderAgg._count.id;
  const totalSpent = orderAgg._sum.grandTotal ?? 0;
  const averageOrderValue = orderAgg._avg.grandTotal ?? 0;
  const totalItemsPurchased = totalItemsAgg._sum.quantity ?? 0;
  const lastOrderDate = lastOrder?.createdAt ?? null;

  let orderFrequency: string;
  if (totalOrders === 0) {
    orderFrequency = "No orders yet";
  } else if (totalOrders === 1) {
    orderFrequency = "1 order total";
  } else {
    const first = firstOrder!.createdAt;
    const last = lastOrder!.createdAt;
    const monthsDiff = Math.max(
      1,
      (last.getFullYear() - first.getFullYear()) * 12 + (last.getMonth() - first.getMonth())
    );
    const rate = totalOrders / monthsDiff;
    if (rate >= 1) {
      const rounded = Math.round(rate);
      orderFrequency = `${rounded} order${rounded !== 1 ? "s" : ""}/month`;
    } else {
      const every = Math.round(1 / rate);
      orderFrequency = `1 order every ${every} month${every !== 1 ? "s" : ""}`;
    }
  }

  return {
    productAnalytics: {
      totalViews,
      recentlyViewed,
      mostViewed,
    },
    orderAnalytics: {
      totalOrders,
      totalSpent,
      averageOrderValue,
      totalItemsPurchased,
      lastOrderDate,
    },
    insights: {
      mostPurchasedProducts,
      frequentCategory,
      orderFrequency,
      isRepeatBuyer: totalOrders > 1,
    },
  };
}
