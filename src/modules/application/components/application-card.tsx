import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Bookmark, Ellipsis, Eye, Pencil, Trash2, SquareCheckBig } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { ApplicationStatusBadge } from "@/modules/application/components/application-status-badge";
import { JobboardIcon } from "@/modules/application/components/jobboard-icon";
import { formatRelativePublishedDate } from "@/shared/utils/format";
import { cn } from "@/shared/utils/utils";
import { ROUTES } from "@/app/constants/routes";

import type { IApplication } from "@/modules/application/types";

/** Active/total todo counter, shown only when provided (e.g. on the home). */
interface IApplicationCardTodoCounts {
  toMake: number;
  inProgress: number;
  total: number;
}

interface IApplicationCardProps {
  item: IApplication;
  onToggleFavorite: (id: number) => void;
  onDelete: (id: number) => void;
  todoCounts?: IApplicationCardTodoCounts;
}

export const ApplicationCard = ({
  item,
  onToggleFavorite,
  onDelete,
  todoCounts,
}: IApplicationCardProps) => {
  const { t } = useTranslation("application");

  const sortedSkills = item.skills
    ? [...item.skills]
        .sort((a, b) => (String(a.createdAt) < String(b.createdAt) ? -1 : 1))
        .slice(0, 5)
    : [];

  const activeTodos = todoCounts
    ? todoCounts.toMake + todoCounts.inProgress
    : 0;

  const todoBadge =
    todoCounts && todoCounts.total > 0 ? (
      <span className="inline-flex items-center gap-1 shrink-0 text-xs text-gray-500">
        <SquareCheckBig className="w-3.5 h-3.5" />
        {activeTodos}/{todoCounts.total} {t("list.card.tasks")}
      </span>
    ) : null;

  return (
    <article className="transition border border-offgreen-medium rounded-xl hover:border-sky-600 hover:shadow-lg hover:shadow-sky-600/20 px-3 pt-2 pb-4 md:px-8 md:py-4">
      <div className="flex flex-col md:flex-row gap-3 md:gap-6">
        {/* Icon — md+ only (left column) */}
        <div className="hidden md:block">
          <JobboardIcon jobboard={item.jobboard} className="w-[100px] h-[100px]" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 grid gap-2">
          {/* Mobile only: Icon + Status + Heart (right-aligned) */}
          <div className="flex md:hidden items-center">
            <JobboardIcon jobboard={item.jobboard} className="w-20 h-20" />
            <div className="flex-1 flex justify-end items-center gap-3">
              {todoBadge}
              <ApplicationStatusBadge status={item.currentStatus} />
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onToggleFavorite(item.id); }}
                className="p-1 rounded-md hover:bg-muted transition-colors"
              >
                <Bookmark
                  className={cn(
                    "w-5 h-5 transition-colors",
                    item.isFavorite ? "text-blue-400 fill-current" : "text-blue-400"
                  )}
                />
              </button>
            </div>
          </div>

          {/* Row 1: Title | Status badge (status hidden on mobile) */}
          <div className="flex items-center justify-between gap-2 md:gap-4">
            <h2 className="m-0 text-sm font-medium md:text-xl truncate">{item.title}</h2>
            <div className="hidden md:flex items-center gap-3 shrink-0">
              {todoBadge}
              <ApplicationStatusBadge status={item.currentStatus} />
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onToggleFavorite(item.id); }}
                className="p-1 rounded-md hover:bg-muted transition-colors"
              >
                <Bookmark
                  className={cn(
                    "w-5 h-5 transition-colors",
                    item.isFavorite ? "text-blue-400 fill-current" : "text-blue-400"
                  )}
                />
              </button>
            </div>
          </div>

          {/* Row 2: Company · City CP · Tasks (mobile) | + Published · Applied (desktop) */}
          <div className="flex items-center text-xs md:text-sm text-gray-500 flex-wrap">
            {item.company && (
              <span className="truncate">{item.company}</span>
            )}
            {item.company && item.address && (
              <span className="px-1.5">·</span>
            )}
            {item.address && (
              <span>{item.address.city} {item.address.postalCode}</span>
            )}
            {(item.company || item.address) && item.publishedAt && (
              <span className="hidden md:inline px-1.5">·</span>
            )}
            {item.publishedAt && (
              <time className="hidden md:inline">
                {t("list.card.published")} {formatRelativePublishedDate(item.publishedAt)}
              </time>
            )}
            {item.appliedAt && (
              <>
                <span className="hidden md:inline px-1.5">·</span>
                <time className="hidden md:inline">
                  {t("list.card.applied")} {formatRelativePublishedDate(item.appliedAt)}
                </time>
              </>
            )}
          </div>

          {/* Row 2b (mobile only): Published · Applied */}
          {(item.publishedAt || item.appliedAt) && (
            <div className="flex md:hidden items-center text-xs text-gray-500">
              {item.publishedAt && (
                <time>
                  {t("list.card.published")} {formatRelativePublishedDate(item.publishedAt)}
                </time>
              )}
              {item.publishedAt && item.appliedAt && (
                <span className="px-1.5">·</span>
              )}
              {item.appliedAt && (
                <time>
                  {t("list.card.applied")} {formatRelativePublishedDate(item.appliedAt)}
                </time>
              )}
            </div>
          )}

          {/* Row 3: Contract + Remote + Experience badges */}
          <div className="flex flex-wrap gap-1.5 md:gap-2 items-center">
            <span className="rounded-full bg-sky-600 text-white px-2 py-px text-xs md:px-3 md:text-sm">
              {t(`contractType.${item.contractType}`)}
            </span>
            {item.remotePolicy && (
              <span className="rounded-full border border-sky-600 text-sky-600 px-2 py-px text-xs md:px-3 md:text-sm">
                {t(`remotePolicy.${item.remotePolicy}`)}
              </span>
            )}
            {item.experience && (
              <span className="rounded-full border border-gray-300 text-xs text-gray-400 font-medium px-2 py-px md:px-3">
                {t(`experience.${item.experience}`)}
              </span>
            )}
          </div>

          {/* Row 4: Skills | Menu button */}
          <div className="flex items-center justify-between gap-2 md:gap-3 mt-1 md:mt-0">
            <div className="flex flex-wrap gap-1.5 md:gap-2 min-w-0">
              {sortedSkills.map((skill, index) => (
                <span
                  key={skill.id}
                  className={cn(
                    "rounded-full bg-gray-100 text-gray-500 text-xs px-2.5 py-px",
                    index >= 3 && "hidden md:inline"
                  )}
                >
                  {skill.label}
                </span>
              ))}
            </div>
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
                <DropdownMenuItem asChild className="py-2.5">
                  <Link to={ROUTES.application.detail(item.id)}>
                    <Eye className="w-4 h-4" />
                    {t("list.card.view")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="py-2.5">
                  <Link to={ROUTES.application.edit(item.id)}>
                    <Pencil className="w-4 h-4" />
                    {t("list.card.edit")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" className="py-2.5" onClick={() => onDelete(item.id)}>
                  <Trash2 className="w-4 h-4" />
                  {t("list.card.delete")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </article>
  );
};
