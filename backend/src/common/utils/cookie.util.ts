import { Response } from 'express';
import { Tokens } from 'src/auth/types';

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: 'lax' as const,
  maxAge: 15 * 60 * 1000, // 15 minutes for access token
};

const REFRESH_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: 'lax' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days for refresh token
};

export function setAuthCookies(res: Response, tokens: Tokens) {
  res.cookie('access_token', tokens.access_token, COOKIE_OPTIONS);
  res.cookie('refresh_token', tokens.refresh_token, REFRESH_COOKIE_OPTIONS);
}

export function clearAuthCookies(res: Response) {
  res.clearCookie('access_token', COOKIE_OPTIONS);
  res.clearCookie('refresh_token', REFRESH_COOKIE_OPTIONS);
}
