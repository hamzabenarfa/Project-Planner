
export const statusColors: Record<string, string> = {
  BUILDING: "bg-yellow-100",
  INPROGRESS: "bg-blue-100",
  pending: "bg-gray-100",
  STARTED: "bg-blue-100",
  STOPPED: "bg-red-100",
  default: "bg-green-100",
} as const;
