import { Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import * as userService from "../services/user.service";
import { parseListQuery } from "../utils/queryParser";
import type { AuthRequest } from "../middleware/auth.middleware";
import * as notificationService from "../services/notification.service";
import * as savedAddressService from "../services/savedAddress.service";

export const getMe = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const user = await userService.getMe(req.user!.id);
  res.status(200).json(user);
});

export const updateMe = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const user = await userService.updateMe(req.user!.id, req.body, req.file);
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
  const roleId = typeof req.query.roleId === "string" ? req.query.roleId : undefined;
  const result = await userService.listUsers({ ...query, roleId }, Boolean(req.query.onlyUsers));
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

// ===============================
// CUSTOMER NOTIFICATIONS
// ===============================

export const listMyNotifications = catchAsync(
  async (req: AuthRequest, res: Response, _next: NextFunction) => {
    const page = req.query.page ? Number(req.query.page) : undefined;
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : undefined;
    const data = await notificationService.listMyNotifications(req.user!.id, {
      page,
      pageSize,
    });
    res.status(200).json(data);
  }
);

export const markMyNotificationRead = catchAsync(
  async (req: AuthRequest, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    const data = await notificationService.markMyNotificationRead(req.user!.id, id);
    res.status(200).json(data);
  }
);

export const markAllMyNotificationsRead = catchAsync(
  async (req: AuthRequest, res: Response, _next: NextFunction) => {
    const data = await notificationService.markAllMyNotificationsRead(req.user!.id);
    res.status(200).json(data);
  }
);

export const getMyUnreadNotificationsCount = catchAsync(
  async (req: AuthRequest, res: Response, _next: NextFunction) => {
    const count = await notificationService.getUnreadCount(req.user!.id);
    res.status(200).json({ unreadCount: count });
  }
);

// ===============================
// SAVED ADDRESSES (PER USER)
// ===============================

export const listMySavedAddresses = catchAsync(
  async (req: AuthRequest, res: Response, _next: NextFunction) => {
    const data = await savedAddressService.listMySavedAddresses(req.user!.id);
    res.status(200).json({ data });
  }
);

export const addMySavedAddress = catchAsync(
  async (req: AuthRequest, res: Response, _next: NextFunction) => {
    const data = await savedAddressService.addMySavedAddress(req.user!.id, req.body);
    res.status(201).json({ data });
  }
);

export const deleteMySavedAddress = catchAsync(
  async (req: AuthRequest, res: Response, _next: NextFunction) => {
    const { id } = req.params;
    const data = await savedAddressService.deleteMySavedAddress(req.user!.id, id);
    res.status(200).json(data);
  }
);
