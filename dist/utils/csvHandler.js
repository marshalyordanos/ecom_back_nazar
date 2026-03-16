"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveCSVFile = exports.convertToCSV = exports.parseCSVFromBuffer = exports.parseCSV = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const stream_1 = require("stream");
/**
 * Parse CSV file and return employee data
 */
const parseCSV = async (filePath) => {
    return new Promise((resolve, reject) => {
        const results = [];
        fs_1.default.createReadStream(filePath)
            .pipe((0, csv_parser_1.default)())
            .on('data', (data) => {
            // Validate required fields
            if (!data.email || !data.firstName || !data.lastName) {
                return;
            }
            results.push({
                firstName: data.firstName.trim(),
                lastName: data.lastName.trim(),
                email: data.email.trim().toLowerCase(),
                username: data.username?.trim() || data.email.trim().toLowerCase().split('@')[0],
            });
        })
            .on('end', () => {
            resolve(results);
        })
            .on('error', (error) => {
            reject(error);
        });
    });
};
exports.parseCSV = parseCSV;
/**
 * Parse CSV from buffer
 */
const parseCSVFromBuffer = async (buffer) => {
    return new Promise((resolve, reject) => {
        const results = [];
        const stream = stream_1.Readable.from(buffer.toString());
        stream
            .pipe((0, csv_parser_1.default)())
            .on('data', (data) => {
            // Validate required fields
            if (!data.email || !data.firstName || !data.lastName) {
                return;
            }
            results.push({
                firstName: data.firstName.trim(),
                lastName: data.lastName.trim(),
                email: data.email.trim().toLowerCase(),
                username: data.username?.trim() || data.email.trim().toLowerCase().split('@')[0],
            });
        })
            .on('end', () => {
            resolve(results);
        })
            .on('error', (error) => {
            reject(error);
        });
    });
};
exports.parseCSVFromBuffer = parseCSVFromBuffer;
/**
 * Convert employee data to CSV format
 */
const convertToCSV = (employees) => {
    const headers = ['firstName', 'lastName', 'email', 'username', 'status'];
    const rows = employees.map(emp => [
        emp.firstName,
        emp.lastName,
        emp.email,
        emp.username || '',
        emp.status || 'ACTIVE',
    ]);
    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
    ].join('\n');
    return csvContent;
};
exports.convertToCSV = convertToCSV;
/**
 * Save CSV file
 */
const saveCSVFile = (csvContent, fileName) => {
    const uploadsDir = path_1.default.join(__dirname, '..', '..', 'public', 'uploads');
    if (!fs_1.default.existsSync(uploadsDir)) {
        fs_1.default.mkdirSync(uploadsDir, { recursive: true });
    }
    const filePath = path_1.default.join(uploadsDir, `${fileName}-${Date.now()}.csv`);
    fs_1.default.writeFileSync(filePath, csvContent);
    return filePath;
};
exports.saveCSVFile = saveCSVFile;
//# sourceMappingURL=csvHandler.js.map