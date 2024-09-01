"use client";
import { Separator } from "@/components/ui/separator";
import { useParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Children } from "react";

const SettingLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const param = useParams();
  const projectId = param.id;
  const examples = [
    {
      name: "General",
      href: `/project/${projectId}/setting`,
    },
    {
      name: "Team",
      href: `/project/${projectId}/setting/team`,
    },
    {
      name: "Team Members",
      href: `/project/${projectId}/setting/team-members`,
    },
  ];

  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-4 min-h-screen w-full p-4">
      <h1 className="text-4xl font-bold">Project Settings</h1>
      <Separator />

      <div className="relative">
        <ScrollArea className="max-w-[600px] lg:max-w-none">
          <div className={cn("mb-4 flex items-center")}>
            {examples.map((example, index) => (
                   <Link
                   href={example.href}
                   key={example.href}
                   className={cn(
                     "flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary",
                     pathname === example.href
                       ? "bg-muted font-medium text-primary"
                       : "text-muted-foreground"
                   )}
                 >
                   {example.name}
                 </Link>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="invisible" />
        </ScrollArea>
      </div>
      {children}
    </div>
  );
};

export default SettingLayout;
