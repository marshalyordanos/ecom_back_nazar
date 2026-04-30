-- AlterTable
ALTER TABLE "Order" ADD COLUMN "pickupLocationId" TEXT;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_pickupLocationId_fkey" FOREIGN KEY ("pickupLocationId") REFERENCES "ShopLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
