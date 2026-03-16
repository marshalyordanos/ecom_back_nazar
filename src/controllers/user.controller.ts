import { Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import * as userService from "../services/user.service";
import { parseListQuery } from "../utils/queryParser";
import type { AuthRequest } from "../middleware/auth.middleware";

export const getMe = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const user = await userService.getMe(req.user!.id);
  res.status(200).json(user);
});

export const updateMe = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const user = await userService.updateMe(req.user!.id, req.body);
  res.status(200).json(user);
});

export const updateMyPassword = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const { newPassword } = req.body;
  if (!newPassword) {
    return res.status(400).json({ status: "fail", message: "newPassword required" });
  }
  const result = await userService.updatePassword(req.user!.id, newPassword);
  res.status(200).json(result);
});

export const getById = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const user = await userService.getById(req.params.id);
  res.status(200).json(user);
});

export const listUsers = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const query = parseListQuery(req);
  const result = await userService.listUsers(query);
  res.status(200).json(result);
});

export const updateUser = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const user = await userService.updateUser(req.params.id, req.body);
  res.status(200).json(user);
});

export const deactivateUser = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const result = await userService.deactivateUser(req.params.id);
  res.status(200).json(result);
});
