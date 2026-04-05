import type { IApplication } from "@/shared/types/entity";
import { JobboardIcon } from "@/modules/application/components/jobboard-icon";
import { ApplicationStatusBadge } from "@/modules/application/components/application-status-badge";
import type { TTranslationFn } from "../types";

interface IHeroCardProps {
  application: IApplication;
  salary: string;
  t: TTranslationFn;
}

export const HeroCard = ({ application, salary, t }: IHeroCardProps) => {
  const company = application.company ?? t("detail.companyNotProvided");
  const location = application.address
    ? `${application.address.city} ${application.address.postalCode}`
    : t("detail.locationNotProvided");

  return (
    <div className="border border-slate-200 rounded-xl px-4 py-5 md:px-8 md:py-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4 md:gap-5 min-w-0">
          <JobboardIcon
            jobboard={application.jobboard}
            className="shrink-0 w-18 h-18 md:w-20 md:h-20 rounded-xl"
          />
          <div className="min-w-0">
            <h1 className="text-lg md:text-xl font-semibold text-slate-800 leading-tight">
              {application.title}
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              {company}
              <span className="px-1.5">·</span>
              {location}
            </p>
            <div className="flex flex-wrap gap-1.5 md:gap-2 mt-3">
              <span className="rounded-full bg-sky-600 text-white px-2.5 py-0.5 text-xs md:px-3 md:text-sm">
                {t(`contractType.${application.contractType}`)}
              </span>
              {application.remotePolicy && (
                <span className="rounded-full border border-sky-600 text-sky-600 px-2.5 py-0.5 text-xs md:px-3 md:text-sm">
                  {t(`remotePolicy.${application.remotePolicy}`)}
                </span>
              )}
              {application.experience && (
                <span className="rounded-full border border-gray-300 text-gray-400 font-medium px-2.5 py-0.5 text-xs md:px-3">
                  {t(`experience.${application.experience}`)}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="shrink-0 flex flex-col items-end gap-1.5">
          <span className="text-lg md:text-xl font-semibold text-slate-800 tracking-tight">
            {salary}
          </span>
          <ApplicationStatusBadge status={application.currentStatus} />
        </div>
      </div>
    </div>
  );
};
