"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { routes } from "./routes";

const Sidebar = () => {
  const params = useParams();

  return (
    <div className=" text-black hidden w-64 border-r md:flex  flex-col border-gray-200">
      <div className="py-5 px-6 font-bold text-lg ">Manager dashboard</div>
      <ul className="flex-1 p-6 space-y-4">
        {routes.map(({ path, label, icon: Icon }) => (
          <li
            key={path}
            className="p-2 font-semibold text-sm flex items-center gap-2"
          >
            <Icon className="w-6 h-6" />
            <Link href={path.replace("[id]", String(params.id))}>{label} 
            
            </Link>
             
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
