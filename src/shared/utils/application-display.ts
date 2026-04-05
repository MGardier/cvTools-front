import type { TApplicationStatus } from "@/modules/application/types";

const STATUS_BADGE_BASE = "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium inset-ring";

const STATUS_COLOR_MAP: Record<TApplicationStatus, string> = {
  TO_APPLY: "bg-blue-400/10 text-blue-500 inset-ring-blue-400/20",
  APPLIED: "bg-indigo-400/10 text-indigo-400 inset-ring-indigo-400/30",
  FIRST_CONTACT: "bg-cyan-400/10 text-cyan-500 inset-ring-cyan-400/20",
  FIRST_INTERVIEW: "bg-amber-400/10 text-amber-500 inset-ring-amber-400/20",
  FOLLOW_UP_INTERVIEW: "bg-orange-400/10 text-orange-500 inset-ring-orange-400/20",
  OFFER_RECEIVED: "bg-purple-400/10 text-purple-400 inset-ring-purple-400/30",
  ACCEPTED: "bg-green-400/10 text-green-400 inset-ring-green-500/20",
  REJECTED: "bg-red-400/10 text-red-400 inset-ring-red-400/20",
  GHOSTED: "bg-gray-400/10 text-gray-500 inset-ring-gray-400/20",
  WITHDRAWN: "bg-slate-400/10 text-slate-500 inset-ring-slate-400/20",
};

export const getStatusBadgeClasses = (status: TApplicationStatus): string =>
  `${STATUS_BADGE_BASE} ${STATUS_COLOR_MAP[status]}`;
