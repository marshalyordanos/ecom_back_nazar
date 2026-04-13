import { prisma } from "../lib/prisma";
import AppError from "../utils/appError";

const productInclude = {
  brand: { select: { id: true, name: true, slug: true } },
  category: { select: { id: true, name: true, slug: true } },
  variants: {
    take: 3,
    include: { media: { take: 1 } },
  },
} as const;

export async function listFavoriteIds(userId: string, shopId?: string) {
  const where: { userId: string; product: { shopId?: string; status: "ACTIVE" } } = {
    userId,
    product: { status: "ACTIVE", ...(shopId ? { shopId } : {}) },
  };
  const rows = await prisma.favorite.findMany({
    where,
    select: { productId: true },
  });
  return { productIds: rows.map((r) => r.productId) };
}

export async function listFavorites(
  userId: string,
  shopId: string | undefined,
  page: number,
  pageSize: number
) {
  const where: { userId: string; product: { shopId?: string; status: "ACTIVE" } } = {
    userId,
    product: { status: "ACTIVE", ...(shopId ? { shopId } : {}) },
  };

  const [rows, total] = await Promise.all([
    prisma.favorite.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
      include: {
        product: { include: productInclude },
      },
    }),
    prisma.favorite.count({ where }),
  ]);

  const products = rows.map((r) => r.product).filter(Boolean);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return {
    data: products,
    pagination: { page, pageSize, total, totalPages },
  };
}

export async function addFavorite(userId: string, productId: string) {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { id: true, status: true },
  });
  if (!product) throw new AppError("Product not found", 404);
  if (product.status !== "ACTIVE") throw new AppError("Product is not available", 400);

  await prisma.favorite.upsert({
    where: { userId_productId: { userId, productId } },
    create: { userId, productId },
    update: {},
  });

  return { ok: true, productId };
}

export async function removeFavorite(userId: string, productId: string) {
  await prisma.favorite.deleteMany({
    where: { userId, productId },
  });
  return { ok: true, productId };
}
