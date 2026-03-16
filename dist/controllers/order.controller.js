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
exports.createOrderAdmin = exports.listOrdersAdmin = exports.listOrderItems = exports.completeOrder = exports.cancelOrder = exports.getOrderById = exports.listMyOrders = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const orderService = __importStar(require("../services/order.service"));
const queryParser_1 = require("../utils/queryParser");
exports.listMyOrders = (0, catchAsync_1.default)(async (req, res, _next) => {
    const query = (0, queryParser_1.parseListQuery)(req);
    const result = await orderService.listUserOrders(req.user.id, query);
    res.status(200).json(result);
});
exports.getOrderById = (0, catchAsync_1.default)(async (req, res, _next) => {
    const userId = req.user ? req.user.id : undefined;
    const order = await orderService.getOrderById(req.params.id, userId);
    res.status(200).json(order);
});
exports.cancelOrder = (0, catchAsync_1.default)(async (req, res, _next) => {
    const order = await orderService.cancelOrder(req.params.id, req.user.id);
    res.status(200).json(order);
});
exports.completeOrder = (0, catchAsync_1.default)(async (req, res, _next) => {
    const order = await orderService.completeOrder(req.params.id);
    res.status(200).json(order);
});
exports.listOrderItems = (0, catchAsync_1.default)(async (req, res, _next) => {
    const items = await orderService.listOrderItems(req.params.id);
    res.status(200).json(items);
});
exports.listOrdersAdmin = (0, catchAsync_1.default)(async (req, res, _next) => {
    const query = (0, queryParser_1.parseListQuery)(req);
    const shopId = req.query.shopId;
    const result = await orderService.listOrdersAdmin({ ...query, shopId });
    res.status(200).json(result);
});
exports.createOrderAdmin = (0, catchAsync_1.default)(async (req, res, _next) => {
    const order = await orderService.createOrderAdmin(req.body);
    res.status(201).json(order);
});
//# sourceMappingURL=order.controller.js.map