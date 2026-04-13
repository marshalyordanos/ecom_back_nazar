-- CreateTable
CREATE TABLE "SaleFromShop" (
    "id" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "variantId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SaleFromShop_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SaleFromShop" ADD CONSTRAINT "SaleFromShop_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "ShopLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleFromShop" ADD CONSTRAINT "SaleFromShop_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "ProductVariant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
