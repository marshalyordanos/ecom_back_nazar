import { PrismaClient } from "../src/generated/prisma/client";

const prisma = new PrismaClient();

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

  const permissions = [
    { resource: "users", description: "Manage users" },
    { resource: "products", description: "Manage products" },
    { resource: "orders", description: "Manage orders" },
    { resource: "shops", description: "Manage shops" },
  ];
  for (const p of permissions) {
    await prisma.permission.upsert({
      where: { resource: p.resource },
      create: p,
      update: {},
    });
  }

  const usersPerm = await prisma.permission.findUnique({ where: { resource: "users" } });
  if (usersPerm) {
    await prisma.rolePermission.upsert({
      where: { roleId_permissionId: { roleId: adminRole.id, permissionId: usersPerm.id } },
      create: {
        roleId: adminRole.id,
        permissionId: usersPerm.id,
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

  console.log("Seeded roles:", userRole.name, adminRole.name);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
