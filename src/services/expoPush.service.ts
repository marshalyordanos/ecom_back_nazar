import { Expo, ExpoPushMessage, ExpoPushTicket } from "expo-server-sdk";
import {
  listExpoPushTokensByUser,
  removeExpoPushTokenById,
} from "./expoPushToken.service";

type PushPayload = {
  title: string;
  message: string;
  data?: Record<string, unknown>;
};

let expoClient: Expo | null = null;

function getExpoClient() {
  if (!expoClient) {
    const accessToken = process.env.EXPO_ACCESS_TOKEN;
    expoClient = new Expo(accessToken ? { accessToken } : {});
  }
  return expoClient;
}

export async function sendExpoPushToUser(userId: string, payload: PushPayload) {
  const tokens = await listExpoPushTokensByUser(userId);
  if (!tokens.length) return;

  const expo = getExpoClient();
  const messages: ExpoPushMessage[] = [];
  const tokenIdByValue = new Map<string, string>();

  for (const row of tokens) {
    if (!Expo.isExpoPushToken(row.token)) {
      await removeExpoPushTokenById(row.id);
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

  if (!messages.length) return;

  const chunks = expo.chunkPushNotifications(messages);
  for (const chunk of chunks) {
    let tickets: ExpoPushTicket[] = [];
    try {
      tickets = await expo.sendPushNotificationsAsync(chunk);
    } catch (error) {
      console.error("Expo push send error:", error);
      continue;
    }

    for (let i = 0; i < tickets.length; i += 1) {
      const ticket = tickets[i];
      const message = chunk[i];
      const token = typeof message.to === "string" ? message.to : null;

      if (!token || ticket.status !== "error") continue;
      const details = ticket.details as { error?: string } | undefined;
      if (details?.error === "DeviceNotRegistered") {
        const tokenId = tokenIdByValue.get(token);
        if (tokenId) {
          await removeExpoPushTokenById(tokenId);
        }
      }
    }
  }
}
