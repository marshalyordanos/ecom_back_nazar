import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AppError from "../utils/appError";
import { prisma } from "../lib/prisma";
import config from "../config/config";
import { tokenTypes } from "../config/tokens";
import type { MergedPermissionMap } from "../services/rbacPermission.service";

export interface JwtPayload {
  userId: string;
  email: string;
  type: string;
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string | null;
    roles: string[];
    isSuperAdmin: boolean;
    locationId?: string | null;
  };
  /** Cached merged RBAC map for non–super-admins (set by permission middleware). */
  mergedPermissions?: MergedPermissionMap;
}

/**
 * Protect routes: require valid JWT access token.
 */
export const protect = async (req: AuthRequest, _res: Response, next: NextFunction) => {
  let token: string | undefined;
  if (req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new AppError("You are not logged in. Please log in.", 401));
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
    if (decoded.type !== tokenTypes.ACCESS) {
      return next(new AppError("Invalid token type", 401));
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { roles: { select: { name: true } } },
    });
    if (!user) {
      return next(new AppError("User no longer exists", 401));
    }
    if (user.status !== "ACTIVE") {
      return next(new AppError("Account is inactive or suspended", 401));
    }

    req.user = {
      id: user.id,
      email: user.email,
      isSuperAdmin: user.isSuperAdmin,
      roles: user.roles.map((r) => r.name),
      locationId: user.locationId ?? null,
    };
    console.log("req.user222222: ", req.user);
    next();
  } catch (err: any) {
    // If token is expired, jwt.verify throws with err.name === 'TokenExpiredError'
    if (err && err.name === 'TokenExpiredError') {
      return next(new AppError("Token is expired", 401));
    }
    return next(new AppError("Invalid or expired token", 401));
  }
};

/**
 * Optional auth: attach user if token present, do not require it.
 */
export const optionalAuth = async (req: AuthRequest, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return next();
  }
  const token = authHeader.split(" ")[1];
  if (!token) return next();

  try {
    const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
    if (decoded.type !== tokenTypes.ACCESS) return next();

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { roles: { select: { name: true } } },
    });
    if (!user || user.status !== "ACTIVE") return next();

    req.user = {
      id: user.id,
      email: user.email,
      isSuperAdmin: user.isSuperAdmin,
      roles: user.roles.map((r) => r.name),
      locationId: user.locationId ?? null,
    };
  } catch {
    // ignore invalid token
  }
  next();
};

/**
 * Require at least one of the given roles.
 */
export const restrictTo = (...roleNames: string[]) => {
  return (req: AuthRequest, _res: Response, next: NextFunction) => {
    console.log("00000000000000: ",req.user)
    if (!req.user) {
      return next(new AppError("Not authenticated", 401));
    }
    if (req.user!.isSuperAdmin) {
      return next();
    }
    const hasRole = roleNames.some((r) => req.user!.roles.includes(r));
    if (!hasRole) {
      return next(new AppError("You do not have permission to perform this action", 403));
    }
    next();
  };
};
