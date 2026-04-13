"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTP_MAX_ATTEMPTS = exports.OTP_COOLDOWN_SECONDS = exports.OTP_EXPIRY_SECONDS = void 0;
exports.generateOTP = generateOTP;
exports.hashOTP = hashOTP;
exports.verifyOTP = verifyOTP;
const crypto_1 = __importDefault(require("crypto"));
exports.OTP_EXPIRY_SECONDS = 300;
exports.OTP_COOLDOWN_SECONDS = 60;
exports.OTP_MAX_ATTEMPTS = 5;
function generateOTP(length = 6) {
    const normalizedLength = Math.min(Math.max(length, 4), 6);
    let otp = "";
    for (let i = 0; i < normalizedLength; i += 1) {
        otp += crypto_1.default.randomInt(0, 10).toString();
    }
    return otp;
}
function hashOTP(otp) {
    const secret = process.env.OTP_HASH_SECRET || process.env.JWT_SECRET || "otp-default-secret";
    return crypto_1.default.createHash("sha256").update(`${secret}:${otp}`).digest("hex");
}
function verifyOTP(rawOtp, hashedOtp) {
    const computed = hashOTP(rawOtp);
    const computedBuffer = Buffer.from(computed, "utf-8");
    const hashBuffer = Buffer.from(hashedOtp, "utf-8");
    if (computedBuffer.length !== hashBuffer.length)
        return false;
    return crypto_1.default.timingSafeEqual(computedBuffer, hashBuffer);
}
//# sourceMappingURL=otp.service.js.map