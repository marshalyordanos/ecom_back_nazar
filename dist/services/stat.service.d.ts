export declare function getEcommerceUsers(): Promise<{
    id: number;
    role: string;
    email: string;
    status: string;
    avatar: string;
    company: string;
    country: string;
    contact: string;
    fullName: string;
    username: string;
    currentPlan: string;
}[]>;
export declare function getEcommerceSummary(): Promise<{
    totalOrders: number;
    totalRevenue: number;
    totalPayments: number;
}>;
//# sourceMappingURL=stat.service.d.ts.map