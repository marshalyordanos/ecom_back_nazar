import { Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import * as inventoryService from "../services/inventory.service";
import { parseListQuery } from "../utils/queryParser";
import type { AuthRequest } from "../middleware/auth.middleware";

export const listInventory = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const query = parseListQuery(req);
  const result = await inventoryService.listInventory(query);
  res.status(200).json(result);
});

export const getByVariantId = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const inventories = await inventoryService.getInventoryByVariantId(req.params.variantId);
  res.status(200).json(inventories);
});

export const updateInventory = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const { locationId } = req.body;
  if (!locationId) return res.status(400).json({ status: "fail", message: "locationId required" });
  const inventory = await inventoryService.updateInventoryQuantity(
    req.params.variantId,
    locationId,
    req.body
  );
  res.status(200).json(inventory);
});

export const listMovements = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const query = parseListQuery(req);
  const result = await inventoryService.listMovements(query);
  res.status(200).json(result);
});

export const addMovement = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const { variantId, locationId, type, quantity, referenceId } = req.body;
  if (!variantId || !locationId || !type || quantity == null) {
    return res.status(400).json({ status: "fail", message: "variantId, locationId, type, quantity required" });
  }
  const movement = await inventoryService.addMovement({
    variantId,
    locationId,
    type,
    quantity: Number(quantity),
    referenceId,
  });
  res.status(201).json(movement);
});
