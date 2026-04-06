-- AlterTable
ALTER TABLE "User" ADD COLUMN     "locationId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "ShopLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
