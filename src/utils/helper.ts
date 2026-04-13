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

/**
 * Normalize Ethiopian phone numbers to +251XXXXXXXXX for Chapa.
 * Examples:
 *  - 0912345678 -> +251912345678
 *  - 912345678  -> +251912345678
 *  - 251912345678 -> +251912345678
 *  - +251912345678 -> +251912345678
 */
export const formatPhoneTo251 = (input: string): string => {
  const trimmed = String(input || "").trim();
  if (!trimmed) return "+251";

  if (trimmed.startsWith("+")) {
    const digits = trimmed.slice(1).replace(/\D/g, "");
    if (digits.startsWith("251")) {
      return `+251${digits.slice(3)}`;
    }
    if (digits.startsWith("0")) {
      return `+251${digits.slice(1)}`;
    }
    if (digits.length === 9 && digits.startsWith("9")) {
      return `+251${digits}`;
    }
    return `+251${digits}`;
  }

  const rawPhone = trimmed.replace(/\D/g, "");
  if (rawPhone.startsWith("251")) return `+251${rawPhone.slice(3)}`;
  if (rawPhone.startsWith("0")) return `+251${rawPhone.slice(1)}`;
  if (rawPhone.length === 9 && rawPhone.startsWith("9")) return `+251${rawPhone}`;
  return `+251${rawPhone}`;
};

