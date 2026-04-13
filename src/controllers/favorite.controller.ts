import { Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import * as favoriteService from "../services/favorite.service";
import { parseListQuery } from "../utils/queryParser";
import type { AuthRequest } from "../middleware/auth.middleware";

export const listFavoriteIds = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string | undefined;
  const result = await favoriteService.listFavoriteIds(req.user!.id, shopId);
  res.status(200).json(result);
});

export const listFavorites = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const query = parseListQuery(req);
  const shopId = req.query.shopId as string | undefined;
  const result = await favoriteService.listFavorites(req.user!.id, shopId, query.page, query.pageSize);
  res.status(200).json(result);
});

export const addFavorite = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const result = await favoriteService.addFavorite(req.user!.id, req.params.productId);
  res.status(201).json(result);
});

export const removeFavorite = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const result = await favoriteService.removeFavorite(req.user!.id, req.params.productId);
  res.status(200).json(result);
});
