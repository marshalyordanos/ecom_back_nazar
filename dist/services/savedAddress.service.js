"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listMySavedAddresses = listMySavedAddresses;
exports.addMySavedAddress = addMySavedAddress;
exports.deleteMySavedAddress = deleteMySavedAddress;
const prisma_1 = require("../lib/prisma");
const appError_1 = __importDefault(require("../utils/appError"));
async function listMySavedAddresses(userId) {
    return prisma_1.prisma.savedAddress.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
    });
}
async function addMySavedAddress(userId, data) {
    if (!data.label || !data.name || !data.phone || !data.addressLine1 || !data.city || !data.country) {
        throw new appError_1.default("Missing required address fields", 400);
    }
    return prisma_1.prisma.savedAddress.create({
        data: {
            userId,
            label: data.label,
            name: data.name,
            phone: data.phone,
            addressLine1: data.addressLine1,
            addressLine2: data.addressLine2 || undefined,
            city: data.city,
            state: data.state || undefined,
            country: data.country,
            postalCode: data.postalCode || undefined,
            latitude: data.latitude ?? undefined,
            longitude: data.longitude ?? undefined,
        },
    });
}
async function deleteMySavedAddress(userId, addressId) {
    // Using deleteMany avoids leaking existence info across users.
    const res = await prisma_1.prisma.savedAddress.deleteMany({ where: { id: addressId, userId } });
    if (res.count === 0)
        throw new appError_1.default("Saved address not found", 404);
    return { message: "Saved address deleted" };
}
//# sourceMappingURL=savedAddress.service.js.map