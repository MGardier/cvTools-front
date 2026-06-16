import { useTranslation } from "react-i18next";

import { cn } from "@/shared/utils/utils";
import type { IApplicationCounts } from "@/modules/home/types";

interface IHomeApplicationsStatsProps {
  counts: IApplicationCounts;
}

const STAT_KEYS = [
  { key: "inProgress", color: "text-sky-600" },
  { key: "interview", color: "text-violet-600" },
  { key: "toApply", color: "text-amber-600" },
  { key: "finished", color: "text-emerald-600" },
] as const;

export const HomeApplicationsStats = ({ counts }: IHomeApplicationsStatsProps) => {
  const { t } = useTranslation("home");

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
      {STAT_KEYS.map(({ key, color }) => (
        <div
          key={key}
          className="min-w-0 rounded-xl border border-zinc-100 bg-zinc-50/60 px-2 py-2.5 md:px-3 md:py-3 flex flex-col items-center justify-center text-center"
        >
          <p className={cn("text-xl md:text-2xl font-semibold leading-none", color)}>
            {counts[key]}
          </p>
          <p className="mt-1 md:mt-1.5 text-[11px] md:text-xs text-zinc-500 truncate max-w-full">
            {t(`connected.applications.stats.${key}`)}
          </p>
        </div>
      ))}
    </div>
  );
};
