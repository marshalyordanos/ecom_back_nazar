import { prisma } from "../lib/prisma";

export const MAINTENANCE_ROW_ID = "default";

async function ensureMaintenanceRow() {
  const existing = await prisma.maintenanceConfig.findUnique({
    where: { id: MAINTENANCE_ROW_ID },
  });
  if (existing) return existing;
  return prisma.maintenanceConfig.create({
    data: {
      id: MAINTENANCE_ROW_ID,
      webMaintenance: false,
      adminMaintenance: false,
      mobileMaintenance: false,
    },
  });
}

export async function getMaintenanceConfig() {
  return ensureMaintenanceRow();
}

export type MaintenancePatchBody = Partial<{
  webMaintenance: boolean;
  adminMaintenance: boolean;
  mobileMaintenance: boolean;
}>;

export async function upsertMaintenanceConfig(body: MaintenancePatchBody) {
  await ensureMaintenanceRow();
  const data: Record<string, boolean> = {};
  if (typeof body.webMaintenance === "boolean") data.webMaintenance = body.webMaintenance;
  if (typeof body.adminMaintenance === "boolean") data.adminMaintenance = body.adminMaintenance;
  if (typeof body.mobileMaintenance === "boolean") data.mobileMaintenance = body.mobileMaintenance;
  if (Object.keys(data).length === 0) {
    return prisma.maintenanceConfig.findUniqueOrThrow({ where: { id: MAINTENANCE_ROW_ID } });
  }
  return prisma.maintenanceConfig.update({
    where: { id: MAINTENANCE_ROW_ID },
    data,
  });
}
