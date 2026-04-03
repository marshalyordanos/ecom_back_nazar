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

