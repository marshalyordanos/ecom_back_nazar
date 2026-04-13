import { prisma } from "../lib/prisma"
import AppError from "../utils/appError"

export async function listMySavedAddresses(userId: string) {
  return prisma.savedAddress.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  })
}

export async function addMySavedAddress(
  userId: string,
  data: {
    label: string
    name: string
    phone: string
    addressLine1: string
    addressLine2?: string
    city: string
    state?: string
    country: string
    postalCode?: string
    latitude?: number
    longitude?: number
  }
) {
  if (!data.label || !data.name || !data.phone || !data.addressLine1 || !data.city || !data.country) {
    throw new AppError("Missing required address fields", 400)
  }

  return prisma.savedAddress.create({
    data: {
      userId,
      label: data.label,
      name: data.name,
      phone: data.phone,
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2 || undefined,
      city: data.city,
      state: data.state || undefined,
      country: data.country,
      postalCode: data.postalCode || undefined,
      latitude: data.latitude ?? undefined,
      longitude: data.longitude ?? undefined,
    },
  })
}

export async function deleteMySavedAddress(userId: string, addressId: string) {
  // Using deleteMany avoids leaking existence info across users.
  const res = await prisma.savedAddress.deleteMany({ where: { id: addressId, userId } })
  if (res.count === 0) throw new AppError("Saved address not found", 404)
  return { message: "Saved address deleted" }
}

