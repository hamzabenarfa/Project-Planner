"use client";
import { Separator } from "@/components/ui/separator";
import BurnDownChart from "./_components/burn-down-chart";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";

export default function Page() {
  const param = useParams();
  return (
    <div className="container p-4 flex flex-col gap-4 min-h-screen">
     
     <h1 className=" capitalize text-xl font-bold">

     project dashboard
     </h1>
      <Card className=" w-2/3">
        {/* <BurnDownChart projectId={param.id[0]} /> */}
      </Card>
    </div>
  );
}
