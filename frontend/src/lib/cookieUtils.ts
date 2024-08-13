"use server";
import { cookies } from "next/headers";

import { CookieOptions } from "@/types/cookie-options.type";

export async function setCookies(cookieData: string[]) {
  cookieData &&
    cookieData.forEach((cookie: string) => {
      const parts = cookie.split(";");
      const [cookieNameValue] = parts[0].split(",");
      const [cookieName, cookieValue] = cookieNameValue.split("=");

      const options: CookieOptions = {};
      parts.forEach((part: string) => {
        const [key, value] = part.trim().split("=");
        switch (key.toLowerCase()) {
          case "max-age":
            options.maxAge = parseInt(value, 10);
            break;
          case "expires":
            options.expires = new Date(value);
            break;
          case "secure":
            options.secure = true;
            break;
          case "samesite":
            options.sameSite = value as "lax" | "strict" | "none" | undefined;
            break;
          case "path":
            options.path = value;
            break;
          case "httponly":
            options.httpOnly = true;
            break;
        }
      });

      const cookieStore = cookies();
      cookieStore.set(cookieName, cookieValue, options);
    });
}

export async function getTokenFromCookies(cookieName: string) {
  const cookieStore = cookies();
  return cookieStore.get(cookieName)?.value || null;
}

export async function removeCookies(cookieNames: string[]) {
  const cookieStore = cookies();
  cookieNames.forEach((cookieName) => {
    cookieStore.delete(cookieName);
  });
}