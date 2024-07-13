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

const Login = () => {
  return (
    <div className=" container min-h-screen flex items-center justify-between ">
      <Image src="/svg/login.svg" alt="login" width={500} height={500} />

      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription> Please login to our platform </CardDescription>
        </CardHeader>
        <CardContent>
          <Label htmlFor="email">Your email address</Label>
          <Input label="Email" type="email" />

          <Label htmlFor="Password">Your Password</Label>
          <Input label="Password" type="password" />

          <Button className="mt-4 w-full">Login</Button>
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
