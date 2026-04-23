import { Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import * as categoryService from "../services/category.service";
import { parseListQuery } from "../utils/queryParser";
import type { AuthRequest } from "../middleware/auth.middleware";

export const listCategories = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const query = parseListQuery(req);
  const tree = req.query.tree === "true";
  if (tree) {
    const data = await categoryService.listCategoriesTree();
    return res.status(200).json(data);
  }
  const result = await categoryService.listCategories(query);
  res.status(200).json(result);
});

export const getCategoryById = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const category = await categoryService.getCategoryById(req.params.id);
  res.status(200).json(category);
});

export const createCategory = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const category = await categoryService.createCategory(req.body,req.file);
  res.status(201).json(category);
});

export const updateCategory = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const category = await categoryService.updateCategory(req.params.id, req.body,req.file);
  res.status(200).json(category);
});

export const deleteCategory = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const result = await categoryService.deleteCategory(req.params.id);
  res.status(200).json(result);
});
