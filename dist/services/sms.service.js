"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOTPViaAfroMessage = sendOTPViaAfroMessage;
exports.verifyOTPViaAfroMessage = verifyOTPViaAfroMessage;
const appError_1 = __importDefault(require("../utils/appError"));
const AFRO_BASE_URL = "https://api.afromessage.com/api";
function getAfroConfig() {
    const token = process.env.AFRO_MESSAGE_TOKEN || process.env.AFRO_SMS_TOKEN;
    const sender = process.env.AFRO_MESSAGE_SENDER || process.env.AFRO_SMS_SENDER;
    const identifier = process.env.AFRO_MESSAGE_IDENTIFIER || process.env.AFRO_SMS_IDENTIFIER_ID;
    if (!token || !identifier) {
        throw new appError_1.default("AfroMessage credentials are not configured", 500);
    }
    return { token, sender, identifier };
}
function toObject(value) {
    return value && typeof value === "object" ? value : null;
}
function isAcknowledgeSuccess(payload) {
    const obj = toObject(payload);
    if (!obj)
        return false;
    const acknowledge = obj.acknowledge;
    return typeof acknowledge === "string" && acknowledge.toLowerCase() === "success";
}
function extractResponseNode(payload) {
    const obj = toObject(payload);
    if (!obj)
        return null;
    return toObject(obj.response);
}
function extractVerificationId(payload) {
    const p = toObject(payload);
    if (!p)
        return null;
    const direct = p.verificationId;
    if (typeof direct === "string")
        return direct;
    const response = toObject(p.response);
    const fromResponse = response?.verificationId;
    if (typeof fromResponse === "string")
        return fromResponse;
    const data = toObject(p.data);
    const fromData = data?.verificationId;
    if (typeof fromData === "string")
        return fromData;
    return null;
}
function extractProviderError(payload) {
    const obj = toObject(payload);
    if (!obj)
        return null;
    const response = extractResponseNode(payload);
    const responseErrors = response?.errors;
    if (Array.isArray(responseErrors)) {
        const texts = responseErrors
            .filter((value) => typeof value === "string")
            .map((value) => value.trim())
            .filter(Boolean);
        if (texts.length > 0)
            return texts.join("; ");
    }
    const candidates = [
        response?.error,
        response?.message,
        response?.status,
        obj.error,
        obj.message,
        obj.status,
    ];
    for (const item of candidates) {
        if (typeof item === "string" && item.trim())
            return item.trim();
    }
    return null;
}
function parseJsonSafely(text) {
    if (!text.trim())
        return null;
    try {
        return JSON.parse(text);
    }
    catch {
        return null;
    }
}
function bodySnippet(text) {
    const normalized = text.replace(/\s+/g, " ").trim();
    if (!normalized)
        return "";
    const maxLen = 180;
    return normalized.length > maxLen
        ? `${normalized.slice(0, maxLen)}...`
        : normalized;
}
async function sendOTPViaAfroMessage(to) {
    const { token, sender, identifier } = getAfroConfig();
    const url = new URL(`${AFRO_BASE_URL}/challenge`);
    url.searchParams.set("from", identifier);
    if (sender) {
        url.searchParams.set("sender", sender);
    }
    url.searchParams.set("to", to);
    url.searchParams.set("len", "6");
    url.searchParams.set("t", "0");
    url.searchParams.set("ttl", "300");
    const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    });
    const rawBody = await response.text().catch(() => "");
    const payload = parseJsonSafely(rawBody);
    const acknowledged = isAcknowledgeSuccess(payload);
    const verificationId = extractVerificationId(payload);
    if (!response.ok || !acknowledged || !verificationId) {
        const providerError = extractProviderError(payload);
        const fallbackReason = bodySnippet(rawBody);
        const reason = providerError || fallbackReason;
        const reasonText = reason ? `: ${reason}` : "";
        const statusCode = !response.ok || acknowledged
            ? 502 // network/provider outage or unexpected success payload shape
            : 400; // provider rejected request (e.g. invalid/unverified recipient)
        throw new appError_1.default(`Failed to send OTP via AfroMessage (HTTP ${response.status} ${response.statusText})${reasonText}`, statusCode);
    }
    return { verificationId };
}
async function verifyOTPViaAfroMessage(to, verificationId, code) {
    const { token } = getAfroConfig();
    const url = new URL(`${AFRO_BASE_URL}/verify`);
    url.searchParams.set("to", to);
    url.searchParams.set("vc", verificationId);
    url.searchParams.set("code", code);
    const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    });
    if (!response.ok)
        return false;
    const rawBody = await response.text().catch(() => "");
    const payload = parseJsonSafely(rawBody);
    if (!payload || typeof payload !== "object")
        return true;
    if (!isAcknowledgeSuccess(payload))
        return false;
    const objectPayload = payload;
    if (typeof objectPayload.success === "boolean")
        return objectPayload.success;
    if (typeof objectPayload.verified === "boolean")
        return objectPayload.verified;
    if (typeof objectPayload.status === "string") {
        const status = objectPayload.status.toLowerCase();
        return status === "success" || status === "verified" || status === "ok";
    }
    const responseNode = extractResponseNode(payload);
    if (responseNode) {
        if (typeof responseNode.success === "boolean")
            return responseNode.success;
        if (typeof responseNode.verified === "boolean")
            return responseNode.verified;
        if (typeof responseNode.status === "string") {
            const status = responseNode.status.toLowerCase();
            return status === "success" || status === "verified" || status === "ok";
        }
    }
    return true;
}
//# sourceMappingURL=sms.service.js.map