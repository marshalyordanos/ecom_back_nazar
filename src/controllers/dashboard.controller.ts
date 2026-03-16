import { Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import * as dashboardService from "../services/dashboard.service";
import type { AuthRequest } from "../middleware/auth.middleware";

export const getOverview = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string || (req as any).shopId;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getOverview(shopId);
  res.status(200).json(data);
});

export const getSalesSummary = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  const groupBy = (req.query.groupBy as "day" | "week" | "month") || "day";
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getSalesSummary(shopId, groupBy);
  res.status(200).json(data);
});

export const getOrdersSummary = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getOrdersSummary(shopId);
  res.status(200).json(data);
});

export const getTopProducts = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  const limit = Math.min(parseInt(String(req.query.limit), 10) || 10, 50);
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getTopProducts(shopId, limit);
  res.status(200).json(data);
});

export const getLowInventory = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getLowInventory(shopId);
  res.status(200).json(data);
});

export const getNewCustomers = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  const days = parseInt(String(req.query.days), 10) || 30;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const count = await dashboardService.getNewCustomers(shopId, days);
  res.status(200).json({ count });
});

export const getRecentOrders = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string;
  const limit = Math.min(parseInt(String(req.query.limit), 10) || 10, 50);
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const data = await dashboardService.getRecentOrders(shopId, limit);
  res.status(200).json(data);
});

export const getRecentActivities = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string || (req as any).shopId;
  const limit = Math.min(parseInt(String(req.query.limit), 10) || 20, 100);
  const data = await dashboardService.getRecentActivities(shopId || "", limit);
  res.status(200).json(data);
});
