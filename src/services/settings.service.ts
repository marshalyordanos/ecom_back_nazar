import { prisma } from "../lib/prisma";
import AppError from "../utils/appError";

export async function getShopSettings(shopId: string) {
  const settings = await prisma.shopSetting.findMany({
    where: { shopId },
  });
  return settings.reduce((acc: Record<string, string>, s) => {
    acc[s.key] = s.value;
    return acc;
  }, {});
}

export async function getSettingByKey(shopId: string, key: string) {
  const setting = await prisma.shopSetting.findUnique({
    where: { shopId_key: { shopId, key } },
  });
  if (!setting) throw new AppError("Setting not found", 404);
  return setting;
}

export async function setSetting(shopId: string, key: string, value: string) {
  const setting = await prisma.shopSetting.upsert({
    where: { shopId_key: { shopId, key } },
    create: { shopId, key, value },
    update: { value },
  });
  return setting;
}

export async function deleteSetting(shopId: string, key: string) {
  await prisma.shopSetting.delete({
    where: { shopId_key: { shopId, key } },
  });
  return { message: "Setting deleted successfully" };
}

export async function setMultipleSettings(shopId: string, data: Record<string, string>) {
  const result = [];
  for (const [key, value] of Object.entries(data)) {
    const s = await prisma.shopSetting.upsert({
      where: { shopId_key: { shopId, key } },
      create: { shopId, key, value },
      update: { value },
    });
    result.push(s);
  }
  return result;
}
