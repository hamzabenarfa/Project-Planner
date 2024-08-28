import { Layout, Kanban, Settings} from "lucide-react";

export const routes = [
  {
    path: "/project/[id]",
    label: "Dashboard",
    icon: Layout,
  },
  {
    path: "/project/[id]/kanban",
    label: "Kanban ",
    icon: Kanban,
  },
  {
    path: "/project/[id]/setting",
    label: "Setting ",
    icon: Settings,
  },
];
