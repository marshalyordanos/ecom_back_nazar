import { prisma } from '../lib/prisma'

export async function getEcommerceUsers() {
	const users = await prisma.user.findMany({
		take: 50,
		orderBy: { createdAt: 'desc' }
	})
	// Map to front-end UsersType shape used by dashboard UserTable
	return users.map((u, idx) => ({
		id: idx + 1,
		role: (u.isSuperAdmin ? 'admin' : 'subscriber') as string,
		email: u.email,
		status: (String(u.status).toLowerCase() || 'active') as string,
		avatar: u.avatarUrl || '',
		company: '',
		country: '',
		contact: '',
		fullName: `${u.firstName ?? ''} ${u.lastName ?? ''}`.trim() || u.email,
		username: u.email.split('@')[0],
		currentPlan: 'standard'
	}))
}

export async function getEcommerceSummary() {
	const [orders, revenueAgg, payments] = await Promise.all([
		prisma.order.count(),
		prisma.order.aggregate({ _sum: { grandTotal: true } }),
		prisma.payment.count()
	])
	return {
		totalOrders: orders,
		totalRevenue: revenueAgg._sum.grandTotal ?? 0,
		totalPayments: payments
	}
}

