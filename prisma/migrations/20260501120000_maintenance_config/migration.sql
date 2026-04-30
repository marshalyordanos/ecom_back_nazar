-- CreateTable
CREATE TABLE "MaintenanceConfig" (
    "id" TEXT NOT NULL,
    "webMaintenance" BOOLEAN NOT NULL DEFAULT false,
    "adminMaintenance" BOOLEAN NOT NULL DEFAULT false,
    "mobileMaintenance" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MaintenanceConfig_pkey" PRIMARY KEY ("id")
);

INSERT INTO "MaintenanceConfig" ("id", "webMaintenance", "adminMaintenance", "mobileMaintenance", "createdAt", "updatedAt")
VALUES ('default', false, false, false, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
