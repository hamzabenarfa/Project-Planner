"use server";

import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

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

  setAuthCookie(res); 
  if (res.ok) {
    return;
  } else {
    return json.error;
  }
}

const setAuthCookie = (response: Response) => {
  const setCookieHeader = response.headers.get("Set-Cookie");
  console.log("🚀 ~ setAuthCookie ~ setCookieHeader:", setCookieHeader)
  if (setCookieHeader) {
    const token = setCookieHeader.split(";")[0].split("=")[1];
    cookies().set({
      name: "Authentication",
      value: token,
      secure: true,
      httpOnly: true,
      expires: new Date(jwtDecode(token).exp! * 1000),
    });
  }
};
