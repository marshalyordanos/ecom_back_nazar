import { PrismaClient } from "../src/generated/prisma/client";

const prisma = new PrismaClient();

const RESOURCES: { resource: string; description: string }[] = [
  { resource: "users", description: "Manage users" },
  { resource: "products", description: "Manage products" },
  { resource: "orders", description: "Manage orders" },
  { resource: "shops", description: "Manage shops" },
  { resource: "shop_sales", description: "Sales recorded from shop" },
  { resource: "inventory", description: "Inventory" },
  { resource: "payments", description: "Payments" },
  { resource: "shipments", description: "Shipments" },
  { resource: "categories", description: "Categories" },
  { resource: "brands", description: "Brands" },
  { resource: "coupons", description: "Coupons" },
  { resource: "reviews", description: "Reviews" },
  { resource: "roles", description: "Roles" },
  { resource: "permissions", description: "Permissions" },
  { resource: "analytics", description: "Analytics" },
  { resource: "sync", description: "Sync" },
  { resource: "settings", description: "Settings" },
  { resource: "reports", description: "Reports" },
  { resource: "statistics", description: "Statistics" },
];

async function main() {
  const userRole = await prisma.role.upsert({
    where: { name: "user" },
    create: { name: "user", description: "Customer role" },
    update: {},
  });
  const adminRole = await prisma.role.upsert({
    where: { name: "admin" },
    create: { name: "admin", description: "Administrator" },
    update: {},
  });

  for (const p of RESOURCES) {
    await prisma.permission.upsert({
      where: { resource: p.resource },
      create: p,
      update: { description: p.description },
    });
  }

  const allPerms = await prisma.permission.findMany({ where: { resource: { in: RESOURCES.map((r) => r.resource) } } });

  for (const perm of allPerms) {
    await prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: adminRole.id, permissionId: perm.id } },
      create: {
        roleId: adminRole.id,
        permissionId: perm.id,
        createAction: true,
        readAction: true,
        updateAction: true,
        deleteAction: true,
      },
      update: {
        createAction: true,
        readAction: true,
        updateAction: true,
        deleteAction: true,
      },
    });
  }

  console.log("Seeded roles:", userRole.name, adminRole.name, "permissions:", allPerms.length);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
