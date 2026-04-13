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
export declare const getDateRanges: () => {
    current: {
        gte: Date;
        lte: Date;
    };
    previous: {
        gte: Date;
        lte: Date;
    };
};
export declare const calculateTrend: (current: number, previous: number) => {
    percentChange: number;
};
export declare const formatCard: (value: number, percentChange: number, subtitle: string) => CardData;
/**
 * Normalize Ethiopian phone numbers to +251XXXXXXXXX for Chapa.
 * Examples:
 *  - 0912345678 -> +251912345678
 *  - 912345678  -> +251912345678
 *  - 251912345678 -> +251912345678
 *  - +251912345678 -> +251912345678
 */
export declare const formatPhoneTo251: (input: string) => string;
export {};
//# sourceMappingURL=helper.d.ts.map