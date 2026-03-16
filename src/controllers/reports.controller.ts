import { Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import * as analyticsService from "../services/analytics.service";
import * as dashboardService from "../services/dashboard.service";
import * as syncService from "../services/sync.service";
import { prisma } from "../lib/prisma";
import { parseListQuery } from "../utils/queryParser";
import { PrismaQueryFeature } from "../utils/apiFeature";
import type { AuthRequest } from "../middleware/auth.middleware";

function parseDate(val: unknown): Date | undefined {
  if (!val) return undefined;
  const d = new Date(String(val));
  return isNaN(d.getTime()) ? undefined : d;
}

export const getSalesReport = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string | undefined;
  const startDate = parseDate(req.query.startDate);
  const endDate = parseDate(req.query.endDate);
  const status = req.query.status as string | undefined;
  const result = await analyticsService.getSalesReport({ shopId, startDate, endDate, status });
  res.status(200).json(result);
});

export const getOrdersReport = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string | undefined;
  const startDate = parseDate(req.query.startDate);
  const endDate = parseDate(req.query.endDate);
  const status = req.query.status as string | undefined;
  const query = parseListQuery(req);
  const result = await analyticsService.getOrdersReport({
    shopId,
    startDate,
    endDate,
    status,
    page: query.page,
    pageSize: query.pageSize,
  });
  res.status(200).json(result);
});

export const getOrdersByStatus = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getOrdersSummary(shopId);
  res.status(200).json(data);
});

export const getInventoryReport = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getLowInventory(shopId);
  res.status(200).json(data);
});

export const getSyncReport = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const query = parseListQuery(req);
  const shopId = req.query.shopId as string | undefined;
  const result = await syncService.listSyncLogs(shopId, query);
  res.status(200).json(result);
});

export const getSyncReportById = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const log = await syncService.getSyncLogById(req.params.id);
  res.status(200).json(log);
});

export const getTopProductsReport = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  const limit = Math.min(parseInt(String(req.query.limit), 10) || 10, 100);
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getTopProducts(shopId, limit);
  res.status(200).json(data);
});

export const getProductViewsReport = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const productId = req.query.productId as string | undefined;
  const startDate = parseDate(req.query.startDate);
  const endDate = parseDate(req.query.endDate);
  const result = await analyticsService.getProductViews({
    productId,
    startDate,
    endDate,
    limit: 500,
  });
  res.status(200).json(result);
});

export const getCouponsReport = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const query = parseListQuery(req);
  const feature = new PrismaQueryFeature<Record<string, unknown>, Record<string, string>>({
    ...query,
    searchableFields: ["code"],
    dateFields: ["createdAt", "expiresAt"],
  });
  const { skip, take, where, orderBy } = feature.getQuery();
  const [data, total] = await Promise.all([
    prisma.coupon.findMany({
      where,
      orderBy,
      skip,
      take,
      include: { _count: { select: { usages: true } } },
    }),
    prisma.coupon.count({ where }),
  ]);
  res.status(200).json({
    data,
    pagination: feature.getPagination(total),
  });
});
