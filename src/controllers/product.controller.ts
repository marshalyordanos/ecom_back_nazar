import { Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import * as productService from "../services/product.service";
import { parseListQuery } from "../utils/queryParser";
import type { AuthRequest } from "../middleware/auth.middleware";

export const listProducts = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const query = parseListQuery(req);
  const shopId = req.query.shopId as string | undefined;
  const track = req.query.track as string | undefined;
  const result = await productService.listProducts(shopId, track, query,req as any);
  res.status(200).json(result);
});

export const getProductById = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string | undefined;
  const product = await productService.getProductById(req.params.id, shopId);
  res.status(200).json(product);
});

export const getProductByIdMobile = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string | undefined;
  const userId = req.body?.userId as string | undefined;
  const sessionId = req.body?.sessionId as string | undefined;
  const product = await productService.getProductByIdMobile(req.params.id, shopId,userId,sessionId);
  res.status(200).json(product);
});



export const createProduct = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = (req as any).shopId || req.body.shopId;
  if (!shopId) return res.status(400).json({ status: "fail", message: "shopId required" });
  const product = await productService.createProduct(shopId, req.body);
  res.status(201).json(product);
});

export const updateProduct = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = (req as any).shopId || req.body.shopId;
  const product = await productService.updateProduct(req.params.id, shopId || "", req.body);
  res.status(200).json(product);
});

export const deleteProduct = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = (req as any).shopId;
  await productService.deleteProduct(req.params.id, shopId);
  res.status(200).json({ message: "Product deleted successfully" });
});

export const getFeatured = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const shopId = req.query.shopId as string | undefined;
  const limit = Math.min(parseInt(String(req.query.limit), 10) || 10, 50);
  const products = await productService.getFeaturedProducts(shopId, limit);
  res.status(200).json(products);
});

export const getVariantById = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const variant = await productService.getVariantById(req.params.id);
  res.status(200).json(variant);
});

export const createVariant = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const variant = await productService.createVariant(req.params.id, req.body, req.file);
  res.status(201).json(variant);
});

export const updateVariant = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const variantId = req.params.variantId || req.params.id;
  const variant = await productService.updateVariant(variantId, req.body, req.file);
  res.status(200).json(variant);
});

export const deleteVariant = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const variantId = req.params.variantId || req.params.id;
  await productService.deleteVariant(variantId);
  res.status(200).json({ message: "Variant deleted successfully" });
});

export const addVariantMedia = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const { url, type, position } = req.body;
  const variantId = req.params.variantId || req.params.id;
  if (!url || !type) return res.status(400).json({ status: "fail", message: "url and type required" });
  const media = await productService.addVariantMedia(variantId, url, type, position);
  res.status(201).json(media);
});

export const removeVariantMedia = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const mediaId = req.params.mediaId || req.params.id;
  await productService.removeVariantMedia(mediaId);
  res.status(200).json({ message: "Media removed successfully" });
});

// --------- VariantOption ---------
export const listVariantOptions = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const options = await productService.listVariantOptions();
  res.status(200).json(options);
});

export const getVariantOptionById = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const option = await productService.getVariantOptionById(req.params.optionId);
  res.status(200).json(option);
});

export const createVariantOption = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const option = await productService.createVariantOption(req.body);
  res.status(201).json(option);
});

export const updateVariantOption = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const option = await productService.updateVariantOption(req.params.optionId, req.body);
  res.status(200).json(option);
});

export const deleteVariantOption = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  await productService.deleteVariantOption(req.params.optionId);
  res.status(200).json({ message: "Variant option deleted successfully" });
});

// --------- OptionValue ---------
export const listOptionValues = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const values = await productService.listOptionValues(req.params.optionId);
  res.status(200).json(values);
});

export const getOptionValueById = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const valueId = req.params.valueId || req.params.id;
  const value = await productService.getOptionValueById(valueId);
  res.status(200).json(value);
});

export const createOptionValue = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const value = await productService.createOptionValue(req.params.optionId, req.body);
  res.status(201).json(value);
});

export const updateOptionValue = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const valueId = req.params.valueId || req.params.id;
  const value = await productService.updateOptionValue(valueId, req.body);
  res.status(200).json(value);
});

export const deleteOptionValue = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  const valueId = req.params.valueId || req.params.id;
  await productService.deleteOptionValue(valueId);
  res.status(200).json({ message: "Option value deleted successfully" });
});

// --------- Variant Option Value Assignment Controllers ---------
export const setVariantOptionValues = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  // expects: req.params.variantId and req.body.optionValueIds (array)
  const variantId = req.params.variantId || req.params.id;
  const optionValueIds = req.body.optionValueIds;
  if (!Array.isArray(optionValueIds)) {
    return res.status(400).json({ status: "fail", message: "optionValueIds (array) is required" });
  }
  const updated = await productService.setVariantOptionValues(variantId, optionValueIds);
  res.status(200).json(updated);
});

export const removeVariantOptionValue = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  // expects: req.params.variantId, req.params.optionValueId (or req.body.optionValueId)
  const variantId = req.params.variantId || req.params.id;
  const optionValueId = req.params.optionValueId || req.body.optionValueId;
  if (!variantId || !optionValueId) {
    return res.status(400).json({ status: "fail", message: "variantId and optionValueId required" });
  }
  const result = await productService.removeVariantOptionValue(variantId, optionValueId);
  res.status(200).json(result);
});

export const assignVariantOptionValue = catchAsync(async (req: AuthRequest, res: Response, _next: NextFunction) => {
  // expects: req.params.variantId, req.params.optionValueId (or both in req.body)
  const variantId = req.params.variantId || req.body.variantId || req.params.id;
  const optionValueId = req.params.optionValueId || req.body.optionValueId;
  if (!variantId || !optionValueId) {
    return res.status(400).json({ status: "fail", message: "variantId and optionValueId required" });
  }
  const result = await productService.assignVariantOptionValue(variantId, optionValueId);
  res.status(201).json(result);
});