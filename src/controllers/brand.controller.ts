import { Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import * as brandService from "../services/brand.service";
import { parseListQuery } from "../utils/queryParser";
import type { AuthRequest } from "../middleware/auth.middleware";

export const listBrands = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const query = parseListQuery(req);
  const result = await brandService.listBrands(query);
  res.status(200).json(result);
});

export const getBrandById = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const brand = await brandService.getBrandById(req.params.id);
  res.status(200).json(brand);
});

export const createBrand = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  
  console.log("brand file", req.files,req.file)
  const brand = await brandService.createBrand(req.body,req.file);
  res.status(201).json(brand);
});

export const updateBrand = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const brand = await brandService.updateBrand(req.params.id, req.body,req.file);
  res.status(200).json(brand);
});

export const deleteBrand = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const result = await brandService.deleteBrand(req.params.id);
  res.status(200).json(result);
});
