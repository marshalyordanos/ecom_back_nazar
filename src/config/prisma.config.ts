// prisma.config.ts
import { defineConfig, env } from "prisma/config";
import "dotenv/config";

export default defineConfig({
  schema: "prisma/schema.prisma",   // path to your Prisma schema
  datasource: {
    url: env("DATABASE_URL"),        // put your main DB URL here
    // optional: shadowDatabaseUrl: env("SHADOW_DATABASE_URL"),
  },
  migrations: {
    path: "prisma/migrations",       // migrations directory
  },
});
