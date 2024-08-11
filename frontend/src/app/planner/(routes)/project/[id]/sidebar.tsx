import Link from "next/link";
import { routes } from "./routes";

const Sidebar = (params: { id: string }) => {
  return (
    <div
      className={`fixed inset-0 z-30  text-black transform  transition-transform duration-200 ease-in-out md:relative md:translate-x-0 md:w-64`}
    >
      <div className="py-5 px-6 font-bold text-lg ">Manager dashboard</div>
      <ul className="flex-1 p-6 space-y-4">
        {routes.map(({ path, label, icon: Icon }) => (
          <li
            key={path}
            className="p-2 font-semibold text-sm flex items-center gap-2"
          >
            <Icon className="w-6 h-6" />
            <Link href={path.replace("[id]", params.id || "default")}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
