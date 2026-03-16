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
exports.deletePermission = exports.updatePermission = exports.createPermission = exports.getPermissionById = exports.listPermissions = void 0;
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const permissionService = __importStar(require("../services/permission.service"));
const queryParser_1 = require("../utils/queryParser");
exports.listPermissions = (0, catchAsync_1.default)(async (req, res, _next) => {
    const query = (0, queryParser_1.parseListQuery)(req);
    const result = await permissionService.listPermissions(query);
    res.status(200).json(result);
});
exports.getPermissionById = (0, catchAsync_1.default)(async (req, res, _next) => {
    const permission = await permissionService.getPermissionById(req.params.id);
    res.status(200).json(permission);
});
exports.createPermission = (0, catchAsync_1.default)(async (req, res, _next) => {
    const permission = await permissionService.createPermission(req.body);
    res.status(201).json(permission);
});
exports.updatePermission = (0, catchAsync_1.default)(async (req, res, _next) => {
    const permission = await permissionService.updatePermission(req.params.id, req.body);
    res.status(200).json(permission);
});
exports.deletePermission = (0, catchAsync_1.default)(async (req, res, _next) => {
    const result = await permissionService.deletePermission(req.params.id);
    res.status(200).json(result);
});
//# sourceMappingURL=permission.controller.js.map