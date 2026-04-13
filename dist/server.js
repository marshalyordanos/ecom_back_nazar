"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const socket_1 = require("./lib/socket");
const purgeInactiveAccounts_1 = require("./jobs/purgeInactiveAccounts");
dotenv_1.default.config();
const server = http_1.default.createServer(app_1.default);
(0, socket_1.initSocket)(server);
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log("Server running on port " + PORT);
    (0, purgeInactiveAccounts_1.startInactiveAccountPurge)();
});
//# sourceMappingURL=server.js.map