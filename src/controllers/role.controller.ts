<<<<<<< HEAD
import { Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import * as roleService from "../services/role.service";
import { parseListQuery } from "../utils/queryParser";
import type { AuthRequest } from "../middleware/auth.middleware";

export const listRoles = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const query = parseListQuery(req);
  const result = await roleService.listRoles(query);
  res.status(200).json(result);
});

export const getRoleById = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const role = await roleService.getRoleById(req.params.id);
  res.status(200).json(role);
});

export const createRole = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const role = await roleService.createRole(req.body);
  res.status(201).json(role);
});

export const updateRole = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const role = await roleService.updateRole(req.params.id, req.body);
  res.status(200).json(role);
});

export const deleteRole = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const result = await roleService.deleteRole(req.params.id);
  res.status(200).json(result);
});

export const assignPermissions = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const { permissions } = req.body; // [{ permissionId, createAction, readAction, updateAction, deleteAction }]
  const role = await roleService.assignPermissionsToRole(req.params.id, permissions || []);
  res.status(200).json(role);
});

export const removePermissions = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const { permissionIds } = req.body;
  const role = await roleService.removePermissionsFromRole(req.params.id, permissionIds || []);
  res.status(200).json(role);
});
=======
import { Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import * as roleService from "../services/role.service";
import { parseListQuery } from "../utils/queryParser";
import type { AuthRequest } from "../middleware/auth.middleware";

export const listRoles = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const query = parseListQuery(req);
  const result = await roleService.listRoles(query);
  res.status(200).json(result);
});

export const getRoleById = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const role = await roleService.getRoleById(req.params.id);
  res.status(200).json(role);
});

export const createRole = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const role = await roleService.createRole(req.body);
  res.status(201).json(role);
});

export const updateRole = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const role = await roleService.updateRole(req.params.id, req.body);
  res.status(200).json(role);
});

export const deleteRole = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const result = await roleService.deleteRole(req.params.id);
  res.status(200).json(result);
});

export const assignPermissions = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const { permissions } = req.body; // [{ permissionId, createAction, readAction, updateAction, deleteAction }]
  const role = await roleService.assignPermissionsToRole(req.params.id, permissions || []);
  res.status(200).json(role);
});

export const removePermissions = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const { permissionIds } = req.body;
  const role = await roleService.removePermissionsFromRole(req.params.id, permissionIds || []);
  res.status(200).json(role);
});

export const assignRoleToUser = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const { userId } = req.body;
  const role = await roleService.assignRoleToUser(req.params.id, userId);
  res.status(200).json(role);
});
>>>>>>> 6665a0efb0b38eb357a170710810a911002e7351
