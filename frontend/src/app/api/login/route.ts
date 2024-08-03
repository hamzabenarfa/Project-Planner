import { NextResponse } from 'next/server';
import axios from 'axios';
import { getTokenFromCookies, setCookies } from '@/lib/cookieUtils';

import { jwtDecode } from "jwt-decode";

interface LoginRequestBody {
  email: string;
  password: string;
}

interface JwtPayload {
  sub: string;
  name: string;
}
export async function POST(request: Request) {
  const { email, password }: LoginRequestBody = await request.json();

  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/local/signin`, { email, password }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      withCredentials: true 
    });

    if (response.status === 200) {
      const responseObj = NextResponse.json({ message: "Login successful" });

      const cookies = response.headers['set-cookie'];
      if (cookies) {
        setCookies( cookies);
      }
      const token :string = await getTokenFromCookies('access_token') ?? "";
      console.log("🚀 ~ token:", token); // Debugging statement

      if (!token) {
        throw new Error("Token is missing from cookies.");
      }

      const decoded =  jwtDecode(token) 
      console.log("🚀 ~ decoded:", decoded);
      return responseObj;
    } else {
      return NextResponse.json({ message: response.data.message }, { status: response.status });
    }
  } catch (error) {
    return NextResponse.json({ message: error.response.data.message }, { status: 500 });
  }
}
