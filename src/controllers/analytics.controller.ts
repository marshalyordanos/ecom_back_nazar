import { Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import * as analyticsService from "../services/analytics.service";
import type { AuthRequest } from "../middleware/auth.middleware";

function parseDate(val: unknown): Date | undefined {
  if (!val) return undefined;
  const d = new Date(String(val));
  return isNaN(d.getTime()) ? undefined : d;
}

export const getProductViews = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const productId = req.query.productId as string | undefined;
  const startDate = parseDate(req.query.startDate);
  const endDate = parseDate(req.query.endDate);
  const limit = parseInt(String(req.query.limit), 10) || 100;
  const result = await analyticsService.getProductViews({
    productId,
    startDate,
    endDate,
    limit,
  });
  res.status(200).json(result);
});

export const getSearches = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const startDate = parseDate(req.query.startDate);
  const endDate = parseDate(req.query.endDate);
  const limit = parseInt(String(req.query.limit), 10) || 100;
  const result = await analyticsService.getSearchLogs({ startDate, endDate, limit });
  res.status(200).json(result);
});

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
  const page = parseInt(String(req.query.page), 10) || 1;
  const pageSize = parseInt(String(req.query.pageSize), 10) || 20;
  const result = await analyticsService.getOrdersReport({
    shopId,
    startDate,
    endDate,
    status,
    page,
    pageSize,
  });
  res.status(200).json(result);
});
