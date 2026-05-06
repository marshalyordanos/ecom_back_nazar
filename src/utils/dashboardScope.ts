import type { Prisma } from "../generated/prisma/client";
import type { AuthRequest } from "../middleware/auth.middleware";
import { prisma } from "../lib/prisma";

/** Resolved from query string + auth (branch users are forced to their location). */
export type ResolvedDashboardScope = {
  dateFrom?: Date;
  dateTo?: Date;
  /** Pickup / branch location — filters Order.pickupLocationId */
  locationId?: string;
};

function parseDateOnlyUtc(isoDate: string, endOfDay: boolean): Date | undefined {
  if (!isoDate || !/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) return undefined;
  const suffix = endOfDay ? "T23:59:59.999Z" : "T00:00:00.000Z";
  const d = new Date(`${isoDate}${suffix}`);
  return Number.isNaN(d.getTime()) ? undefined : d;
}

/**
 * Merge dashboard filters from query with RBAC:
 * - Super admin: optional `locationId` (must belong to `shopId`); omit / `all` = all branches.
 * - Branch user: always `req.user.locationId` when set (query ignored).
 */
export async function resolveDashboardScope(req: AuthRequest, shopId: string): Promise<ResolvedDashboardScope> {
  const scope: ResolvedDashboardScope = {};

  const df = typeof req.query.dateFrom === "string" ? req.query.dateFrom : undefined;
  const dt = typeof req.query.dateTo === "string" ? req.query.dateTo : undefined;
  const from = df ? parseDateOnlyUtc(df, false) : undefined;
  const to = dt ? parseDateOnlyUtc(dt, true) : undefined;
  if (from) scope.dateFrom = from;
  if (to) scope.dateTo = to;

  if (!req.user?.isSuperAdmin && req.user?.locationId) {
    const loc = await prisma.shopLocation.findFirst({
      where: { id: req.user.locationId, shopId },
      select: { id: true },
    });
    if (loc) scope.locationId = loc.id;
    return scope;
  }

  if (req.user?.isSuperAdmin) {
    const raw = typeof req.query.locationId === "string" ? req.query.locationId.trim() : "";
    if (raw && raw !== "all") {
      const loc = await prisma.shopLocation.findFirst({
        where: { id: raw, shopId },
        select: { id: true },
      });
      if (loc) scope.locationId = loc.id;
    }
  }

  return scope;
}

export function orderWhereWithScope(shopId: string, scope: ResolvedDashboardScope): Prisma.OrderWhereInput {
  const w: Prisma.OrderWhereInput = { shopId };
  if (scope.locationId) {
    w.pickupLocationId = scope.locationId;
  }
  if (scope.dateFrom || scope.dateTo) {
    w.createdAt = {};
    if (scope.dateFrom) w.createdAt.gte = scope.dateFrom;
    if (scope.dateTo) w.createdAt.lte = scope.dateTo;
  }
  return w;
}

export function paymentWhereFromOrderScope(shopId: string, scope: ResolvedDashboardScope): Prisma.PaymentWhereInput {
  return { order: orderWhereWithScope(shopId, scope) };
}
