"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errHandling = void 0;
const appError_1 = __importDefault(require("./appError"));
/**
 * Improved global error handler for Express.
 * Ensures Prisma, JWT, and generic errors are properly unwrapped and returned with correct status, code, and message.
 */
const errHandling = (err, _req, res, _next) => {
    // Log original error for debugging
    console.log("********** ERROR NAME:", err.name);
    console.log("********** ERROR CODE:", err.code);
    console.log("********** ERROR FULL:", err);
    // Always show the actual error returned by AppError and not clone 
    // (because property copying is shallow and misses prototype/isOperational)
    let error = err;
    // Ensure some properties
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "error";
    // ======================
    // Prisma Errors
    // ======================
    if (err?.name === "PrismaClientValidationError") {
        // Usually due to missing or bad arg
        const match = err.message?.match(/Argument `(.+?)` is missing/);
        const missingField = match ? match[1] : null;
        error = new appError_1.default(`Invalid input data${missingField ? `: ${missingField}` : ""}`, 400);
    }
    if (err?.code === "P2002") {
        // Duplicated unique constraint (e.g. email)
        const field = Array.isArray(err.meta?.target)
            ? err.meta.target.join(", ")
            : String(err.meta?.target || "field");
        error = new appError_1.default(`Duplicate field value: please use another ${field}`, 409);
    }
    if (err?.code === "P2003") {
        // Foreign key/related record does not exist
        error = new appError_1.default("Invalid reference: related resource does not exist", 400);
    }
    if (err?.code === "P2025") {
        // Record not found (e.g. update/delete non-existent record)
        error = new appError_1.default("Requested resource not found", 404);
    }
    // ======================
    // Mongo / Mongoose Errors
    // ======================
    if (err?.name === "CastError") {
        error = new appError_1.default(`Invalid ${err.path}: ${err.value}`, 400);
    }
    if (err?.code === 11000) {
        // Duplicate key
        const field = err.keyValue && typeof err.keyValue === "object"
            ? Object.keys(err.keyValue)[0]
            : "field";
        error = new appError_1.default(`Duplicate field value: please use another ${field}`, 409);
    }
    if (err?.name === "ValidationError") {
        const e = Object.values(err.errors).map((el) => el.message);
        error = new appError_1.default(`Invalid input data. ${e.join(". ")}`, 400);
    }
    // =======================
    // JWT Errors
    // =======================
    if (err?.name === "TokenExpiredError") {
        error = new appError_1.default("Token expired. Please log in again", 401);
    }
    if (err?.name === "JsonWebTokenError" || err?.message === "Invalid or expired token") {
        // Accept also hand-created tokens errors
        error = new appError_1.default("Invalid or expired token", 401);
    }
    // =======================
    // Send Correct Error Response
    // =======================
    // Return operational AppError, or detailed error if in development, or safe error in production.
    if (error instanceof appError_1.default ||
        error.isOperational === true ||
        error.isOprational === true // handle typo
    ) {
        console.log("error2222222222222", error?.statusCode);
        res.status(400).json({
            status: error.status || "fail",
            message: error.message,
            code: error.code || err.code || undefined,
        });
    }
    else {
        // For actual programmer/code bugs
        console.error("Uncaught error:", err);
        res.status(500).json({
            status: "error",
            message: "An unexpected server error occurred.",
        });
    }
};
exports.errHandling = errHandling;
//# sourceMappingURL=errorController.js.map