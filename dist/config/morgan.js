"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.successHandler = void 0;
const morgan_1 = __importDefault(require("morgan"));
const logger_1 = __importDefault(require("./logger"));
morgan_1.default.token("message", (_req, res) => res.locals.errorMessage || "");
const getIpFormat = () => process.env.NODE_ENV === "development" ? ":remote-addr - " : "";
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;
const successHandler = (0, morgan_1.default)(successResponseFormat, {
    skip: (_req, res) => res.statusCode >= 400,
    stream: { write: (message) => logger_1.default.info(message.trim()) },
});
exports.successHandler = successHandler;
const errorHandler = (0, morgan_1.default)(errorResponseFormat, {
    skip: (_req, res) => res.statusCode < 400,
    stream: { write: (message) => logger_1.default.error(message.trim()) },
});
exports.errorHandler = errorHandler;
//# sourceMappingURL=morgan.js.map