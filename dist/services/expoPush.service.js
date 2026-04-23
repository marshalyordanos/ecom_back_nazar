"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendExpoPushToUser = sendExpoPushToUser;
const expo_server_sdk_1 = require("expo-server-sdk");
const expoPushToken_service_1 = require("./expoPushToken.service");
let expoClient = null;
function getExpoClient() {
    if (!expoClient) {
        const accessToken = process.env.EXPO_ACCESS_TOKEN;
        expoClient = new expo_server_sdk_1.Expo(accessToken ? { accessToken } : {});
    }
    return expoClient;
}
async function sendExpoPushToUser(userId, payload) {
    const tokens = await (0, expoPushToken_service_1.listExpoPushTokensByUser)(userId);
    if (!tokens.length)
        return;
    const expo = getExpoClient();
    const messages = [];
    const tokenIdByValue = new Map();
    for (const row of tokens) {
        if (!expo_server_sdk_1.Expo.isExpoPushToken(row.token)) {
            await (0, expoPushToken_service_1.removeExpoPushTokenById)(row.id);
            continue;
        }
        tokenIdByValue.set(row.token, row.id);
        messages.push({
            to: row.token,
            sound: "default",
            title: payload.title,
            body: payload.message,
            data: payload.data,
        });
    }
    if (!messages.length)
        return;
    const chunks = expo.chunkPushNotifications(messages);
    for (const chunk of chunks) {
        let tickets = [];
        try {
            tickets = await expo.sendPushNotificationsAsync(chunk);
        }
        catch (error) {
            console.error("Expo push send error:", error);
            continue;
        }
        for (let i = 0; i < tickets.length; i += 1) {
            const ticket = tickets[i];
            const message = chunk[i];
            const token = typeof message.to === "string" ? message.to : null;
            if (!token || ticket.status !== "error")
                continue;
            const details = ticket.details;
            if (details?.error === "DeviceNotRegistered") {
                const tokenId = tokenIdByValue.get(token);
                if (tokenId) {
                    await (0, expoPushToken_service_1.removeExpoPushTokenById)(tokenId);
                }
            }
        }
    }
}
//# sourceMappingURL=expoPush.service.js.map