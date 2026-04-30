import { Ellipsis, Eye } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

import { JobboardIcon } from "@/modules/application/components/jobboard-icon";
import { formatRelativePublishedDate, formatSalary } from "@/shared/utils/format";
import { cn } from "@/shared/utils/utils";

import type { IOfferListItem } from "@/modules/offer/types";
import type { TJobboard } from "@/shared/types/entity";

/* ── Jobboard origin → shared TJobboard mapping ── */
const JOBBOARD_ORIGIN_MAP: Record<string, string> = {
  FRANCE_TRAVAIL: "FRANCE_TRAVAIL",
  WTTJ: "WTTJ",
  HELLOWORK: "HELLO_WORK",
  UNKNOWN: "UNKNOW",
};

interface IOfferCardProps {
  item: IOfferListItem;
  t: (key: string, options?: Record<string, unknown>) => string;
}

/* ── Helper: resolve experience display ── */
const getExperienceLabel = (
  item: IOfferListItem,
  t: (key: string) => string
): string => {
  if (item.experience?.level) return t(`experience.${item.experience.level}`);
  if (item.experience?.raw) return item.experience.raw;
  return t("list.card.experienceNotProvided");
};

/* ── Helper: resolve salary display ── */
const getSalaryLabel = (item: IOfferListItem): string | null => {
  if (item.salary?.min != null || item.salary?.max != null) {
    return formatSalary(item.salary?.min ?? null, item.salary?.max ?? null, "");
  }
  if (item.salary?.raw) return item.salary.raw;
  return null;
};

export const OfferCard = ({ item, t }: IOfferCardProps) => {
  const displaySkills = item.skills.slice(0, 5);
  const mappedJobboard = (JOBBOARD_ORIGIN_MAP[item.jobboard] ?? "UNKNOW") as TJobboard;
  const experienceLabel = getExperienceLabel(item, t);
  const salaryLabel = getSalaryLabel(item);

  return (
    <article className="transition border border-offgreen-medium rounded-xl hover:border-sky-600 hover:shadow-lg hover:shadow-sky-600/20 px-3 pt-2 pb-4 md:px-8 md:py-4">
      <div className="flex flex-col md:flex-row gap-3 md:gap-6">
        {/* Icon — md+ only */}
        <div className="hidden md:block">
          <JobboardIcon jobboard={mappedJobboard} className="w-[100px] h-[100px]" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 grid gap-2">
          {/* Mobile only: Icon */}
          <div className="flex md:hidden items-center">
            <JobboardIcon jobboard={mappedJobboard} className="w-20 h-20" />
          </div>

          {/* Row 1: Title + Powered by */}
          <div className="flex items-center justify-between gap-2 md:gap-4">
            <h2 className="m-0 text-sm font-medium md:text-xl truncate">{item.title}</h2>
            <span className="shrink-0 text-[10px] md:text-xs text-gray-400 italic">
              powered by {t(`apiProvider.${item.apiProvider}`)}
            </span>
          </div>

          {/* Row 2: Company · City · Published */}
          <OfferCardMeta item={item} t={t} />

          {/* Row 2b (mobile only): Published */}
          {item.publishedAt && (
            <div className="flex md:hidden items-center text-xs text-gray-500">
              <time>
                {t("list.card.published")} {formatRelativePublishedDate(item.publishedAt)}
              </time>
            </div>
          )}

          {/* Row 3: Badges */}
          <OfferCardBadges
            item={item}
            t={t}
            experienceLabel={experienceLabel}
            salaryLabel={salaryLabel}
          />

          {/* Row 4: Skills | Menu */}
          <div className="flex items-center justify-between gap-2 md:gap-3 mt-1 md:mt-0">
            <OfferCardSkills skills={displaySkills} />
            <OfferCardActions url={item.url} t={t} />
          </div>
        </div>
      </div>
    </article>
  );
};

/* ── Sub-components ── */

const OfferCardMeta = ({
  item,
  t,
}: {
  item: IOfferListItem;
  t: (key: string) => string;
}) => (
  <div className="flex items-center text-xs md:text-sm text-gray-500 flex-wrap">
    <span className="truncate">
      {item.company ?? t("list.card.companyNotProvided")}
    </span>
    <span className="px-1.5">·</span>
    <span>
      {item.location?.city
        ? `${item.location.city} ${item.location.postalCode ?? ""}`.trim()
        : t("list.card.locationNotProvided")}
    </span>
    {item.publishedAt && (
      <span className="hidden md:inline px-1.5">·</span>
    )}
    {item.publishedAt && (
      <time className="hidden md:inline">
        {t("list.card.published")} {formatRelativePublishedDate(item.publishedAt)}
      </time>
    )}
  </div>
);

const OfferCardBadges = ({
  item,
  t,
  experienceLabel,
  salaryLabel,
}: {
  item: IOfferListItem;
  t: (key: string) => string;
  experienceLabel: string;
  salaryLabel: string | null;
}) => (
  <div className="flex flex-wrap gap-1.5 md:gap-2 items-center">
    {item.contractType && (
      <span className="rounded-full bg-sky-600 text-white px-2 py-px text-xs md:px-3 md:text-sm">
        {t(`contractType.${item.contractType}`)}
      </span>
    )}
    {item.remote && (
      <span className="rounded-full border border-sky-600 text-sky-600 px-2 py-px text-xs md:px-3 md:text-sm">
        {t(`remotePolicy.${item.remote}`)}
      </span>
    )}
    <span className="rounded-full border border-gray-300 text-xs text-gray-400 font-medium px-2 py-px md:px-3">
      {experienceLabel}
    </span>
    {salaryLabel && (
      <span className="rounded-full border border-emerald-400 text-emerald-600 text-xs font-medium px-2 py-px md:px-3">
        {salaryLabel}
      </span>
    )}
  </div>
);

const OfferCardSkills = ({ skills }: { skills: string[] }) => (
  <div className="flex flex-wrap gap-1.5 md:gap-2 min-w-0">
    {skills.map((skill, index) => (
      <span
        key={`${skill}-${index}`}
        className={cn(
          "rounded-full bg-gray-100 text-gray-500 text-xs px-2.5 py-px",
          index >= 3 && "hidden md:inline"
        )}
      >
        {skill}
      </span>
    ))}
  </div>
);

const OfferCardActions = ({
  url,
  t,
}: {
  url: string;
  t: (key: string) => string;
}) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <button
        type="button"
        onClick={(e) => e.stopPropagation()}
        className="p-1 rounded-md hover:bg-muted transition-colors shrink-0"
      >
        <Ellipsis className="w-5 h-5 text-gray-500" />
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="shadow-lg border border-gray-200 p-2">
      <DropdownMenuItem className="py-2.5" onClick={() => window.open(url, "_blank")}>
        <Eye className="w-4 h-4" />
        {t("list.card.viewOffer")}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);
