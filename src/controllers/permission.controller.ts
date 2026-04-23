import { Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import * as permissionService from "../services/permission.service";
import { parseListQuery } from "../utils/queryParser";
import type { AuthRequest } from "../middleware/auth.middleware";

export const listPermissions = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const query = parseListQuery(req);
  const result = await permissionService.listPermissions(query);
  res.status(200).json(result);
});

export const getPermissionById = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const permission = await permissionService.getPermissionById(req.params.id);
  res.status(200).json(permission);
});

export const createPermission = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const permission = await permissionService.createPermission(req.body);
  res.status(201).json(permission);
});

export const updatePermission = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const permission = await permissionService.updatePermission(req.params.id, req.body);
  res.status(200).json(permission);
});

export const deletePermission = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const result = await permissionService.deletePermission(req.params.id);
  res.status(200).json(result);
});
