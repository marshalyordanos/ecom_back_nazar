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
exports.addMovement = exports.getInventoryById = exports.listMovements = exports.updateInventory = exports.getByVariantId = exports.listInventory = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const inventoryService = __importStar(require("../services/inventory.service"));
const queryParser_1 = require("../utils/queryParser");
exports.listInventory = (0, catchAsync_1.default)(async (req, res, _next) => {
    const query = (0, queryParser_1.parseListQuery)(req);
    const result = await inventoryService.listInventory(query);
    res.status(200).json(result);
});
exports.getByVariantId = (0, catchAsync_1.default)(async (req, res, _next) => {
    const inventories = await inventoryService.getInventoryByVariantId(req.params.variantId);
    res.status(200).json(inventories);
});
exports.updateInventory = (0, catchAsync_1.default)(async (req, res, _next) => {
    const { locationId } = req.body;
    if (!locationId)
        return res.status(400).json({ status: "fail", message: "locationId required" });
    const inventory = await inventoryService.updateInventoryQuantity(req.params.variantId, locationId, req.body);
    res.status(200).json(inventory);
});
exports.listMovements = (0, catchAsync_1.default)(async (req, res, _next) => {
    const query = (0, queryParser_1.parseListQuery)(req);
    const result = await inventoryService.listMovements(query);
    res.status(200).json(result);
});
exports.getInventoryById = (0, catchAsync_1.default)(async (req, res, _next) => {
    const inventory = await inventoryService.getInventoryById(req.params.id);
    res.status(200).json(inventory);
});
exports.addMovement = (0, catchAsync_1.default)(async (req, res, _next) => {
    const { variantId, locationId, type, quantity, referenceId } = req.body;
    if (!variantId || !locationId || !type || quantity == null) {
        return res.status(400).json({ status: "fail", message: "variantId, locationId, type, quantity required" });
    }
    const movement = await inventoryService.addMovement({
        variantId,
        locationId,
        type,
        quantity: Number(quantity),
        referenceId,
    });
    res.status(201).json(movement);
});
//# sourceMappingURL=inventory.controller.js.map