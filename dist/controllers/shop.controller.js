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
exports.addSalesFromShop = exports.deleteLocation = exports.updateLocation = exports.addShopLocation = exports.listShopLocations = exports.createOrUpdateShop = exports.updateShop = exports.getShopById = exports.listShops = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const shopService = __importStar(require("../services/shop.service"));
const queryParser_1 = require("../utils/queryParser");
exports.listShops = (0, catchAsync_1.default)(async (req, res, _next) => {
    const query = (0, queryParser_1.parseListQuery)(req);
    const result = await shopService.listShops(query);
    res.status(200).json(result);
});
exports.getShopById = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shop = await shopService.getShopById(req.params.id);
    res.status(200).json(shop);
});
exports.updateShop = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shop = await shopService.updateShop(req.params.id, req.body, req.file);
    res.status(200).json(shop);
});
// Controller for createOrUpdateShop
exports.createOrUpdateShop = (0, catchAsync_1.default)(async (req, res, _next) => {
    // createOrUpdateShop expects all data (req.body) and a file (req.file), if available
    const shop = await shopService.createOrUpdateShop(req.body, req.file);
    res.status(200).json(shop);
});
exports.listShopLocations = (0, catchAsync_1.default)(async (req, res, _next) => {
    const locations = await shopService.listShopLocations(req.params.id);
    res.status(200).json(locations);
});
exports.addShopLocation = (0, catchAsync_1.default)(async (req, res, _next) => {
    const location = await shopService.addShopLocation(req.params.id, req.body);
    res.status(201).json(location);
});
exports.updateLocation = (0, catchAsync_1.default)(async (req, res, _next) => {
    const location = await shopService.updateLocation(req.params.locationId, req.body);
    res.status(200).json(location);
});
exports.deleteLocation = (0, catchAsync_1.default)(async (req, res, _next) => {
    const result = await shopService.deleteLocation(req.params.locationId);
    res.status(200).json(result);
});
exports.addSalesFromShop = (0, catchAsync_1.default)(async (req, res, _next) => {
    const sales = await shopService.addSalesFromShop({ locationId: req.body.locationId, variantId: req.body.variantId, quantity: req.body.quantity });
    res.status(201).json(sales);
});
//# sourceMappingURL=shop.controller.js.map