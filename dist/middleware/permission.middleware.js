"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requirePermission = requirePermission;
const appError_1 = __importDefault(require("../utils/appError"));
const rbacPermission_service_1 = require("../services/rbacPermission.service");
async function loadMergedPermissions(req) {
    if (!req.user) {
        throw new appError_1.default("Not authenticated", 401);
    }
    if (req.mergedPermissions) {
        return req.mergedPermissions;
    }
    const map = await (0, rbacPermission_service_1.getMergedPermissionsForUser)(req.user.id);
    req.mergedPermissions = map;
    return map;
}
function requirePermission(resource, action) {
    return async (req, _res, next) => {
        try {
            if (!req.user) {
                return next(new appError_1.default("Not authenticated", 401));
            }
            if (req.user.isSuperAdmin) {
                return next();
            }
            const map = await loadMergedPermissions(req);
            if ((0, rbacPermission_service_1.hasPermission)(map, resource, action)) {
                return next();
            }
            return next(new appError_1.default(`Forbidden: missing ${action} permission for resource "${resource}"`, 403));
        }
        catch (e) {
            next(e);
        }
    };
}
//# sourceMappingURL=permission.middleware.js.map