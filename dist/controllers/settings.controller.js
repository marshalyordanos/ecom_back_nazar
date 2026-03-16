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
exports.deleteSetting = exports.updateSetting = exports.setSetting = exports.getSettingByKey = exports.getSettings = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const settingsService = __importStar(require("../services/settings.service"));
exports.getSettings = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId || req.shopId;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const settings = await settingsService.getShopSettings(shopId);
    res.status(200).json(settings);
});
exports.getSettingByKey = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId || req.shopId;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const setting = await settingsService.getSettingByKey(shopId, req.params.key);
    res.status(200).json(setting);
});
exports.setSetting = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.body.shopId || req.shopId;
    const { key, value } = req.body;
    if (!shopId || !key)
        return res.status(400).json({ status: "fail", message: "shopId and key required" });
    const setting = await settingsService.setSetting(shopId, key, value ?? "");
    res.status(200).json(setting);
});
exports.updateSetting = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.body.shopId || req.query.shopId || req.shopId;
    const key = req.params.key;
    const { value } = req.body;
    if (!shopId || !key)
        return res.status(400).json({ status: "fail", message: "shopId and key required" });
    const setting = await settingsService.setSetting(shopId, key, value ?? "");
    res.status(200).json(setting);
});
exports.deleteSetting = (0, catchAsync_1.default)(async (req, res, _next) => {
    const shopId = req.query.shopId || req.shopId;
    if (!shopId)
        return res.status(400).json({ status: "fail", message: "shopId required" });
    const result = await settingsService.deleteSetting(shopId, req.params.key);
    res.status(200).json(result);
});
//# sourceMappingURL=settings.controller.js.map