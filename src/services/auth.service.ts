import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../config/config";
import { tokenTypes } from "../config/tokens";
import { prisma } from "../lib/prisma";
import { hashPassword, comparePassword } from "../utils/hash";
import AppError from "../utils/appError";
import { sendEmail } from "../utils/email";
import { getMergedPermissionsForUser, mergedMapToList } from "./rbacPermission.service";

// const accessExpirationMinutes = parseInt(config.jwt.accessExpirationMinutes, 10) || 1;
const accessExpirationMinutes = 1;
const refreshExpirationDays = parseInt(config.jwt.refreshExpirationDays, 10) || 60;

function generateAccessToken(userId: string, email: string): string {
  return jwt.sign(
    { userId, email, type: tokenTypes.ACCESS },
    config.jwt.secret,
    { expiresIn: `${accessExpirationMinutes}m` }
  );
}

function generateRefreshToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

function generateResetToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export async function adminRegister(data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}) {
  if (!data.phone) {
    throw new AppError("Phone is required", 400);
  }
 
  const passwordHash = await hashPassword(data.password);


  const user = await prisma.user.create({
    data: {
      email: data.email,
      passwordHash,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      isSuperAdmin: true,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      status: true,
      createdAt: true,
    },
  });

  const accessToken = generateAccessToken(user.id, user.email);
  const refreshToken = generateRefreshToken();
  await prisma.token.create({
    data: {
      userId: user.id,
      token: refreshToken,
      type: tokenTypes.REFRESH,
      expiresAt: new Date(Date.now() + refreshExpirationDays * 24 * 60 * 60 * 1000),
    },
  });

  return {
    user,
    accessToken,
    refreshToken,
    expiresIn: accessExpirationMinutes * 60,
  };
}
export async function register(data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}) {
  if (!data.phone) {
    throw new AppError("Phone is required", 400);
  }
  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) {
    throw new AppError("Email already registered", 409);
  }

  const passwordHash = await hashPassword(data.password);
  const defaultRole = await prisma.role.findFirst({ where: { name: "user" } });
  if (!defaultRole) {
    throw new AppError("Default role 'user' not found. Run seed.", 500);
  }

  const user = await prisma.user.create({
    data: {
      email: data.email,
      passwordHash,
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      isSuperAdmin: false,
      roles: { connect: [{ id: defaultRole.id }] },
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      status: true,
      createdAt: true,
    },
  });

  const accessToken = generateAccessToken(user.id, user.email);
  const refreshToken = generateRefreshToken();
  await prisma.token.create({
    data: {
      userId: user.id,
      token: refreshToken,
      type: tokenTypes.REFRESH,
      expiresAt: new Date(Date.now() + refreshExpirationDays * 24 * 60 * 60 * 1000),
    },
  });

  return {
    user,
    accessToken,
    refreshToken,
    expiresIn: accessExpirationMinutes * 60,
  };
}

export async function login(emailPhone: string, password: string) {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ email: emailPhone }, { phone: emailPhone }],
    },
    include: { roles: { select: { name: true } } },
  });
  if (!user || !(await comparePassword(password, user.passwordHash))) {
    throw new AppError("Invalid email/phone or password", 401);
  }
  if (user.status !== "ACTIVE") {
    throw new AppError("Account is inactive or suspended", 401);
  }

  const accessToken = generateAccessToken(user.id, user.email);
  const refreshToken = generateRefreshToken();
  await prisma.token.create({
    data: {
      userId: user.id,
      token: refreshToken,
      type: tokenTypes.REFRESH,
      expiresAt: new Date(Date.now() + refreshExpirationDays * 24 * 60 * 60 * 1000),
    },
  });

  const permMap = await getMergedPermissionsForUser(user.id);

  return {
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      isSuperAdmin: user.isSuperAdmin,
      roles: user.roles.map((r) => r.name),
      permissions: mergedMapToList(permMap),
    },
    accessToken,
    refreshToken,
    expiresIn: accessExpirationMinutes * 60,
  };
}

