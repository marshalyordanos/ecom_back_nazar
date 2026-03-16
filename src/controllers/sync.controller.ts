import { Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import * as syncService from "../services/sync.service";
import { parseListQuery } from "../utils/queryParser";
import type { AuthRequest } from "../middleware/auth.middleware";

export const triggerSync = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.body.shopId || (req as any).shopId;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const log = await syncService.triggerProductSync(shopId);
  res.status(200).json(log);
});

export const listSyncLogs = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const query = parseListQuery(req);
  const shopId = req.query.shopId as string | undefined;
  const result = await syncService.listSyncLogs(shopId, query);
  res.status(200).json(result);
});

export const getSyncLogById = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const log = await syncService.getSyncLogById(req.params.id);
  res.status(200).json(log);
});
