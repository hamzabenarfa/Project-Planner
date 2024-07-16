"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";

import { useFormState } from "react-dom";
import loginAction from "./login";

const Login = () => {
  const [error, formAction] = useFormState(loginAction, undefined);
  return (
    <div className="container min-h-screen flex items-center justify-center md:justify-around">
      <Image
        src="/svg/login.svg"
        alt="login"
        width={500}
        height={500}
        className="hidden md:block"
      />

      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Please login to our platform</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <Label htmlFor="email">Your email address</Label>
            <Input id="email" type="email" name="email" />

            <Label htmlFor="password">Your Password</Label>
            <Input type="password" id="password" name="password" />

            <Button className="mt-4 w-full" type="submit">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="font-light text-xs text-gray-500">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-green-700 underline">
              Register
            </Link>
          </p>
          {error && <p>{error}</p>}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
