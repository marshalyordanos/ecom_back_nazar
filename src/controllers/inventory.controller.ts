import { Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import * as inventoryService from "../services/inventory.service";
import { parseListQuery } from "../utils/queryParser";
import type { AuthRequest } from "../middleware/auth.middleware";

function scopeFromReq(req: AuthRequest): inventoryService.InventoryScopeUser {
  return {
    isSuperAdmin: req.user!.isSuperAdmin,
    locationId: req.user!.locationId ?? null,
  };
}

export const listInventory = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const query = parseListQuery(req);
  const result = await inventoryService.listInventory(query, scopeFromReq(req));
  res.status(200).json(result);
});

export const getByVariantId = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const inventories = await inventoryService.getInventoryByVariantId(req.params.variantId, scopeFromReq(req));
  res.status(200).json(inventories);
});

export const updateInventory = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const { locationId } = req.body;
  if (!locationId) return res.status(400).json({ status: "fail", message: "locationId required" });
  const { quantity, reservedQuantity, reorderLevel } = req.body;
  const inventory = await inventoryService.updateInventoryQuantity(
    req.params.variantId,
    locationId,
    { quantity, reservedQuantity, reorderLevel },
    scopeFromReq(req)
  );
  res.status(200).json(inventory);
});

export const listMovements = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const query = parseListQuery(req);
  const result = await inventoryService.listMovements(query, scopeFromReq(req));
  res.status(200).json(result);
});

export const getInventoryById = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const inventory = await inventoryService.getInventoryById(req.params.id, scopeFromReq(req));
  res.status(200).json(inventory);
});

export const addMovement = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const { variantId, locationId, type, quantity, referenceId } = req.body;
  if (!variantId || !locationId || !type || quantity == null) {
    return res.status(400).json({ status: "fail", message: "variantId, locationId, type, quantity required" });
  }
  const movement = await inventoryService.addMovement(
    {
      variantId,
      locationId,
      type,
      quantity: Number(quantity),
      referenceId,
    },
    scopeFromReq(req)
  );
  res.status(201).json(movement);
});
