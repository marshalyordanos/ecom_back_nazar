import { Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import * as cartService from "../services/cart.service";
import type { AuthRequest } from "../middleware/auth.middleware";

export const getCart = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const cart = await cartService.getOrCreateCart(req.user!.id);
  res.status(200).json(cart);
});

export const addToCart = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const { variantId, quantity, price } = req.body;
  if (!variantId || quantity == null || price == null) {
    return res.status(400).json({ status: "fail", message: "variantId, quantity, price required" });
  }
  const cart = await cartService.addItem(req.user!.id, variantId, Number(quantity), Number(price));
  res.status(200).json(cart);
});

export const updateCartItem = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const { quantity } = req.body;
  if (quantity == null) return res.status(400).json({ status: "fail", message: "quantity required" });
  const cart = await cartService.updateItemQuantity(req.user!.id, req.params.id, Number(quantity));
  res.status(200).json(cart);
});

export const removeCartItem = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const cart = await cartService.removeItem(req.user!.id, req.params.id);
  res.status(200).json(cart);
});

export const checkout = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  // const order = await cartService.checkout(req.user!.id, req.body);
  // res.status(201).json(order);
  const { order, checkout_url } = await cartService.checkout(req.user!.id, req.body);

res.status(201).json({ order, checkout_url });
});

export const handleChapaCallback = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const { data } = req.body;
  const payment = await cartService.handleChapaCallback(data);
  res.status(200).json(payment);
});