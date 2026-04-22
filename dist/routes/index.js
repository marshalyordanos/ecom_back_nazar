"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_router_1 = __importDefault(require("./auth.router"));
const user_router_1 = __importDefault(require("./user.router"));
const role_router_1 = __importDefault(require("./role.router"));
const permission_router_1 = __importDefault(require("./permission.router"));
const shop_router_1 = __importDefault(require("./shop.router"));
const brand_router_1 = __importDefault(require("./brand.router"));
const category_router_1 = __importDefault(require("./category.router"));
const product_router_1 = __importDefault(require("./product.router"));
const inventory_router_1 = __importDefault(require("./inventory.router"));
const cart_router_1 = __importDefault(require("./cart.router"));
const order_router_1 = __importDefault(require("./order.router"));
const payment_router_1 = __importDefault(require("./payment.router"));
const shipment_router_1 = __importDefault(require("./shipment.router"));
const coupon_router_1 = __importDefault(require("./coupon.router"));
const review_router_1 = __importDefault(require("./review.router"));
const analytics_router_1 = __importDefault(require("./analytics.router"));
const sync_router_1 = __importDefault(require("./sync.router"));
const settings_router_1 = __importDefault(require("./settings.router"));
const dashboard_router_1 = __importDefault(require("./dashboard.router"));
const reports_router_1 = __importDefault(require("./reports.router"));
const favorite_router_1 = __importDefault(require("./favorite.router"));
const faq_router_1 = __importDefault(require("./faq.router"));
const pages_router_1 = __importDefault(require("./pages.router"));
const router = express_1.default.Router();
const defaultRoutes = [
    { path: "/auth", route: auth_router_1.default },
    { path: "/users", route: user_router_1.default },
    { path: "/roles", route: role_router_1.default },
    { path: "/permissions", route: permission_router_1.default },
    { path: "/shops", route: shop_router_1.default },
    { path: "/brands", route: brand_router_1.default },
    { path: "/categories", route: category_router_1.default },
    { path: "/products", route: product_router_1.default },
    { path: "/inventory", route: inventory_router_1.default },
    { path: "/cart", route: cart_router_1.default },
    { path: "/orders", route: order_router_1.default },
    { path: "/payments", route: payment_router_1.default },
    { path: "/shipments", route: shipment_router_1.default },
    { path: "/coupons", route: coupon_router_1.default },
    { path: "/reviews", route: review_router_1.default },
    { path: "/analytics", route: analytics_router_1.default },
    { path: "/sync", route: sync_router_1.default },
    { path: "/settings", route: settings_router_1.default },
    { path: "/dashboard", route: dashboard_router_1.default },
    { path: "/reports", route: reports_router_1.default },
    { path: "/favorites", route: favorite_router_1.default },
    { path: "/faq", route: faq_router_1.default },
    { path: "/pages", route: pages_router_1.default },
];
defaultRoutes.forEach(({ path, route }) => {
    router.use(path, route);
});
exports.default = router;
//# sourceMappingURL=index.js.map