import { Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import * as reviewService from "../services/review.service";
import { parseListQuery } from "../utils/queryParser";
import type { AuthRequest } from "../middleware/auth.middleware";

export const listReviews = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const query = parseListQuery(req);
  const productId = req.query.productId as string | undefined;
  const result = await reviewService.listReviews({ ...query, productId });
  res.status(200).json(result);
});

export const listByProduct = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const query = parseListQuery(req);
  const result = await reviewService.listReviewsByProduct(req.params.id, query);
  res.status(200).json(result);
});

export const getReviewById = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const review = await reviewService.getReviewById(req.params.id);
  res.status(200).json(review);
});

export const createReview = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const { productId, rating, title, comment } = req.body;
  if (!productId || rating == null) {
    return res.status(400).json({ status: "fail", message: "productId and rating required" });
  }
  const review = await reviewService.createReview(req.user!.id, productId, { rating, title, comment });
  res.status(201).json(review);
});

export const updateReview = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const isAdmin = req.user!.roles.includes("admin");
  const review = await reviewService.updateReview(req.params.id, req.user!.id, req.body, isAdmin);
  res.status(200).json(review);
});

export const deleteReview = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const isAdmin = req.user!.roles.includes("admin");
  const result = await reviewService.deleteReview(req.params.id, req.user!.id, isAdmin);
  res.status(200).json(result);
});
