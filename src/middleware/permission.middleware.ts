import { Response, NextFunction } from "express";
import AppError from "../utils/appError";
import type { AuthRequest } from "./auth.middleware";
import { getMergedPermissionsForUser, hasPermission } from "../services/rbacPermission.service";

async function loadMergedPermissions(req: AuthRequest) {
  if (!req.user) {
    throw new AppError("Not authenticated", 401);
  }
  if (req.mergedPermissions) {
    return req.mergedPermissions;
  }
  const map = await getMergedPermissionsForUser(req.user.id);
  req.mergedPermissions = map;
  return map;
}

export function requirePermission(resource: string, action: "create" | "read" | "update" | "delete") {
  return async (req: AuthRequest, _res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        return next(new AppError("Not authenticated", 401));
      }
      if (req.user.isSuperAdmin) {
        return next();
      }
      const map = await loadMergedPermissions(req);
      if (hasPermission(map, resource, action)) {
        return next();
      }
      return next(
        new AppError(`Forbidden: missing ${action} permission for resource "${resource}"`, 403)
      );
    } catch (e) {
      next(e);
    }
  };
}
