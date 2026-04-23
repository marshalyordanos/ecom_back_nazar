-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL;

-- CreateTable
CREATE TABLE "OtpRecord" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "channelValue" TEXT NOT NULL,
    "otpType" TEXT NOT NULL,
    "otpPurpose" TEXT NOT NULL,
    "verificationId" TEXT,
    "otpHash" TEXT,
    "otpExpiresAt" TIMESTAMP(3),
    "otpAttempts" INTEGER NOT NULL DEFAULT 0,
    "otpCooldownUntil" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OtpRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "OtpRecord_channelValue_otpType_otpPurpose_idx" ON "OtpRecord"("channelValue", "otpType", "otpPurpose");

-- CreateIndex
CREATE UNIQUE INDEX "OtpRecord_userId_otpType_otpPurpose_key" ON "OtpRecord"("userId", "otpType", "otpPurpose");

-- AddForeignKey
ALTER TABLE "OtpRecord" ADD CONSTRAINT "OtpRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
