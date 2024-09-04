import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Ellipsis } from "lucide-react";

interface SettingCardProps {
  name: string;
  children?: React.ReactNode;
}

const CommentCard = ({ name, children }: SettingCardProps) => {
  return (
    <Card className="rounded-xl border border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between bg-blue-50 rounded-t-xl px-4 py-6">
        <CardTitle>{name}</CardTitle>
        <Button variant="ghost" size="icon">
          <Ellipsis />
        </Button>
      </CardHeader>
      <CardContent className="py-4 space-y-4 px-4">
        {children}
      </CardContent>
    </Card>
  );
};

export default CommentCard;
