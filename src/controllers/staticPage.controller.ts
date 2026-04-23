import { Response, NextFunction } from "express";
import Joi from "joi";
import catchAsync from "../utils/catchAsync";
import * as staticPageService from "../services/staticPage.service";
import type { AuthRequest } from "../middleware/auth.middleware";
import AppError from "../utils/appError";
import { StaticPageType, type StaticPageType as StaticPageTypeT } from "../generated/prisma/enums";
import { sanitizeRichTextHtml } from "../utils/sanitizeHtml";

const MAX_CONTENT_BYTES = 200 * 1024;

const STATIC_TYPES = new Set<string>([
  StaticPageType.privacy,
  StaticPageType.terms,
  StaticPageType.about,
]);

function parsePageType(param: string): StaticPageTypeT {
  const t = param.toLowerCase();
  if (!STATIC_TYPES.has(t)) {
    throw new AppError("Invalid page type", 400);
  }
  return t as StaticPageTypeT;
}

const upsertBodySchema = Joi.object({
  content: Joi.string().required().min(1).max(MAX_CONTENT_BYTES),
});

/** Public */
export const getPageByType = catchAsync(
  async (req: AuthRequest, res: Response, _next: NextFunction) => {
    const type = parsePageType(req.params.type);
    const page = await staticPageService.getStaticPageByType(type);
    res.status(200).json(page);
  },
);

/** Admin */
export const upsertPageByType = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const type = parsePageType(req.params.type);
    const { error, value } = upsertBodySchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      return next(new AppError(error.details.map((d) => d.message).join("; "), 400));
    }
    const sanitized = sanitizeRichTextHtml(value.content).trim();
    if (!sanitized) {
      return next(new AppError("Content is empty after sanitization", 400));
    }
    const page = await staticPageService.upsertStaticPage(type, sanitized);
    res.status(200).json(page);
  },
);
