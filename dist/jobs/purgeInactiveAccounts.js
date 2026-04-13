"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startInactiveAccountPurge = startInactiveAccountPurge;
exports.stopInactiveAccountPurge = stopInactiveAccountPurge;
const auth_service_1 = require("../services/auth.service");
const PURGE_INTERVAL_MS = parseInt(process.env.INACTIVE_PURGE_INTERVAL_HOURS ?? "1", 10) *
    60 *
    60 *
    1000;
const PURGE_MAX_AGE_MS = parseInt(process.env.INACTIVE_PURGE_MAX_AGE_HOURS ?? "24", 10) *
    60 *
    60 *
    1000;
let timer = null;
async function run() {
    try {
        const count = await (0, auth_service_1.purgeStaleInactiveAccounts)(PURGE_MAX_AGE_MS);
        if (count > 0) {
            console.log(`[purge-inactive] Deleted ${count} unverified account(s) older than ${PURGE_MAX_AGE_MS / 3600000}h`);
        }
    }
    catch (err) {
        console.error("[purge-inactive] Error:", err);
    }
}
function startInactiveAccountPurge() {
    run();
    timer = setInterval(run, PURGE_INTERVAL_MS);
    console.log(`[purge-inactive] Scheduled every ${PURGE_INTERVAL_MS / 60000} min ` +
        `(max age ${PURGE_MAX_AGE_MS / 3600000}h)`);
}
function stopInactiveAccountPurge() {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
}
//# sourceMappingURL=purgeInactiveAccounts.js.map