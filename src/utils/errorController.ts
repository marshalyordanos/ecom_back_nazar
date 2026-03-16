import { Request, Response, NextFunction } from "express";
import AppError from "./appError";

/**
 * Improved global error handler for Express.
 * Ensures Prisma, JWT, and generic errors are properly unwrapped and returned with correct status, code, and message.
 */
export const errHandling = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
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
    error = new AppError(
      `Invalid input data${missingField ? `: ${missingField}` : ""}`,
      400
    );
  }

  if (err?.code === "P2002") {
    // Duplicated unique constraint (e.g. email)
    const field = Array.isArray(err.meta?.target)
      ? err.meta.target.join(", ")
      : String(err.meta?.target || "field");
    error = new AppError(
      `Duplicate field value: please use another ${field}`,
      409
    );
  }

  if (err?.code === "P2003") {
    // Foreign key/related record does not exist
    error = new AppError(
      "Invalid reference: related resource does not exist",
      400
    );
  }

  if (err?.code === "P2025") {
    // Record not found (e.g. update/delete non-existent record)
    error = new AppError("Requested resource not found", 404);
  }

  // ======================
  // Mongo / Mongoose Errors
  // ======================
  if (err?.name === "CastError") {
    error = new AppError(`Invalid ${err.path}: ${err.value}`, 400);
  }

  if (err?.code === 11000) {
    // Duplicate key
    const field =
      err.keyValue && typeof err.keyValue === "object"
        ? Object.keys(err.keyValue)[0]
        : "field";
    error = new AppError(
      `Duplicate field value: please use another ${field}`,
      409
    );
  }

  if (err?.name === "ValidationError") {
    const e = Object.values(err.errors).map((el: any) => el.message);
    error = new AppError(`Invalid input data. ${e.join(". ")}`, 400);
  }

  // =======================
  // JWT Errors
  // =======================
  if (err?.name === "TokenExpiredError") {
    error = new AppError("Token expired. Please log in again", 401);
  }
  if (err?.name === "JsonWebTokenError" || err?.message === "Invalid or expired token") {
    // Accept also hand-created tokens errors
    error = new AppError("Invalid or expired token", 401);
  }

  // =======================
  // Send Correct Error Response
  // =======================

  // Return operational AppError, or detailed error if in development, or safe error in production.
  if (
    error instanceof AppError ||
    error.isOperational === true ||
    error.isOprational === true // handle typo
  ) {
    console.log("error2222222222222", error?.statusCode);
    res.status(400).json({
      status: error.status || "fail",
      message: error.message,
      code: error.code || err.code || undefined,
    });
  } else {
    // For actual programmer/code bugs
    console.error("Uncaught error:", err);
    res.status(500).json({
      status: "error",
      message: "An unexpected server error occurred.",
    });
  }
};
