import { prisma } from "../lib/prisma";

type RegisterExpoPushTokenInput = {
  userId: string;
  token: string;
  platform?: string;
};

export async function registerExpoPushToken(input: RegisterExpoPushTokenInput) {
  const token = input.token.trim();
  if (!token) {
    throw new Error("Push token is required");
  }

  return prisma.expoPushToken.upsert({
    where: { token },
    create: {
      userId: input.userId,
      token,
      platform: input.platform,
    },
    update: {
      userId: input.userId,
      platform: input.platform,
      updatedAt: new Date(),
    },
  });
}

export async function removeExpoPushToken(userId: string, token: string) {
  const normalized = token.trim();
  if (!normalized) {
    throw new Error("Push token is required");
  }

  await prisma.expoPushToken.deleteMany({
    where: { userId, token: normalized },
  });

  return { message: "Push token removed" };
}

export async function listExpoPushTokensByUser(userId: string) {
  return prisma.expoPushToken.findMany({
    where: { userId },
    select: { id: true, token: true },
  });
}

export async function removeExpoPushTokenById(id: string) {
  await prisma.expoPushToken.deleteMany({ where: { id } });
}
