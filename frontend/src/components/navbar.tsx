import Link from "next/link";
import Logo from "./logo";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className=" border-b flex flex-row items-center justify-between md:justify-around p-4 ">
      <Logo />
      <ul className="md:flex flex-row gap-2 hidden">
        <li>Home</li>
        <li>Features</li>
        <li>Pricing</li>
      </ul>

      <Button asChild variant="link">
        <Link href="/login">Login</Link>
      </Button>
    </nav>
  );
};

export default Navbar;
