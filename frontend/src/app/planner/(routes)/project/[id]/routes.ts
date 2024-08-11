import { Layout, BookOpenText, Kanban} from "lucide-react";

export const routes = [
  {
    path: "/planner/project/[id]",
    label: "Dashboard",
    icon: Layout,
  },
  {
    path: "/planner/project/[id]/kanban",
    label: "Kanban ",
    icon: Kanban,
  },

  
];
