/*
  Warnings:

  - A unique constraint covering the columns `[variantId,locationId]` on the table `Inventory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Inventory_variantId_locationId_key" ON "Inventory"("variantId", "locationId");
