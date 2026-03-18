/*
  Warnings:

  - Added the required column `updatedAt` to the `InventoryMovement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Inventory" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "InventoryMovement" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
