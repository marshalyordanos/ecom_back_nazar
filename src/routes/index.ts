import express from "express";
import authRoute from "./auth.router";
import userRoute from "./user.router";
import roleRoute from "./role.router";
import permissionRoute from "./permission.router";
import shopRoute from "./shop.router";
import brandRoute from "./brand.router";
import categoryRoute from "./category.router";
import productRoute from "./product.router";
import inventoryRoute from "./inventory.router";
import cartRoute from "./cart.router";
import orderRoute from "./order.router";
import paymentRoute from "./payment.router";
import shipmentRoute from "./shipment.router";
import couponRoute from "./coupon.router";
import reviewRoute from "./review.router";
import analyticsRoute from "./analytics.router";
import syncRoute from "./sync.router";
import settingsRoute from "./settings.router";
import dashboardRoute from "./dashboard.router";
import reportsRoute from "./reports.router";
import favoriteRoute from "./favorite.router";
import faqRoute from "./faq.router";
import pagesRoute from "./pages.router";

const router = express.Router();

const defaultRoutes = [
  { path: "/auth", route: authRoute },
  { path: "/users", route: userRoute },
  { path: "/roles", route: roleRoute },
  { path: "/permissions", route: permissionRoute },
  { path: "/shops", route: shopRoute },
  { path: "/brands", route: brandRoute },
  { path: "/categories", route: categoryRoute },
  { path: "/products", route: productRoute },
  { path: "/inventory", route: inventoryRoute },
  { path: "/cart", route: cartRoute },
  { path: "/orders", route: orderRoute },
  { path: "/payments", route: paymentRoute },
  { path: "/shipments", route: shipmentRoute },
  { path: "/coupons", route: couponRoute },
  { path: "/reviews", route: reviewRoute },
  { path: "/analytics", route: analyticsRoute },
  { path: "/sync", route: syncRoute },
  { path: "/settings", route: settingsRoute },
  { path: "/dashboard", route: dashboardRoute },
  { path: "/reports", route: reportsRoute },
  { path: "/favorites", route: favoriteRoute },
  { path: "/faq", route: faqRoute },
  { path: "/pages", route: pagesRoute },
];

defaultRoutes.forEach(({ path, route }) => {
  router.use(path, route);
});

export default router;
