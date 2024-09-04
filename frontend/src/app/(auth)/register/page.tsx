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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import Toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { register } from "./register";
const Register = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      Toast.error("Please fill in all fields");
      return;
    }
    console.log(role)
    const { data, roleUser, error } = await register(email, password, role);

    error ? Toast.error(error) : Toast.success(data.message);
    roleUser === "MANAGER" ? router.push("/project") : router.push("/register");
  };

  return (
    <div className="container min-h-screen flex items-center justify-center md:justify-around">
      <Image
        src="/svg/register.svg"
        alt="login"
        className="hidden md:block"
        width={500}
        height={500}
      />

      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription> Please Register to our platform </CardDescription>
        </CardHeader>
        <CardContent >
          <form onSubmit={handleSubmit} className=" w-full space-y-4">
            <div>
              <Label htmlFor="email">Your email address</Label>
              <Input
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <Label htmlFor="password">Your Password</Label>
              <Input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Select value={role} onValueChange={(value) => setRole(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MEMBER">Developer</SelectItem>
                <SelectItem value="MANAGER">Manager</SelectItem>
              </SelectContent>
            </Select>

            <Button className=" w-full">Login</Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="font-light text-xs text-gray-500">
            You have an account?{" "}
            <Link href="/login" className="text-green-700 underline">
              Register
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
