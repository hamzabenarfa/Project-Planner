// app/api/login/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

interface LoginRequestBody {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  const { email, password }: LoginRequestBody = await request.json();

  try {
    // Make the request to the authentication endpoint
    const response = await axios.post("http://localhost:4000/auth/local/signin", { email, password }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      withCredentials: true // Make sure to send credentials with the request
    });

    if (response.status === 200) {
      const responseObj = NextResponse.json({ message: "Login successful" });

      // Extract cookies from response headers
      const cookies = response.headers['set-cookie'];

      if (cookies) {
        cookies.forEach((cookie: string) => {
          // Split the cookie string into parts
          const parts = cookie.split(';');
          const [cookieNameValue] = parts.shift()!.split('=');
          const [cookieName, cookieValue] = cookieNameValue.split('=');

          // Create an options object from the remaining parts
          const options: { [key: string]: any } = {};
          parts.forEach((part:string) => {
            const [key, value] = part.trim().split('=');
            switch (key.toLowerCase()) {
              case 'max-age':
                options.maxAge = parseInt(value, 10);
                break;
              case 'expires':
                options.expires = new Date(value);
                break;
              case 'secure':
                options.secure = true;
                break;
              case 'samesite':
                options.sameSite = value as 'Lax' | 'Strict' | 'None';
                break;
              case 'path':
                options.path = value;
                break;
              case 'httponly':
                options.httpOnly = true;
                break;
            }
          });

          // Set the cookie in the response object
          responseObj.cookies.set(cookieName, cookieValue, options);
        });
      }

      return responseObj;
    } else {
      return NextResponse.json({ message: response.data.message }, { status: response.status });
    }
  } catch (error) {
    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
  }
}
