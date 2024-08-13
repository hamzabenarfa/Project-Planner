import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const cookieStore = request.cookies;
  const refreshToken = cookieStore.get("refresh_token");
  const accessToken = cookieStore.get("access_token");

  if (!refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/planner/:path*'], 
}
