import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface SettingCardProps {
  name: string;
  description:string;
  children?: React.ReactNode;
}

const SettingCard = ({ name,description, children }: SettingCardProps) => {
  return (
    <Card className="">
      <CardHeader className=" bg-slate-100">
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <Separator />

      <CardContent className="py-4 space-y-4">
        <CardDescription>
            {description}
        </CardDescription>
        
        {children}
      </CardContent>
    </Card>
  );
};

export default SettingCard;
