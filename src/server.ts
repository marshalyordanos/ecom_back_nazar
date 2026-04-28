import http from "http";
import app from "./app";
import dotenv from "dotenv";
import { initSocket } from "./lib/socket";
import { startInactiveAccountPurge } from "./jobs/purgeInactiveAccounts";
import { ensureDefaultPermissions } from "./services/rbacPermission.service";

dotenv.config();

async function start() {
  try {
    const { count } = await ensureDefaultPermissions();
    if (count > 0) {
      console.log(`[permissions] Created ${count} missing permission row(s).`);
    }
  } catch (err) {
    console.error("[permissions] Failed to ensure default permissions:", err);
  }

  const server = http.createServer(app);

  initSocket(server);

  const PORT = process.env.PORT || 8000;

  server.listen(PORT, () => {
    console.log("Server running on port " + PORT);
    startInactiveAccountPurge();
  });
}

void start();
