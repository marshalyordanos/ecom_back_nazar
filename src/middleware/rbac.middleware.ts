import { Response, NextFunction } from "express";
import AppError from "../utils/appError";
import { prisma } from "../lib/prisma";
import type { AuthRequest } from "./auth.middleware";

type Action = "create" | "read" | "update" | "delete";

/**
 * Require the user to have a role that has the given permission with the given action.
 * Expects req.user.roles to be set (use after protect middleware).
 */
export const requirePermission = (resource: string, action: Action) => {
  return async (req: AuthRequest, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError("Not authenticated", 401));
    }

    const actionKey = `${action}Action` as "createAction" | "readAction" | "updateAction" | "deleteAction";
    const roleNames = req.user.roles;

    const rolePermissions = await prisma.rolePermission.findMany({
      where: {
        role: { name: { in: roleNames } },
        permission: { resource },
        [actionKey]: true,
      },
      select: { id: true },
    });

    if (rolePermissions.length === 0) {
      return next(new AppError(`You do not have permission to ${action} ${resource}`, 403));
    }
    next();
  };
};

/**
 * Require any of the given permissions (resource + action pairs).
 */
export const requireAnyPermission = (...checks: Array<{ resource: string; action: Action }>) => {
  return async (req: AuthRequest, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError("Not authenticated", 401));
    }

    const roleNames = req.user.roles;
    for (const { resource, action } of checks) {
      const actionKey = `${action}Action` as "createAction" | "readAction" | "updateAction" | "deleteAction";
      const count = await prisma.rolePermission.count({
        where: {
          role: { name: { in: roleNames } },
          permission: { resource },
          [actionKey]: true,
        },
      });
      if (count > 0) return next();
    }
    return next(new AppError("You do not have permission to perform this action", 403));
  };
};
