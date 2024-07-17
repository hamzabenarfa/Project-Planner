"use server";

import { cookies } from "next/headers";
import {jwtDecode} from "jwt-decode";

export default async function loginAction(_prevState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const res = await fetch("http://localhost:4000/auth/local/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const json = await res.json();

  if (res.ok) {
    setAuthCookie(res);
    return;
  } else {
    return json.error;
  }
}

const setAuthCookie = (response:Response) => {
  const setCookieHeader = response.headers.get("Set-Cookie");

  if (!setCookieHeader) return;

  const cookiesArray = setCookieHeader.split(", ");

  let accessToken = "";
  let refreshToken = "";

  cookiesArray.forEach((cookie) => {
    if (cookie.startsWith("access_token=")) {
      accessToken = cookie.substring(
        "access_token=".length,
        cookie.indexOf(";")
      );
    } else if (cookie.startsWith("refresh_token=")) {
      refreshToken = cookie.substring(
        "refresh_token=".length,
        cookie.indexOf(";")
      );
    }
  });

  console.log("Access Token:", accessToken);
  console.log("Refresh Token:", refreshToken);

  if (accessToken) {
    const decodedAccessToken = jwtDecode(accessToken);
    cookies().set({
      name: "access_token",
      value: accessToken,
      secure: true,
      httpOnly: true,
      expires: new Date(decodedAccessToken.exp! * 1000),
      sameSite: "lax",
      path: "/"
    });
  }

  if (refreshToken) {
    const decodedRefreshToken = jwtDecode(refreshToken);
    cookies().set({
      name: "refresh_token",
      value: refreshToken,
      secure: true,
      httpOnly: true,
      expires: new Date(decodedRefreshToken.exp! * 1000),
      sameSite: "lax",
      path: "/"
    });
  }
};
