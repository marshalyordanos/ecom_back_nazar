import { Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import * as orderService from "../services/order.service";
import { parseListQuery } from "../utils/queryParser";
import type { AuthRequest } from "../middleware/auth.middleware";

export const listMyOrders = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const query = parseListQuery(req);
  const result = await orderService.listUserOrders(req.user!.id, query);
  res.status(200).json(result);
});

export const getOrderById = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const userId = req.user ? req.user.id : undefined;
  const order = await orderService.getOrderById(req.params.id, userId);
  res.status(200).json(order);
});

export const trackOrder = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const reference = String(req.query.reference || req.query.trackingNumber || req.query.orderNumber || "");
  const order = await orderService.trackOrderByReference(reference);
  res.status(200).json(order);
});

export const cancelOrder = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const order = await orderService.cancelOrder(req.params.id, req.user!.id);
  res.status(200).json(order);
});

export const completeOrder = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const order = await orderService.completeOrder(req.params.id);
  res.status(200).json(order);
});

export const listOrderItems = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const items = await orderService.listOrderItems(req.params.id);
  res.status(200).json(items);
});

export const listOrdersAdmin = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const query = parseListQuery(req);
  const shopId = req.query.shopId as string | undefined;
  const result = await orderService.listOrdersAdmin({ ...query, shopId });
  res.status(200).json(result);
});

export const getOrdersAdminSummary = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const query = parseListQuery(req);
  const shopId = req.query.shopId as string | undefined;
  const data = await orderService.getOrdersAdminSummary({ ...query, shopId });
  res.status(200).json({ data });
});

export const getOrderAdminById = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const order = await orderService.getOrderAdminById(req.params.id);
  res.status(200).json(order);
});

export const createOrderAdmin = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const order = await orderService.createOrderAdmin(req.body);
  res.status(201).json(order);
});

export const guestCheckout = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const result = await orderService.checkoutAsGuest(req.body);
  res.status(201).json(result);
});
