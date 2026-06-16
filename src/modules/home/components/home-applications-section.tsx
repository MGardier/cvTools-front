import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Folders, Plus, ArrowRight } from "lucide-react";

import { ROUTES } from "@/app/constants/routes";
import { ApplicationCard } from "@/modules/application/components/application-card";
import { HomeSectionCard } from "./home-section-card";
import { HomeApplicationsStats } from "./home-applications-stats";

import type {
  IApplicationCounts,
  IHomeRecentApplication,
} from "@/modules/home/types";

interface IHomeApplicationsSectionProps {
  counts: IApplicationCounts;
  recentApplications: IHomeRecentApplication[];
  onToggleFavorite: (id: number) => void;
  onDelete: (id: number) => void;
}

export const HomeApplicationsSection = ({
  counts,
  recentApplications,
  onToggleFavorite,
  onDelete,
}: IHomeApplicationsSectionProps) => {
  const { t } = useTranslation(["home", "application"]);

  const total =
    counts.inProgress + counts.toApply + counts.interview + counts.finished;

  return (
    <HomeSectionCard
      icon={<Folders className="w-4 h-4 md:w-5 md:h-5" />}
      title={t("connected.applications.title")}
      count={total}
      headerActions={
        <Link
          to={ROUTES.application.create}
          className="inline-flex items-center gap-1.5 text-[13px] font-medium rounded-lg bg-blue-400 text-white hover:bg-blue-500 px-3 py-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="sm:hidden">{t("list.createShort", { ns: "application" })}</span>
          <span className="hidden sm:inline">{t("list.create", { ns: "application" })}</span>
        </Link>
      }
    >
      <div className="grid gap-4">
        <HomeApplicationsStats counts={counts} />

        {recentApplications.length > 0 ? (
          <div className="grid gap-3">
            {recentApplications.map((item) => (
              <ApplicationCard
                key={item.id}
                item={item}
                onToggleFavorite={onToggleFavorite}
                onDelete={onDelete}
                todoCounts={item.todoCounts}
              />
            ))}
          </div>
        ) : (
          <p className="text-sm text-zinc-400 text-center py-6">
            {t("connected.applications.empty")}
          </p>
        )}

        <Link
          to={ROUTES.application.list}
          className="inline-flex items-center justify-center gap-1.5 text-[13px] font-medium text-sky-600 hover:text-sky-700 transition-colors"
        >
          {t("connected.applications.seeAll")}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </HomeSectionCard>
  );
};
