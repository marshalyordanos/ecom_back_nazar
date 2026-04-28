import { Request, Response } from "express";


type TrendType = "positive" | "negative";

export interface CardData {
  value: number;
  trend: TrendType;
  trendNumber: string;
  subtitle: string;
}

export interface DashboardResponse {
  total_users: CardData;
  active_users: CardData;
  new_users: CardData;
  customers_with_orders: CardData;
}

//////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////

export const getDateRanges = () => {
  const now = new Date();

  const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

  return {
    current: {
      gte: startOfThisMonth,
      lte: now,
    },
    previous: {
      gte: startOfLastMonth,
      lte: endOfLastMonth,
    },
  };
};

export const calculateTrend = (current: number, previous: number) => {
  if (previous === 0) {
    return { percentChange: current === 0 ? 0 : 100 };
  }

  const percentChange = ((current - previous) / previous) * 100;
  return { percentChange };
};

export const formatCard = (
  value: number,
  percentChange: number,
  subtitle: string
): CardData => ({
  value,
  trend: percentChange >= 0 ? "positive" : "negative",
  trendNumber: `${Math.abs(percentChange).toFixed(1)}%`,
  subtitle,
});

/** Default shipping locale when storefront omits city/country */
export const DEFAULT_SHIPPING_CITY = "Addis Ababa";
export const DEFAULT_SHIPPING_COUNTRY = "Ethiopia";

/**
 * Normalize Ethiopian numbers to E.164 +2519… / +2517… for Chapa, SMS, and storage.
 * Accepts: 09xxxxxxxx, 07xxxxxxxx, 9xxxxxxxx, 7xxxxxxxx, 251…, +251…
 */
export const formatPhoneTo251 = (input: string): string => {
  const trimmed = String(input || "").trim();
  if (!trimmed) return "+251";

  const d = trimmed.replace(/\D/g, "");

  if (d.startsWith("251") && d.length >= 12) {
    return `+251${d.slice(3)}`;
  }

  // 07xxxxxxxxxx / 09xxxxxxxxxx (leading 0 + 7/9 + 9 subscriber digits)
  if (/^0[79]\d{9}$/.test(d)) {
    return `+251${d.slice(2)}`;
  }

  if (d.startsWith("0") && d.length === 10 && (d[1] === "9" || d[1] === "7")) {
    return `+251${d.slice(1)}`;
  }

  if (d.length === 9 && (d[0] === "9" || d[0] === "7")) {
    return `+251${d}`;
  }

  if (d.startsWith("251")) {
    return `+251${d.slice(3)}`;
  }

  if (d.startsWith("0")) {
    return `+251${d.slice(1)}`;
  }

  return `+251${d}`;
};

/** Values that may exist in DB for the same handset (legacy rows). */
export const ethiopiaPhoneLookupVariants = (input: string): string[] => {
  const norm = formatPhoneTo251(input);
  const inner = norm.replace(/^\+/, "");
  const sub = inner.startsWith("251") ? inner.slice(3) : inner;
  const out = new Set<string>();
  const add = (x: string) => {
    const t = x.trim();
    if (t) out.add(t);
  };
  add(input.trim());
  add(norm);
  add(sub);
  add(`0${sub}`);
  add(`251${sub}`);
  add(`+251${sub}`);
  return [...out];
};

export type ShippingAddressInput = {
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
};

/** Ensures +251 phone and non-empty city/country for Prisma order addresses. */
export function finalizeShippingAddressForOrder(input: ShippingAddressInput) {
  return {
    name: input.name,
    phone: formatPhoneTo251(input.phone),
    addressLine1: input.addressLine1,
    addressLine2: input.addressLine2,
    state: input.state?.trim() || undefined,
    city: input.city?.trim() || DEFAULT_SHIPPING_CITY,
    country: input.country?.trim() || DEFAULT_SHIPPING_COUNTRY,
    postalCode: input.postalCode,
  };
}

