import { Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import * as settingsService from "../services/settings.service";
import type { AuthRequest } from "../middleware/auth.middleware";

export const getSettings = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string || (req as any).shopId;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const settings = await settingsService.getShopSettings(shopId);
  res.status(200).json(settings);
});

export const getSettingByKey = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string || (req as any).shopId;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const setting = await settingsService.getSettingByKey(shopId, req.params.key);
  res.status(200).json(setting);
});

export const setSetting = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.body.shopId || (req as any).shopId;
  const { key, value } = req.body;
  if (!shopId || !key) return res.status(400).json({ status: "fail", message: "shopId and key required" });
  const setting = await settingsService.setSetting(shopId, key, value ?? "");
  res.status(200).json(setting);
});

export const updateSetting = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.body.shopId || req.query.shopId as string || (req as any).shopId;
  const key = req.params.key;
  const { value } = req.body;
  if (!shopId || !key) return res.status(400).json({ status: "fail", message: "shopId and key required" });
  const setting = await settingsService.setSetting(shopId, key, value ?? "");
  res.status(200).json(setting);
});

export const deleteSetting = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string || (req as any).shopId;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const result = await settingsService.deleteSetting(shopId, req.params.key);
  res.status(200).json(result);
});
