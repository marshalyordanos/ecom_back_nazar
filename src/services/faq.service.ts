import { prisma } from "../lib/prisma";
import AppError from "../utils/appError";
import type { ParsedQuery } from "../utils/queryParser";
import { FaqStatus, type FaqStatus as FaqStatusT } from "../generated/prisma/enums";

export async function listPublishedFaqs(query: ParsedQuery) {
  const { page, pageSize } = query;
  const skip = (page - 1) * pageSize;
  const where = { status: FaqStatus.PUBLISHED as FaqStatusT };

  const [data, total] = await Promise.all([
    prisma.faq.findMany({
      where,
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      skip,
      take: pageSize,
      select: {
        id: true,
        question: true,
        answer: true,
        sortOrder: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
    prisma.faq.count({ where }),
  ]);

  return {
    data,
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize) || 1,
    },
  };
}

export async function listFaqsAdmin(
  query: ParsedQuery,
  statusFilter?: FaqStatusT,
) {
  const { page, pageSize } = query;
  const skip = (page - 1) * pageSize;
  const where = statusFilter ? { status: statusFilter } : {};

  const [data, total] = await Promise.all([
    prisma.faq.findMany({
      where,
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      skip,
      take: pageSize,
    }),
    prisma.faq.count({ where }),
  ]);

  return {
    data,
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize) || 1,
    },
  };
}

export async function getFaqById(id: string) {
  const faq = await prisma.faq.findUnique({ where: { id } });
  if (!faq) {
    throw new AppError("FAQ not found", 404);
  }
  return faq;
}

export async function createFaq(input: {
  question: string;
  answer: string;
  status?: FaqStatusT;
  sortOrder?: number;
}) {
  return prisma.faq.create({
    data: {
      question: input.question,
      answer: input.answer,
      status: input.status ?? FaqStatus.DRAFT,
      sortOrder: input.sortOrder ?? 0,
    },
  });
}

export async function updateFaq(
  id: string,
  input: Partial<{
    question: string;
    answer: string;
    status: FaqStatusT;
    sortOrder: number;
  }>,
) {
  await getFaqById(id);
  return prisma.faq.update({
    where: { id },
    data: input,
  });
}

export async function deleteFaq(id: string) {
  await getFaqById(id);
  await prisma.faq.delete({ where: { id } });
  return { success: true };
}
