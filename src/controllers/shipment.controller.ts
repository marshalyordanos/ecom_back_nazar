import { Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import * as shipmentService from "../services/shipment.service";
import { parseListQuery } from "../utils/queryParser";
import type { AuthRequest } from "../middleware/auth.middleware";

export const listShipments = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const query = parseListQuery(req);
  const orderId = req.query.orderId as string | undefined;
  const result = await shipmentService.listShipments({ ...query, orderId });
  res.status(200).json(result);
});

export const getShipmentById = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shipment = await shipmentService.getShipmentById(req.params.id);
  res.status(200).json(shipment);
});

export const getTracking = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const tracking = await shipmentService.getTrackingInfo(req.params.id);
  res.status(200).json(tracking);
});

export const updateStatus = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shipment = await shipmentService.updateShipmentStatus(req.params.id, req.body);
  res.status(200).json(shipment);
});
