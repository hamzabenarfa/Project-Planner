"use server";
import { NextResponse } from "next/server";
import axios from "axios";
import { getTokenFromCookies, setCookies } from "@/lib/cookieUtils";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  sub: string;
  role: string;
  email: string;
  iat: number;
  exp: number;
}

export async function register(email: string, password: string, role: string) {
  try {
    const response = await axios.post(
     `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/local/signup`,
      { email:email, password:password, role:role },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    const cookies = response.headers["set-cookie"];
    if (cookies) {
      setCookies(cookies);
    }
    const token: string = (await getTokenFromCookies("access_token")) ?? "";

    if (!token) {
      throw new Error("Token is missing from cookies.");
    }

    const decoded: JwtPayload = jwtDecode<JwtPayload>(token);

    return { data: response.data, roleUser: decoded.role, error: null };
  } catch (error: any) {
    return {
      data: null,
      roleUser: null,
      error: error.response?.data?.message || "An error occurred",
    };
  }
}
