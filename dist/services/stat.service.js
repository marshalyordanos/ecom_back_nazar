"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEcommerceUsers = getEcommerceUsers;
exports.getEcommerceSummary = getEcommerceSummary;
const prisma_1 = require("../lib/prisma");
async function getEcommerceUsers() {
    const users = await prisma_1.prisma.user.findMany({
        take: 50,
        orderBy: { createdAt: 'desc' }
    });
    // Map to front-end UsersType shape used by dashboard UserTable
    return users.map((u, idx) => ({
        id: idx + 1,
        role: (u.isSuperAdmin ? 'admin' : 'subscriber'),
        email: u.email,
        status: (String(u.status).toLowerCase() || 'active'),
        avatar: u.avatarUrl || '',
        company: '',
        country: '',
        contact: '',
        fullName: `${u.firstName ?? ''} ${u.lastName ?? ''}`.trim() || u.email,
        username: u.email?.split("@")[0] ?? "",
        currentPlan: 'standard'
    }));
}
async function getEcommerceSummary() {
    const [orders, revenueAgg, payments] = await Promise.all([
        prisma_1.prisma.order.count(),
        prisma_1.prisma.order.aggregate({ _sum: { grandTotal: true } }),
        prisma_1.prisma.payment.count()
    ]);
    return {
        totalOrders: orders,
        totalRevenue: revenueAgg._sum.grandTotal ?? 0,
        totalPayments: payments
    };
}
//# sourceMappingURL=stat.service.js.map