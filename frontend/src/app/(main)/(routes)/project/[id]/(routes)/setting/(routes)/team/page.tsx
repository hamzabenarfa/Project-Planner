"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SettingCard from "../../_components/setting-card";
import { useState } from "react";
import Toast from "react-hot-toast";
import { RotateCcw } from "lucide-react";

const Team = () => {
  const [joinKey, setInviteKey] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);

  const generateJoinKey = () => {
    const key = Math.random().toString(36).substring(8).toUpperCase();
    setInviteKey(key);
    setIsGenerated(true);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    Toast.success("Join Key copied to clipboard");
  };

  return (
    <div className="space-y-4">
      <SettingCard
        name="Collaborators"
        description="To invite people to your plan, send them an email invite using the form below"
      >
        <div className="flex flex-col space-y-1.5 w-1/2">
          <Label htmlFor="email">Name</Label>
          <div className="flex items-center gap-1.5">
            <Input
              id="email"
              type="email"
              placeholder="your-co-worker@exmple.com"
              className="h-11"
            />
            <Button size="lg">Invite</Button>
          </div>
        </div>
      </SettingCard>
      <SettingCard
        name="Generate Join Key"
        description="Generate a unique join key to allow others to join your project"
      >
        <div className="flex flex-row  items-end gap-1 space-y-1.5">
          <div className="flex flex-col space-y-1.5 w-80">
            <Label htmlFor="joinKey">Join Key</Label>
            <div className="flex items-center gap-1.5 relative">
              <Input
                id="joinKey"
                type="text"
                placeholder="Generated Join Key"
                value={joinKey}
                disabled
                className="pr-10 h-11" // Ensure space for the icon
              />
              <RotateCcw
                size={24}
                className="absolute right-2 cursor-pointer"
                onClick={generateJoinKey}
              />
            </div>{" "}
          </div>
          <Button size="lg" onClick={() => copyToClipboard(joinKey)}>
            Copy Join Key
          </Button>
        </div>
      </SettingCard>
    </div>
  );
};

export default Team;
