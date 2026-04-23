import { Response, NextFunction } from "express";
import Joi from "joi";
import catchAsync from "../utils/catchAsync";
import * as faqService from "../services/faq.service";
import { parseListQuery } from "../utils/queryParser";
import type { AuthRequest } from "../middleware/auth.middleware";
import AppError from "../utils/appError";
import { FaqStatus, type FaqStatus as FaqStatusT } from "../generated/prisma/enums";

const createFaqSchema = Joi.object({
  question: Joi.string().trim().min(1).max(2000).required(),
  answer: Joi.string().trim().min(1).required(),
  status: Joi.string().valid(FaqStatus.DRAFT, FaqStatus.PUBLISHED),
  sortOrder: Joi.number().integer().min(0),
});

const updateFaqSchema = Joi.object({
  question: Joi.string().trim().min(1).max(2000),
  answer: Joi.string().trim().min(1),
  status: Joi.string().valid(FaqStatus.DRAFT, FaqStatus.PUBLISHED),
  sortOrder: Joi.number().integer().min(0),
}).min(1);

/** Public: published FAQs only. */
export const listPublishedFaqs = catchAsync(
  async (req: AuthRequest, res: Response, _next: NextFunction) => {
    const query = parseListQuery(req, { maxPageSize: 100 });
    const result = await faqService.listPublishedFaqs(query);
    res.status(200).json(result);
  },
);

/** Admin: paginated list, optional ?status=DRAFT|PUBLISHED */
export const listFaqsAdmin = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const query = parseListQuery(req, { maxPageSize: 100 });
    const raw = typeof req.query.status === "string" ? req.query.status : undefined;
    let statusFilter: FaqStatusT | undefined;
    if (raw === FaqStatus.DRAFT || raw === FaqStatus.PUBLISHED) {
      statusFilter = raw;
    } else if (raw) {
      return next(new AppError("Invalid status filter", 400));
    }
    const result = await faqService.listFaqsAdmin(query, statusFilter);
    res.status(200).json(result);
  },
);

export const getFaqById = catchAsync(
  async (req: AuthRequest, res: Response, _next: NextFunction) => {
    const faq = await faqService.getFaqById(req.params.id);
    res.status(200).json(faq);
  },
);

export const createFaq = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { error, value } = createFaqSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      return next(new AppError(error.details.map((d) => d.message).join("; "), 400));
    }
    const faq = await faqService.createFaq(value);
    res.status(201).json(faq);
  },
);

export const updateFaq = catchAsync(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { error, value } = updateFaqSchema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      return next(new AppError(error.details.map((d) => d.message).join("; "), 400));
    }
    const faq = await faqService.updateFaq(req.params.id, value);
    res.status(200).json(faq);
  },
);

export const deleteFaq = catchAsync(
  async (req: AuthRequest, res: Response, _next: NextFunction) => {
    const result = await faqService.deleteFaq(req.params.id);
    res.status(200).json(result);
  },
);
