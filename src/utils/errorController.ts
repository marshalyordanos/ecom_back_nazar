import { Request, Response, NextFunction } from "express";
import AppError from "./appError";

const friendlyField = (raw: string) =>
  raw
    .replace(/Id$/i, "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/_/g, " ")
    .trim()
    .replace(/^./, (s) => s.toUpperCase());

const firstMetaField = (meta: any): string | null => {
  if (Array.isArray(meta?.target) && meta.target.length > 0) {
    return String(meta.target[0]);
  }

  if (typeof meta?.field_name === "string" && meta.field_name.trim()) {
    return meta.field_name;
  }

  return null;
};

const parseFieldFromConstraint = (err: any): string | null => {
  const fromMessage =
    typeof err?.message === "string"
      ? err.message.match(/`[^`]*_([A-Za-z0-9]+)_fkey`/)
      : null;

  if (fromMessage?.[1]) {
    return fromMessage[1];
  }

  const adapterMessage =
    typeof err?.meta?.driverAdapterError?.cause?.originalMessage === "string"
      ? err.meta.driverAdapterError.cause.originalMessage
      : typeof err?.meta?.driverAdapterError?.message === "string"
        ? err.meta.driverAdapterError.message
        : null;

  const fromAdapter = adapterMessage?.match(/["`]([A-Za-z0-9_]+)_fkey["`]/);

  if (fromAdapter?.[1]) {
    const fieldPart = fromAdapter[1].split("_").pop();
    return fieldPart || null;
  }

  return null;
};

/**
 * Improved global error handler for Express.
 * Ensures Prisma, JWT, and generic errors are properly unwrapped and returned with correct status, code, and message.
 */
export const errHandling = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
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
      400,
    );
  }

  if (err?.code === "P2002") {
    const field = firstMetaField(err.meta) || "value";
    error = new AppError(`${friendlyField(field)} already exists`, 409);
  }

  if (err?.code === "P2003") {
    const field = firstMetaField(err.meta) || parseFieldFromConstraint(err);

    if (field) {
      error = new AppError(
        `${friendlyField(field)} is required or invalid`,
        400,
      );
    } else {
      error = new AppError("Related resource does not exist", 400);
    }
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
      409,
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
  if (
    err?.name === "JsonWebTokenError" ||
    err?.message === "Invalid or expired token"
  ) {
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
    res.status(error.statusCode || 500).json({
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
