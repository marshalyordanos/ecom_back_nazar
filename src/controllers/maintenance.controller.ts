import { Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import * as maintenanceService from "../services/maintenance.service";
import type { AuthRequest } from "../middleware/auth.middleware";

export const getMaintenance = catchAsync(async (_req: AuthRequest, res: Response, _next: NextFunction) => {
  const config = await maintenanceService.getMaintenanceConfig();
  res.status(200).json({
    webMaintenance: config.webMaintenance,
    adminMaintenance: config.adminMaintenance,
    mobileMaintenance: config.mobileMaintenance,
  });
});

export const patchMaintenance = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const updated = await maintenanceService.upsertMaintenanceConfig(req.body ?? {});
  res.status(200).json({
    webMaintenance: updated.webMaintenance,
    adminMaintenance: updated.adminMaintenance,
    mobileMaintenance: updated.mobileMaintenance,
  });
});