export async function logout(refreshToken: string | undefined) {
  if (refreshToken) {
    await prisma.token.deleteMany({
      where: { token: refreshToken, type: tokenTypes.REFRESH },
    });
  }
  return { message: "Logged out successfully" };
}

export async function refresh(refreshToken: string) {
  const tokenRecord = await prisma.token.findFirst({
    where: { token: refreshToken, type: tokenTypes.REFRESH },
    include: { user: true },
  });
  if (!tokenRecord) {
    throw new AppError("Session expired. Please log in again", 401);
  }

  if (tokenRecord.expiresAt < new Date()) {
    await prisma.token.deleteMany({
      where: { token: refreshToken, type: tokenTypes.REFRESH },
    });
    throw new AppError("Session expired. Please log in again", 401);
  }
  if (tokenRecord.user.status !== "ACTIVE") {
    await prisma.token.deleteMany({
      where: { token: refreshToken, type: tokenTypes.REFRESH },
    });
    throw new AppError("Account is inactive", 401);
  }

  await prisma.token.delete({ where: { id: tokenRecord.id } });

  const newAccessToken = generateAccessToken(tokenRecord.user.id, tokenRecord.user.email);
  const newRefreshToken = generateRefreshToken();
  await prisma.token.create({
    data: {
      userId: tokenRecord.userId,
      token: newRefreshToken,
      type: tokenTypes.REFRESH,
      expiresAt: new Date(Date.now() + refreshExpirationDays * 24 * 60 * 60 * 1000),
    },
  });

  const fullUser = await prisma.user.findUnique({
    where: { id: tokenRecord.userId },
    include: { roles: { select: { name: true } } },
  });
  if (!fullUser) {
    throw new AppError("User no longer exists", 401);
  }
  const permMap = await getMergedPermissionsForUser(fullUser.id);

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    expiresIn: accessExpirationMinutes * 60,
    user: {
      id: fullUser.id,
      email: fullUser.email,
      firstName: fullUser.firstName,
      lastName: fullUser.lastName,
      phone: fullUser.phone,
      isSuperAdmin: fullUser.isSuperAdmin,
      roles: fullUser.roles.map((r) => r.name),
      permissions: mergedMapToList(permMap),
    },
  };
}

export async function forgotPassword(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return { message: "If the email exists, a reset link has been sent." };
  }

  const resetToken = generateResetToken();
  await prisma.token.create({
    data: {
      userId: user.id,
      token: resetToken,
      type: tokenTypes.RESET_PASSWORD,
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    },
  });

  const resetUrl = `${process.env.FRONTEND_URL || "http://localhost:3000"}/reset-password?token=${resetToken}`;
  await sendEmail({
    to: user.email,
    subject: "Password reset",
    text: `Use this link to reset your password: ${resetUrl}. It expires in 1 hour.`,
  });

  return { message: "If the email exists, a reset link has been sent." };
}

export async function resetPassword(token: string, newPassword: string) {
  const tokenRecord = await prisma.token.findFirst({
    where: { token, type: tokenTypes.RESET_PASSWORD },
    include: { user: true },
  });
  if (!tokenRecord || tokenRecord.expiresAt < new Date()) {
    throw new AppError("Invalid or expired reset token", 400);
  }

  const passwordHash = await hashPassword(newPassword);
  await prisma.$transaction([
    prisma.user.update({
      where: { id: tokenRecord.userId },
      data: { passwordHash },
    }),
    prisma.token.delete({ where: { id: tokenRecord.id } }),
  ]);

  return { message: "Password reset successfully" };
}

export async function changePassword(userId: string, currentPassword: string, newPassword: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new AppError("User not found", 404);
  const valid = await comparePassword(currentPassword, user.passwordHash);
  if (!valid) throw new AppError("Current password is incorrect", 401);

  const passwordHash = await hashPassword(newPassword);
  await prisma.user.update({
    where: { id: userId },
    data: { passwordHash },
  });
  return { message: "Password updated successfully" };
}
