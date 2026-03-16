import { Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import * as paymentService from "../services/payment.service";
import { parseListQuery } from "../utils/queryParser";
import type { AuthRequest } from "../middleware/auth.middleware";

export const listPayments = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const query = parseListQuery(req);
  const orderId = req.query.orderId as string | undefined;
  const result = await paymentService.listPayments({ ...query, orderId });
  res.status(200).json(result);
});

export const getPaymentById = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const payment = await paymentService.getPaymentById(req.params.id);
  res.status(200).json(payment);
});

export const capturePayment = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const payment = await paymentService.capturePayment(req.params.id);
  res.status(200).json(payment);
});

export const refundPayment = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const payment = await paymentService.refundPayment(req.params.id);
  res.status(200).json(payment);
});
