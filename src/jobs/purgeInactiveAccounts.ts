import { purgeStaleInactiveAccounts } from "../services/auth.service";

const PURGE_INTERVAL_MS =
  parseInt(process.env.INACTIVE_PURGE_INTERVAL_HOURS ?? "1", 10) *
  60 *
  60 *
  1000;

const PURGE_MAX_AGE_MS =
  parseInt(process.env.INACTIVE_PURGE_MAX_AGE_HOURS ?? "24", 10) *
  60 *
  60 *
  1000;

let timer: ReturnType<typeof setInterval> | null = null;

async function run() {
  try {
    const count = await purgeStaleInactiveAccounts(PURGE_MAX_AGE_MS);
    if (count > 0) {
      console.log(
        `[purge-inactive] Deleted ${count} unverified account(s) older than ${PURGE_MAX_AGE_MS / 3_600_000}h`,
      );
    }
  } catch (err) {
    console.error("[purge-inactive] Error:", err);
  }
}

export function startInactiveAccountPurge() {
  run();
  timer = setInterval(run, PURGE_INTERVAL_MS);
  console.log(
    `[purge-inactive] Scheduled every ${PURGE_INTERVAL_MS / 60_000} min ` +
      `(max age ${PURGE_MAX_AGE_MS / 3_600_000}h)`,
  );
}

export function stopInactiveAccountPurge() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}
