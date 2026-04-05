
import { useTranslation } from "react-i18next";
import { Badge } from "@/shared/components/ui/badge";
import { EApplicationStatus, type TApplicationStatus } from "@/modules/application/types";
import { cn } from "@/shared/utils/utils";

interface IApplicationStatusBadgeProps {
  status: TApplicationStatus;
}

const STATUS_STYLES: Record<TApplicationStatus, string> = {
  [EApplicationStatus.TO_APPLY]:
    "bg-blue-100 text-blue-700 border border-blue-200",
  [EApplicationStatus.APPLIED]:
    "bg-indigo-100 text-indigo-700 border border-indigo-200",
  [EApplicationStatus.FIRST_CONTACT]:
    "bg-cyan-100 text-cyan-700 border border-cyan-200",
  [EApplicationStatus.FIRST_INTERVIEW]:
    "bg-amber-100 text-amber-700 border border-amber-200",
  [EApplicationStatus.FOLLOW_UP_INTERVIEW]:
    "bg-orange-100 text-orange-700 border border-orange-200",
  [EApplicationStatus.OFFER_RECEIVED]:
    "bg-purple-100 text-purple-700 border border-purple-200",
  [EApplicationStatus.ACCEPTED]:
    "bg-emerald-100 text-emerald-700 border border-emerald-200",
  [EApplicationStatus.REJECTED]:
    "bg-red-100 text-red-700 border border-red-200",
  [EApplicationStatus.GHOSTED]:
    "bg-gray-100 text-gray-700 border border-gray-200",
  [EApplicationStatus.WITHDRAWN]:
    "bg-slate-100 text-slate-700 border border-slate-200",
};

export const ApplicationStatusBadge = ({
  status,
}: IApplicationStatusBadgeProps) => {
  const { t } = useTranslation("application");

  return (
    <Badge
      variant={null}
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs md:px-3 md:py-1.5 md:text-sm font-medium whitespace-nowrap",
        STATUS_STYLES[status]
      )}
    >
      {t(`status.${status}`)}
    </Badge>
  );
};
