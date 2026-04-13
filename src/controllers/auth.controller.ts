import { Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import * as authService from "../services/auth.service";
import type { AuthRequest } from "../middleware/auth.middleware";

export const register = catchAsync(async (req: AuthRequest, res: Response) => {
  const result = await authService.register({
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phone: req.body.phone,
  });
  return res.status(201).json(result);
});

export const createSuperAdmin = catchAsync(async (req: AuthRequest, res: Response) => {

  const result = await authService.adminRegister({
    email: "admin@gmail.com",
    password: "admin1111",
    firstName: "admin",
    lastName: "amdin",
    phone: "0987654321",
    
  });
  return res.status(201).json(result);
});

export const login = catchAsync(async (req: AuthRequest, res: Response) => {
  const result = await authService.login(req.body.emailPhone, req.body.password);
  return res.status(200).json(result);
});

export const logout = catchAsync(async (req: AuthRequest, res: Response) => {
  const refreshToken = req.body.refreshToken ?? req.headers["x-refresh-token"];
  const result = await authService.logout(refreshToken);
  return res.status(200).json(result);
});

export const refresh = catchAsync(async (req: AuthRequest, res: Response) => {
  const refreshToken = req.body.refreshToken ?? req.headers["x-refresh-token"];
  if (!refreshToken) {
    return res.status(400).json({ status: "fail", message: "Refresh token required" });
  }
  const result = await authService.refresh(refreshToken);
  return res.status(200).json(result);
});

export const forgotPassword = catchAsync(async (req: AuthRequest, res: Response) => {
  const result = await authService.forgotPassword(req.body.email);
  return res.status(200).json(result);
});

export const sendVerificationOtp = catchAsync(async (req: AuthRequest, res: Response) => {
  const result = await authService.sendVerificationOtp({
    email: req.body.email,
    phone: req.body.phone,
    otpType: req.body.otpType,
  });
  return res.status(200).json(result);
});

export const resendVerificationOtp = catchAsync(async (req: AuthRequest, res: Response) => {
  const result = await authService.resendVerificationOtp({
    email: req.body.email,
    phone: req.body.phone,
    otpType: req.body.otpType,
  });
  return res.status(200).json(result);
});

export const verifyAccount = catchAsync(async (req: AuthRequest, res: Response) => {
  const result = await authService.verifyAccount({
    email: req.body.email,
    phone: req.body.phone,
    otpType: req.body.otpType,
    otpCode: req.body.otpCode,
  });
  return res.status(200).json(result);
});

export const requestPasswordReset = catchAsync(async (req: AuthRequest, res: Response) => {
  const result = await authService.requestPasswordReset({
    email: req.body.email,
    phone: req.body.phone,
    otpType: req.body.otpType,
  });
  return res.status(200).json(result);
});

export const resendResetOtp = catchAsync(async (req: AuthRequest, res: Response) => {
  const result = await authService.resendResetOtp({
    email: req.body.email,
    phone: req.body.phone,
    otpType: req.body.otpType,
  });
  return res.status(200).json(result);
});

export const verifyResetOtp = catchAsync(async (req: AuthRequest, res: Response) => {
  const result = await authService.verifyResetOtp({
    email: req.body.email,
    phone: req.body.phone,
    otpType: req.body.otpType,
    otpCode: req.body.otpCode,
  });
  return res.status(200).json(result);
});

export const resetPassword = catchAsync(async (req: AuthRequest, res: Response) => {
  const { token, password } = req.body;
  if (!token || !password) {
    return res.status(400).json({ status: "fail", message: "Token and password required" });
  }
  const result = await authService.resetPassword(token, password);
  return res.status(200).json(result);
});

export const changePassword = catchAsync(async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ status: "fail", message: "Not authenticated" });
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ status: "fail", message: "currentPassword and newPassword required" });
  }
  const result = await authService.changePassword(req.user.id, currentPassword, newPassword);
  return res.status(200).json(result);
});
