"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getShopSettings = getShopSettings;
exports.getSettingByKey = getSettingByKey;
exports.setSetting = setSetting;
exports.deleteSetting = deleteSetting;
exports.setMultipleSettings = setMultipleSettings;
const prisma_1 = require("../lib/prisma");
const appError_1 = __importDefault(require("../utils/appError"));
async function getShopSettings(shopId) {
    const settings = await prisma_1.prisma.shopSetting.findMany({
        where: { shopId },
    });
    return settings.reduce((acc, s) => {
        acc[s.key] = s.value;
        return acc;
    }, {});
}
async function getSettingByKey(shopId, key) {
    const setting = await prisma_1.prisma.shopSetting.findUnique({
        where: { shopId_key: { shopId, key } },
    });
    if (!setting)
        throw new appError_1.default("Setting not found", 404);
    return setting;
}
async function setSetting(shopId, key, value) {
    const setting = await prisma_1.prisma.shopSetting.upsert({
        where: { shopId_key: { shopId, key } },
        create: { shopId, key, value },
        update: { value },
    });
    return setting;
}
async function deleteSetting(shopId, key) {
    await prisma_1.prisma.shopSetting.delete({
        where: { shopId_key: { shopId, key } },
    });
    return { message: "Setting deleted successfully" };
}
async function setMultipleSettings(shopId, data) {
    const result = [];
    for (const [key, value] of Object.entries(data)) {
        const s = await prisma_1.prisma.shopSetting.upsert({
            where: { shopId_key: { shopId, key } },
            create: { shopId, key, value },
            update: { value },
        });
        result.push(s);
    }
    return result;
}
//# sourceMappingURL=settings.service.js.map