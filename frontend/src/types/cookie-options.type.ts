export interface CookieOptions {
    maxAge?: number;
    expires?: Date;
    secure?: boolean;
    sameSite?: boolean | "lax" | "strict" | "none" | undefined;
    path?: string;
    httpOnly?: boolean;
  }