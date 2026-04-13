<<<<<<< HEAD
import { prisma } from "../lib/prisma";
import AppError from "../utils/appError";
import { PrismaQueryFeature } from "../utils/apiFeature";

const searchableFields = ["title", "comment"];
const dateFields = ["createdAt"];

export async function listReviewsByProduct(
  productId: string,
  query: { page?: number; pageSize?: number; sort?: string; search?: string; filter?: string }
) {
  const feature = new PrismaQueryFeature<Record<string, unknown>, Record<string, string>>({
    ...query,
    searchableFields: [],
    dateFields,
  });
  const { skip, take, where, orderBy } = feature.getQuery();
  const whereProduct = { ...where, productId };

  const [data, total] = await Promise.all([
    prisma.review.findMany({
      where: whereProduct,
      orderBy,
      skip,
      take,
      include: { user: { select: { id: true, firstName: true, lastName: true } } },
    }),
    prisma.review.count({ where: whereProduct }),
  ]);
  return { data, pagination: feature.getPagination(total) };
}


export async function listReviews(query: {
  page?: number;
  pageSize?: number;
  search?: string;
  filter?: string;
  sort?: string;
  productId?: string;
}) {
  const feature = new PrismaQueryFeature<Record<string, unknown>, Record<string, string>>({
    ...query,
    searchableFields,
    dateFields,
  });
  const { skip, take, where, orderBy } = feature.getQuery();
  const whereQuery = query.productId ? { ...where, productId: query.productId } : where;

  const [data, total] = await Promise.all([
    prisma.review.findMany({
      where: whereQuery,
      orderBy,
      skip,
      take,
      include: {
        user: { select: { id: true, firstName: true, lastName: true, email: true } },
        product: { select: { id: true, name: true, slug: true } },
      },
    }),
    prisma.review.count({ where: whereQuery }),
  ]);
  return { data, pagination: feature.getPagination(total) };
}


export async function getReviewById(id: string) {
  const review = await prisma.review.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, firstName: true, lastName: true, email: true } },
      product: { select: { id: true, name: true, slug: true } },
    },
  });
  if (!review) throw new AppError("Review not found", 404);
  return review;
}

export async function createReview(
  userId: string,
  productId: string,
  data: { rating: number; title?: string; comment?: string }
) {
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw new AppError("Product not found", 404);
  const review = await prisma.review.create({
    data: {
      productId,
      userId,
      rating: data.rating,
      title: data.title,
      comment: data.comment,
      status: "PENDING",
    },
  });
  return review;
}

export async function updateReview(id: string, userId: string, data: { rating?: number; title?: string; comment?: string }, isAdmin = false) {
  const review = await prisma.review.findUnique({ where: { id } });
  if (!review) throw new AppError("Review not found", 404);
  if (!isAdmin && review.userId !== userId) throw new AppError("You can only edit your own review", 403);
  const updated = await prisma.review.update({
    where: { id },
    data: data as Parameters<typeof prisma.review.update>[0]["data"],
  });
  return updated;
}

export async function deleteReview(id: string, userId: string, isAdmin: boolean) {
  const review = await prisma.review.findUnique({ where: { id } });
  if (!review) throw new AppError("Review not found", 404);
  if (!isAdmin && review.userId !== userId) throw new AppError("Forbidden", 403);
  await prisma.review.delete({ where: { id } });
  return { message: "Review deleted successfully" };
}
=======
import { prisma } from "../lib/prisma";
import AppError from "../utils/appError";
import { PrismaQueryFeature } from "../utils/apiFeature";

const searchableFields = ["title", "comment"];
const dateFields = ["createdAt"];

export async function listReviewsByProduct(
  productId: string,
  query: { page?: number; pageSize?: number; sort?: string; search?: string; filter?: string }
) {
  const feature = new PrismaQueryFeature<Record<string, unknown>, Record<string, string>>({
    ...query,
    searchableFields: [],
    dateFields,
  });
  const { skip, take, where, orderBy } = feature.getQuery();
  const whereProduct = { ...where, productId };

  const [data, total] = await Promise.all([
    prisma.review.findMany({
      where: whereProduct,
      orderBy,
      skip,
      take,
      include: { user: { select: { id: true, firstName: true, lastName: true } } },
    }),
    prisma.review.count({ where: whereProduct }),
  ]);
  return { data, pagination: feature.getPagination(total) };
}


export async function listReviews(query: {
  page?: number;
  pageSize?: number;
  search?: string;
  filter?: string;
  sort?: string;
  productId?: string;
}) {
  const feature = new PrismaQueryFeature<Record<string, unknown>, Record<string, string>>({
    ...query,
    searchableFields,
    dateFields,
  });
  const { skip, take, where, orderBy } = feature.getQuery();
  const whereQuery = query.productId ? { ...where, productId: query.productId } : where;

  const [data, total] = await Promise.all([
    prisma.review.findMany({
      where: whereQuery,
      orderBy,
      skip,
      take,
      include: {
        user: { select: { id: true, firstName: true, lastName: true, email: true } },
        product: { select: { id: true, name: true, slug: true } },
      },
    }),
    prisma.review.count({ where: whereQuery }),
  ]);
  return { data, pagination: feature.getPagination(total) };
}


export async function getReviewById(id: string) {
  const review = await prisma.review.findUnique({
    where: { id },
    include: {
      user: { select: { id: true, firstName: true, lastName: true, email: true } },
      product: { select: { id: true, name: true, slug: true } },
    },
  });
  if (!review) throw new AppError("Review not found", 404);
  return review;
}

export async function createReview(
  userId: string,
  productId: string,
  data: { rating: number; title?: string; comment?: string }
) {
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) throw new AppError("Product not found", 404);
  const review = await prisma.review.create({
    data: {
      productId,
      userId,
      rating: data.rating,
      title: data.title,
      comment: data.comment,
      status: "PENDING",
    },
  });
  return review;
}

export async function updateReview(id: string, userId: string, data: { rating?: number; title?: string; comment?: string }, isAdmin = false) {
  const review = await prisma.review.findUnique({ where: { id } });
  if (!review) throw new AppError("Review not found", 404);
  if (!isAdmin && review.userId !== userId) throw new AppError("You can only edit your own review", 403);
  const incoming: any = data || {};

  if (incoming.status != null) {
    if (!isAdmin) throw new AppError("Forbidden", 403);
    const allowed = new Set(["PENDING", "APPROVED", "REJECTED"]);
    if (!allowed.has(String(incoming.status))) {
      throw new AppError("Invalid review status", 400);
    }
  }

  const updated = await prisma.review.update({
    where: { id },
    data: incoming as Parameters<typeof prisma.review.update>[0]["data"],
  });
  return updated;
}

export async function deleteReview(id: string, userId: string, isAdmin: boolean) {
  const review = await prisma.review.findUnique({ where: { id } });
  if (!review) throw new AppError("Review not found", 404);
  if (!isAdmin && review.userId !== userId) throw new AppError("Forbidden", 403);
  await prisma.review.delete({ where: { id } });
  return { message: "Review deleted successfully" };
}
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
