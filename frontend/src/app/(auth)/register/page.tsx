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

const Register = () => {
  return (
    <div className=" container min-h-screen flex items-center justify-between ">
      <Image src="/svg/register.svg" alt="login" width={500} height={500} />

      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription> Please Register to our platform </CardDescription>
        </CardHeader>
        <CardContent className=" w-full space-y-4">
          <div>
            <Label htmlFor="email">Your email address</Label>
            <Input label="Email" type="email" />

            <Label htmlFor="Password">Your Password</Label>
            <Input label="Password" type="password" />
          </div>

          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PERSONAL">Personal</SelectItem>
              <SelectItem value="PRO">Pro</SelectItem>
              <SelectItem value="ENTREPRISE">Enterprise</SelectItem>
            </SelectContent>
          </Select>

          <Button className=" w-full">Login</Button>
        </CardContent>
        <CardFooter>
          <p className="font-light text-xs text-gray-500">
            You have an account?{" "}
            <Link href="/login" className="text-green-700 underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
