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
import { useState } from "react";
import Toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { login } from "./login";


const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      Toast.error("Please fill in all fields");
      return;
    }
    const { data, role, error } = await login(email, password);

    error ? Toast.error(error) : Toast.success(data.message);
    role === "MANAGER" ? router.push("/project") : router.push("/login");
  };
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
          <form onSubmit={handleSubmit}>
            <Label htmlFor="email">Your email address</Label>
            <Input
              id="email"
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />

            <Label htmlFor="password">Your Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />

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
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
