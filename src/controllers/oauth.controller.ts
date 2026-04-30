import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import * as oauthSocial from "../services/oauthSocial.service";

export const googleStart = catchAsync(async (req: Request, res: Response) => {
  const url = oauthSocial.buildGoogleStartRedirect(req.query);
  res.redirect(url);
});

export const googleCallback = catchAsync(async (req: Request, res: Response) => {
  const url = await oauthSocial.handleGoogleCallback(req.query);
  res.redirect(url);
});

export const facebookStart = catchAsync(async (req: Request, res: Response) => {
  const url = oauthSocial.buildFacebookStartRedirect(req.query);
  res.redirect(url);
});

export const facebookCallback = catchAsync(async (req: Request, res: Response) => {
  const url = await oauthSocial.handleFacebookCallback(req.query);
  res.redirect(url);
});

export const oauthComplete = catchAsync(async (req: Request, res: Response) => {
  const result = await oauthSocial.completeOAuthHandshake(req.body);
  res.status(200).json(result);
});
