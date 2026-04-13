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
exports.removeFavorite = exports.addFavorite = exports.listFavorites = exports.listFavoriteIds = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const favoriteService = __importStar(require("../services/favorite.service"));
const queryParser_1 = require("../utils/queryParser");
exports.listFavoriteIds = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId;
    const result = await favoriteService.listFavoriteIds(req.user.id, shopId);
    res.status(200).json(result);
});
exports.listFavorites = (0, catchAsync_1.default)(async (req, res, _next) => {
    const query = (0, queryParser_1.parseListQuery)(req);
    const shopId = req.query.shopId;
    const result = await favoriteService.listFavorites(req.user.id, shopId, query.page, query.pageSize);
    res.status(200).json(result);
});
exports.addFavorite = (0, catchAsync_1.default)(async (req, res, _next) => {
    const result = await favoriteService.addFavorite(req.user.id, req.params.productId);
    res.status(201).json(result);
});
exports.removeFavorite = (0, catchAsync_1.default)(async (req, res, _next) => {
    const result = await favoriteService.removeFavorite(req.user.id, req.params.productId);
    res.status(200).json(result);
});
//# sourceMappingURL=favorite.controller.js.map