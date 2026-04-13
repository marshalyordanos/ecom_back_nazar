import { prisma } from "../lib/prisma";
import AppError from "../utils/appError";

export async function triggerProductSync(shopId: string) {
  const startedAt = new Date();
  const shop = await prisma.shop.findUnique({ where: { id: shopId } });
  if (!shop) throw new AppError("Shop not found", 404);

  const products = await prisma.product.findMany({
    where: { shopId },
    include: { variants: true },
  });

  let productsSynced = 0;
  try {
    for (const product of products) {
      const existing = await prisma.syncedProduct.findFirst({
        where: { productId: product.id },
      });
      if (existing) {
        await prisma.syncedProduct.update({
          where: { id: existing.id },
          data: { syncedAt: new Date() },
        });
      } else {
        await prisma.syncedProduct.create({
          data: {
            productId: product.id,
            externalProductId: product.id,
          },
        });
      }
      productsSynced++;
    }

    const log = await prisma.syncLog.create({
      data: {
        shopId,
        status: "SUCCESS",
        productsSynced,
        startedAt,
        finishedAt: new Date(),
      },
    });
    return log;
  } catch (err) {
    await prisma.syncLog.create({
      data: {
        shopId,
        status: "FAILED",
        productsSynced,
        startedAt,
        finishedAt: new Date(),
      },
    });
    throw err;
  }
}

export async function listSyncLogs(shopId: string | undefined, query: { page?: number; pageSize?: number }) {
  const where = shopId ? { shopId } : {};
  const page = query.page ?? 1;
  const pageSize = Math.min(query.pageSize ?? 20, 100);
  const skip = (page - 1) * pageSize;

  const [data, total] = await Promise.all([
    prisma.syncLog.findMany({
      where,
      orderBy: { startedAt: "desc" },
      skip,
      take: pageSize,
    }),
    prisma.syncLog.count({ where }),
  ]);
  return {
    data,
    pagination: { total, page, pageSize, totalPages: Math.ceil(total / pageSize) },
  };
}

export async function getSyncLogById(id: string) {
  const log = await prisma.syncLog.findUnique({
    where: { id },
  });
  if (!log) throw new AppError("Sync log not found", 404);
  return log;
}
