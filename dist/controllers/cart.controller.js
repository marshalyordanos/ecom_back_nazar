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
exports.checkout = exports.removeCartItem = exports.updateCartItem = exports.addToCart = exports.getCart = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const cartService = __importStar(require("../services/cart.service"));
exports.getCart = (0, catchAsync_1.default)(async (req, res, _next) => {
    const cart = await cartService.getOrCreateCart(req.user.id);
    res.status(200).json(cart);
});
exports.addToCart = (0, catchAsync_1.default)(async (req, res, _next) => {
    const { variantId, quantity, price } = req.body;
    if (!variantId || quantity == null || price == null) {
        return res.status(400).json({ status: "fail", message: "variantId, quantity, price required" });
    }
    const cart = await cartService.addItem(req.user.id, variantId, Number(quantity), Number(price));
    res.status(200).json(cart);
});
exports.updateCartItem = (0, catchAsync_1.default)(async (req, res, _next) => {
    const { quantity } = req.body;
    if (quantity == null)
        return res.status(400).json({ status: "fail", message: "quantity required" });
    const cart = await cartService.updateItemQuantity(req.user.id, req.params.id, Number(quantity));
    res.status(200).json(cart);
});
exports.removeCartItem = (0, catchAsync_1.default)(async (req, res, _next) => {
    const cart = await cartService.removeItem(req.user.id, req.params.id);
    res.status(200).json(cart);
});
exports.checkout = (0, catchAsync_1.default)(async (req, res, _next) => {
    const order = await cartService.checkout(req.user.id, req.body);
    res.status(201).json(order);
});
//# sourceMappingURL=cart.controller.js.map