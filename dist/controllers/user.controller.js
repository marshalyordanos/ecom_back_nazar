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
exports.deleteMySavedAddress = exports.addMySavedAddress = exports.listMySavedAddresses = exports.getMyUnreadNotificationsCount = exports.markAllMyNotificationsRead = exports.markMyNotificationRead = exports.listMyNotifications = exports.deactivateUser = exports.updateUser = exports.listUsers = exports.getById = exports.updateMyPassword = exports.updateMe = exports.getMe = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const userService = __importStar(require("../services/user.service"));
const queryParser_1 = require("../utils/queryParser");
const notificationService = __importStar(require("../services/notification.service"));
const savedAddressService = __importStar(require("../services/savedAddress.service"));
exports.getMe = (0, catchAsync_1.default)(async (req, res, _next) => {
    const user = await userService.getMe(req.user.id);
    res.status(200).json(user);
});
exports.updateMe = (0, catchAsync_1.default)(async (req, res, _next) => {
    const user = await userService.updateMe(req.user.id, req.body);
    res.status(200).json(user);
});
exports.updateMyPassword = (0, catchAsync_1.default)(async (req, res, _next) => {
    const { newPassword } = req.body;
    if (!newPassword) {
        return res.status(400).json({ status: "fail", message: "newPassword required" });
    }
    const result = await userService.updatePassword(req.user.id, newPassword);
    res.status(200).json(result);
});
exports.getById = (0, catchAsync_1.default)(async (req, res, _next) => {
    const user = await userService.getById(req.params.id);
    res.status(200).json(user);
});
exports.listUsers = (0, catchAsync_1.default)(async (req, res, _next) => {
    const query = (0, queryParser_1.parseListQuery)(req);
    const roleId = typeof req.query.roleId === "string" ? req.query.roleId : undefined;
    const result = await userService.listUsers({ ...query, roleId }, Boolean(req.query.onlyUsers));
    res.status(200).json(result);
});
exports.updateUser = (0, catchAsync_1.default)(async (req, res, _next) => {
    const user = await userService.updateUser(req.params.id, req.body);
    res.status(200).json(user);
});
exports.deactivateUser = (0, catchAsync_1.default)(async (req, res, _next) => {
    const result = await userService.deactivateUser(req.params.id);
    res.status(200).json(result);
});
// ===============================
// CUSTOMER NOTIFICATIONS
// ===============================
exports.listMyNotifications = (0, catchAsync_1.default)(async (req, res, _next) => {
    const page = req.query.page ? Number(req.query.page) : undefined;
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : undefined;
    const data = await notificationService.listMyNotifications(req.user.id, {
        page,
        pageSize,
    });
    res.status(200).json(data);
});
exports.markMyNotificationRead = (0, catchAsync_1.default)(async (req, res, _next) => {
    const { id } = req.params;
    const data = await notificationService.markMyNotificationRead(req.user.id, id);
    res.status(200).json(data);
});
exports.markAllMyNotificationsRead = (0, catchAsync_1.default)(async (req, res, _next) => {
    const data = await notificationService.markAllMyNotificationsRead(req.user.id);
    res.status(200).json(data);
});
exports.getMyUnreadNotificationsCount = (0, catchAsync_1.default)(async (req, res, _next) => {
    const count = await notificationService.getUnreadCount(req.user.id);
    res.status(200).json({ unreadCount: count });
});
// ===============================
// SAVED ADDRESSES (PER USER)
// ===============================
exports.listMySavedAddresses = (0, catchAsync_1.default)(async (req, res, _next) => {
    const data = await savedAddressService.listMySavedAddresses(req.user.id);
    res.status(200).json({ data });
});
exports.addMySavedAddress = (0, catchAsync_1.default)(async (req, res, _next) => {
    const data = await savedAddressService.addMySavedAddress(req.user.id, req.body);
    res.status(201).json({ data });
});
exports.deleteMySavedAddress = (0, catchAsync_1.default)(async (req, res, _next) => {
    const { id } = req.params;
    const data = await savedAddressService.deleteMySavedAddress(req.user.id, id);
    res.status(200).json(data);
});
//# sourceMappingURL=user.controller.js.map