"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// prisma.config.ts
const config_1 = require("prisma/config");
require("dotenv/config");
exports.default = (0, config_1.defineConfig)({
    schema: "prisma/schema.prisma", // path to your Prisma schema
    datasource: {
        url: (0, config_1.env)("DATABASE_URL"), // put your main DB URL here
        // optional: shadowDatabaseUrl: env("SHADOW_DATABASE_URL"),
    },
    migrations: {
        path: "prisma/migrations", // migrations directory
    },
});
//# sourceMappingURL=prisma.config.js.map