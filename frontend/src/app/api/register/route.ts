import { NextResponse } from 'next/server';
import axios from 'axios';
import { setCookies } from '@/lib/cookieUtils';

interface RegisterRequestBody {
  email: string;
  password: string;
}

export async function POST(request: Request) {
  const { email, password }: RegisterRequestBody = await request.json();

  try {
    const response = await axios.post("http://localhost:4000/auth/local/register", { email, password }, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });

    if (response.status === 201) {
      const responseObj = NextResponse.json({ message: "Registration successful" });

      const cookies = response.headers['set-cookie'];
      if (cookies) {
        setCookies(cookies);
      }

      return responseObj;
    } else {
      return NextResponse.json({ message: (response.data as any).message }, { status: response.status });
    }
  } catch (error) {
    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
  }
}
