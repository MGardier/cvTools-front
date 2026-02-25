import type { TApplicationStatus } from "@/modules/application/types";

const STATUS_BADGE_BASE = "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium inset-ring";

const STATUS_COLOR_MAP: Record<TApplicationStatus, string> = {
  NEED_TO_APPLY: "bg-yellow-400/10 text-yellow-500 inset-ring-yellow-400/20",
  APPLIED: "bg-blue-400/10 text-blue-400 inset-ring-blue-400/30",
  IN_PROCESS: "bg-indigo-400/10 text-indigo-400 inset-ring-indigo-400/30",
  COMPANY_OFFER_RECEIVED: "bg-purple-400/10 text-purple-400 inset-ring-purple-400/30",
  ACCEPTED: "bg-green-400/10 text-green-400 inset-ring-green-500/20",
  REJECTED: "bg-red-400/10 text-red-400 inset-ring-red-400/20",
  GHOSTED: "bg-pink-400/10 text-pink-400 inset-ring-pink-400/20",
  WITHDRAWN: "bg-gray-400/10 text-gray-400 inset-ring-gray-400/20",
};

export const getStatusBadgeClasses = (status: TApplicationStatus): string =>
  `${STATUS_BADGE_BASE} ${STATUS_COLOR_MAP[status]}`;
