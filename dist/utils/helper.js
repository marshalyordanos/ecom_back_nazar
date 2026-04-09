"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPhoneTo251 = exports.formatCard = exports.calculateTrend = exports.getDateRanges = void 0;
//////////////////////////////////////////////////////
// HELPERS
//////////////////////////////////////////////////////
const getDateRanges = () => {
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
exports.getDateRanges = getDateRanges;
const calculateTrend = (current, previous) => {
    if (previous === 0) {
        return { percentChange: current === 0 ? 0 : 100 };
    }
    const percentChange = ((current - previous) / previous) * 100;
    return { percentChange };
};
exports.calculateTrend = calculateTrend;
const formatCard = (value, percentChange, subtitle) => ({
    value,
    trend: percentChange >= 0 ? "positive" : "negative",
    trendNumber: `${Math.abs(percentChange).toFixed(1)}%`,
    subtitle,
});
exports.formatCard = formatCard;
/**
 * Normalize Ethiopian phone numbers to +251XXXXXXXXX for Chapa.
 * Examples:
 *  - 0912345678 -> +251912345678
 *  - 912345678  -> +251912345678
 *  - 251912345678 -> +251912345678
 *  - +251912345678 -> +251912345678
 */
const formatPhoneTo251 = (input) => {
    const trimmed = String(input || "").trim();
    if (!trimmed)
        return "+251";
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
    if (rawPhone.startsWith("251"))
        return `+251${rawPhone.slice(3)}`;
    if (rawPhone.startsWith("0"))
        return `+251${rawPhone.slice(1)}`;
    if (rawPhone.length === 9 && rawPhone.startsWith("9"))
        return `+251${rawPhone}`;
    return `+251${rawPhone}`;
};
exports.formatPhoneTo251 = formatPhoneTo251;
//# sourceMappingURL=helper.js.map