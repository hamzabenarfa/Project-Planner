
import { NextRequest, NextResponse } from "next/server";
import { cookies } from 'next/headers'

export function middleware(request: NextRequest) {

  const cookieStore = cookies()
  const refreshToken = cookieStore.get('refresh_token')
  const accessToken = cookieStore.get("access_token")?.value;

  
  // Continue to the requested route
  return NextResponse.next();
}

// Define which routes this middleware applies to
