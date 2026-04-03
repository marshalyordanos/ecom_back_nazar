import { Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import * as shopService from "../services/shop.service";
import { parseListQuery } from "../utils/queryParser";
import type { AuthRequest } from "../middleware/auth.middleware";

export const listShops = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const query = parseListQuery(req);
  const result = await shopService.listShops(query);
  res.status(200).json(result);
});

export const getShopById = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shop = await shopService.getShopById(req.params.id);
  res.status(200).json(shop);
});

export const updateShop = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shop = await shopService.updateShop(req.params.id, req.body, req.file);
  res.status(200).json(shop);
});

// Controller for createOrUpdateShop
export const createOrUpdateShop = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  // createOrUpdateShop expects all data (req.body) and a file (req.file), if available
  const shop = await shopService.createOrUpdateShop(req.body, req.file);
  res.status(200).json(shop);
});

export const listShopLocations = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const locations = await shopService.listShopLocations(req.params.id);
  res.status(200).json(locations);
});

export const addShopLocation = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const location = await shopService.addShopLocation(req.params.id, req.body);
  res.status(201).json(location);
});

export const updateLocation = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const location = await shopService.updateLocation(req.params.locationId, req.body);
  res.status(200).json(location);
});

export const deleteLocation = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const result = await shopService.deleteLocation(req.params.locationId);
  res.status(200).json(result);
});


export const addSalesFromShop = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const result = await shopService.addSalesFromShop(req.body);
  res.status(201).json(result);
});