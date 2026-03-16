"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.resetPassword = exports.forgotPassword = exports.refresh = exports.logout = exports.login = exports.register = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const authService = __importStar(require("../services/auth.service"));
exports.register = (0, catchAsync_1.default)(async (req, res) => {
    const result = await authService.register({
        email: req.body.email,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
    });
    return res.status(201).json(result);
});
exports.login = (0, catchAsync_1.default)(async (req, res) => {
    const result = await authService.login(req.body.emailPhone, req.body.password);
    return res.status(200).json(result);
});
exports.logout = (0, catchAsync_1.default)(async (req, res) => {
    const refreshToken = req.body.refreshToken ?? req.headers["x-refresh-token"];
    const result = await authService.logout(refreshToken);
    return res.status(200).json(result);
});
exports.refresh = (0, catchAsync_1.default)(async (req, res) => {
    const refreshToken = req.body.refreshToken ?? req.headers["x-refresh-token"];
    if (!refreshToken) {
        return res.status(400).json({ status: "fail", message: "Refresh token required" });
    }
    const result = await authService.refresh(refreshToken);
    return res.status(200).json(result);
});
exports.forgotPassword = (0, catchAsync_1.default)(async (req, res) => {
    const result = await authService.forgotPassword(req.body.email);
    return res.status(200).json(result);
});
exports.resetPassword = (0, catchAsync_1.default)(async (req, res) => {
    const { token, password } = req.body;
    if (!token || !password) {
        return res.status(400).json({ status: "fail", message: "Token and password required" });
    }
    const result = await authService.resetPassword(token, password);
    return res.status(200).json(result);
});
exports.changePassword = (0, catchAsync_1.default)(async (req, res) => {
    if (!req.user)
        return res.status(401).json({ status: "fail", message: "Not authenticated" });
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
        return res.status(400).json({ status: "fail", message: "currentPassword and newPassword required" });
    }
    const result = await authService.changePassword(req.user.id, currentPassword, newPassword);
    return res.status(200).json(result);
});
//# sourceMappingURL=auth.controller.js.map