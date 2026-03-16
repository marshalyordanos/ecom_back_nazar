import { prisma } from "../lib/prisma";
import AppError from "../utils/appError";
import { PrismaQueryFeature } from "../utils/apiFeature";

const searchableFields = ["name", "slug", "email", "description"];
const dateFields = ["createdAt", "updatedAt"];

export async function listShops(query: {
  page?: number;
  pageSize?: number;
  search?: string;
  filter?: string;
  sort?: string;
}) {
  const feature = new PrismaQueryFeature<Record<string, unknown>, Record<string, string>>({
    ...query,
    searchableFields,
    dateFields,
  });
  const { skip, take, where, orderBy } = feature.getQuery();

  const [data, total] = await Promise.all([
    prisma.shop.findMany({
      where,
      orderBy,
      skip,
      take,
      select: {
        id: true,
        name: true,
        slug: true,
        email: true,
        phone: true,
        logoUrl: true,
        description: true,
        currency: true,
        timezone: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
    prisma.shop.count({ where }),
  ]);
  return { data, pagination: feature.getPagination(total) };
}

export async function getShopById(id: string) {
  const shop = await prisma.shop.findUnique({
    where: { id },
    include: { locations: true },
  });
  if (!shop) throw new AppError("Shop not found", 404);
  return shop;
}

export async function updateShop(
  id: string,
  data: {
    name?: string;
    email?: string;
    phone?: string;
    logoUrl?: string;
    description?: string;
    currency?: string;
    timezone?: string;
    status?: string;
  }
) {
  const shop = await prisma.shop.update({
    where: { id },
    data: data as Parameters<typeof prisma.shop.update>[0]["data"],
  });
  return shop;
}

export async function listShopLocations(shopId: string) {
  const locations = await prisma.shopLocation.findMany({
    where: { shopId },
    orderBy: { createdAt: "desc" },
  });
  return locations;
}

export async function addShopLocation(
  shopId: string,
  data: {
    name: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state?: string;
    country: string;
    postalCode?: string;
    latitude?: number;
    longitude?: number;
    phone?: string;
  }
) {
  const location = await prisma.shopLocation.create({
    data: { shopId, ...data },
  });
  return location;
}

export async function updateLocation(
  locationId: string,
  data: {
    name?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
    latitude?: number;
    longitude?: number;
    phone?: string;
  }
) {
  const location = await prisma.shopLocation.update({
    where: { id: locationId },
    data: data as Parameters<typeof prisma.shopLocation.update>[0]["data"],
  });
  return location;
}

export async function deleteLocation(locationId: string) {
  await prisma.shopLocation.delete({ where: { id: locationId } });
  return { message: "Location deleted successfully" };
}
