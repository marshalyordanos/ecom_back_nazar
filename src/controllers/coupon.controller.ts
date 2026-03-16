import { Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import * as couponService from "../services/coupon.service";
import { parseListQuery } from "../utils/queryParser";
import type { AuthRequest } from "../middleware/auth.middleware";

export const listCoupons = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const query = parseListQuery(req);
  const result = await couponService.listCoupons(query);
  res.status(200).json(result);
});

export const getCouponById = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const coupon = await couponService.getCouponById(req.params.id);
  res.status(200).json(coupon);
});

export const createCoupon = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const coupon = await couponService.createCoupon(req.body);
  res.status(201).json(coupon);
});

export const updateCoupon = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const coupon = await couponService.updateCoupon(req.params.id, req.body);
  res.status(200).json(coupon);
});

export const deleteCoupon = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const result = await couponService.deleteCoupon(req.params.id);
  res.status(200).json(result);
});

export const useCoupon = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const couponId = req.params.id || req.body.couponId;
  const orderId = req.body.orderId;
  if (!orderId || !couponId) {
    return res.status(400).json({ status: "fail", message: "orderId and couponId (or use :id) required" });
  }
  const order = await couponService.applyCouponToOrder(orderId, couponId, req.user!.id);
  return res.status(200).json(order);
});
