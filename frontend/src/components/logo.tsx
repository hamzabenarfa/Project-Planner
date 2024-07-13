import Link from "next/link";
import { Button } from "./ui/button";

const Logo = () => {
  return (
    <div>
      <Button className="text-2xl font-bold" variant="link" asChild>
        <Link href="/">Planners</Link>
      </Button>
    </div>
  );
};

export default Logo;
