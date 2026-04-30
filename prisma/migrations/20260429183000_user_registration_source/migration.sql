-- CreateEnum
CREATE TYPE "UserRegistrationSource" AS ENUM ('SELF', 'SYSTEM_GUEST_CHECKOUT');

-- AlterTable
ALTER TABLE "User" ADD COLUMN "registrationSource" "UserRegistrationSource" NOT NULL DEFAULT 'SELF';

-- Existing guest-checkout placeholders (synthetic email pattern)
UPDATE "User" SET "registrationSource" = 'SYSTEM_GUEST_CHECKOUT'
WHERE "email" IS NOT NULL AND "email" ~ '^user\+[0-9]+@gmail\.com$';
