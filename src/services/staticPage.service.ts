import { prisma } from "../lib/prisma";
import AppError from "../utils/appError";
import type { StaticPageType as StaticPageTypeT } from "../generated/prisma/enums";

export async function getStaticPageByType(type: StaticPageTypeT) {
  const page = await prisma.staticPage.findUnique({ where: { type } });
  if (!page) {
    throw new AppError("Page not found", 404);
  }
  return page;
}

export async function upsertStaticPage(type: StaticPageTypeT, content: string) {
  return prisma.staticPage.upsert({
    where: { type },
    create: { type, content },
    update: { content },
  });
}
