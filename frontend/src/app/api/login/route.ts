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
  role: string;
  email: string;
  iat: number;
  exp:number;
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

      const cookies = response.headers['set-cookie'];
      if (cookies) {
        setCookies( cookies);
      }
      const token :string = await getTokenFromCookies('access_token') ?? "";

      if (!token) {
        throw new Error("Token is missing from cookies.");
      }

      const decoded:JwtPayload =  jwtDecode<JwtPayload>(token) 
      const responseObj = NextResponse.json({ message: "Login successful" , role:  decoded.role }, { status: 200 });

      return responseObj;
    } 
  } catch (error:any) {
    return NextResponse.json({ message: error.response.data.message }, { status: 500 });
  }
}
