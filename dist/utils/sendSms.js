"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSms = sendSms;
const axios_1 = __importDefault(require("axios"));
/**
 * Sends an SMS message using the AfroMessage API
 * @param message - The text message to send
 * @param phone - The recipient phone number
 */
async function sendSms(message, phone) {
    const baseUrl = 'https://api.afromessage.com/api/send';
    //   const token = process.env.AFRO_MESSAGE_API_KEY;
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJpZGVudGlmaWVyIjoiNjR5YmVZUFBtc2UwUmhxT2p1b3d2TnNnZU42aVAycGoiLCJleHAiOjE5MjE2MDQ5MjIsImlhdCI6MTc2MzgzODUyMiwianRpIjoiYzUzODAzY2ItZDg4Mi00OTEyLTk3OTctOTgzNjMzOWUxMjljIn0.IW6JP9BJ2tYC_udqiInDb5VY5SMVuXBxGD1XdIA1wBA';
    if (!token) {
        console.error('AFRO_MESSAGE_API_KEY is not defined in environment variables.');
        return;
    }
    const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
    const body = {
        to: phone,
        message,
        sender: 'afridatai', // Optional field — uncomment if needed
    };
    try {
        const result = await axios_1.default.post(baseUrl, body, { headers });
        if (result.status === 200) {
            const json = result.data;
            if (json.acknowledge === 'success') {
                console.log('✅ SMS sent successfully via AfroMessage');
            }
            else {
                console.error('⚠️ AfroMessage API responded with error:', json);
            }
        }
        else {
            console.error(`❌ HTTP error: ${result.status} - ${JSON.stringify(result.data)}`);
        }
    }
    catch (error) {
        console.error('🚨 Error sending SMS:', error?.response?.data || error.message || error);
    }
}
//# sourceMappingURL=sendSms.js.map