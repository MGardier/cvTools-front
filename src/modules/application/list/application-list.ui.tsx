
import { useTranslation } from "react-i18next";
import { Bookmark, ChevronsLeft, ChevronsRight, Ellipsis, Eye, Pencil, Plus, Trash2 } from "lucide-react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";

import { ApplicationTableFilters } from "@/modules/application/components/application-table-filters";
import { ApplicationStatusBadge } from "@/modules/application/components/application-status-badge";
import { JobboardIcon } from "@/modules/application/components/jobboard-icon";
import { formatRelativePublishedDate } from "@/shared/utils/format";
import { cn } from "@/shared/utils/utils";

import type { IApplication, IApplicationFilters } from "@/modules/application/types";
import type { IPaginationItem } from "@/shared/types/hook";
import { ROUTES } from "@/app/constants/routes";

const SKELETON_ROWS = 10;

interface IApplicationListUiProps {
  items: IApplication[];
  total: number;
  isLoading: boolean;
  isError: boolean;
  pagination: IPaginationItem;
  onPageChange: (page: number) => void;
  canGoNext: () => boolean | undefined;
  canGoPrev: () => boolean;
  getTotalPages: () => number | undefined;
  sortValue: string;
  onSortValueChange: (value: string) => void;
  filters: IApplicationFilters;
  onFiltersChange: (partial: Partial<IApplicationFilters>) => void;
  onClearFilters: () => void;
  hasActiveFilters: () => boolean;
  onToggleFavorite: (id: number) => void;
}

/* ── Page number builder ── */

const buildPageNumbers = (
  currentPage: number,
  totalPages: number
): number[] => {
  const pages: number[] = [];
  if (currentPage > 1) pages.push(currentPage - 1);
  pages.push(currentPage);
  if (currentPage < totalPages) pages.push(currentPage + 1);
  return pages;
};

/* ── Application card ── */

interface IApplicationCardProps {
  item: IApplication;
  t: (key: string, options?: Record<string, unknown>) => string;
  onToggleFavorite: (id: number) => void;
}

const ApplicationCard = ({ item, t, onToggleFavorite }: IApplicationCardProps) => {
  const sortedSkills = item.skills ? [...item.skills]
    .sort((a, b) => (String(a.createdAt) < String(b.createdAt) ? -1 : 1))
    .slice(0, 5) : [];

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
            <div className="flex-1 flex justify-end items-center gap-4">
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
            <div className="hidden md:flex items-center gap-4 shrink-0">
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

          {/* Row 2: Company · City CP (mobile) | Company · City CP · Published · Applied (desktop) */}
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
                  <a href={ROUTES.application.detail(item.id)}>
                    <Eye className="w-4 h-4" />
                    {t("list.card.view")}
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="py-2.5">
                  <a href={ROUTES.application.edit(item.id)}>
                    <Pencil className="w-4 h-4" />
                    {t("list.card.edit")}
                  </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" className="py-2.5">
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

/* ── Skeleton card ── */

const SkeletonCard = () => (
  <article className="border border-offgreen-medium rounded-xl px-3 py-2 md:px-8 md:py-4">
    <div className="flex flex-col md:flex-row gap-3 md:gap-6">
      {/* Icon placeholder — md+ only */}
      <div className="hidden md:block w-[100px] h-[100px] rounded bg-muted animate-pulse shrink-0" />

      {/* Content */}
      <div className="flex-1 min-w-0 grid gap-2">
        {/* Mobile only: Icon + Status + Button */}
        <div className="flex md:hidden items-center">
          <div className="w-20 h-20 rounded bg-muted animate-pulse shrink-0" />
          <div className="flex-1 flex justify-center">
            <div className="h-5 w-16 rounded-full bg-muted animate-pulse" />
          </div>
          <div className="h-8 w-8 rounded bg-muted animate-pulse shrink-0" />
        </div>
        {/* Row 1: Title + Status badge (status hidden on mobile) */}
        <div className="flex items-center justify-between gap-2 md:gap-4">
          <div className="h-4 md:h-5 w-32 md:w-56 rounded bg-muted animate-pulse" />
          <div className="hidden md:block h-6 w-20 rounded-full bg-muted animate-pulse shrink-0" />
        </div>
        {/* Row 2: Meta line */}
        <div className="flex items-center gap-3">
          <div className="h-3 md:h-4 w-24 md:w-32 rounded bg-muted animate-pulse" />
          <div className="h-3 md:h-4 w-28 md:w-36 rounded bg-muted animate-pulse shrink-0" />
        </div>
        {/* Row 3: Contract + Remote + Experience badges */}
        <div className="flex gap-1.5 md:gap-2">
          <div className="h-5 md:h-6 w-12 md:w-16 rounded-full bg-muted animate-pulse" />
          <div className="h-5 md:h-6 w-16 md:w-20 rounded-full bg-muted animate-pulse" />
          <div className="h-4 w-14 rounded bg-muted animate-pulse" />
        </div>
        {/* Row 4: Skills + Button (button hidden on mobile) */}
        <div className="flex items-center justify-between gap-2 md:gap-3 mt-1 md:mt-0">
          <div className="flex gap-1.5 md:gap-2">
            <div className="h-4 w-12 rounded bg-muted animate-pulse" />
            <div className="h-4 w-16 rounded bg-muted animate-pulse" />
            <div className="h-4 w-10 rounded bg-muted animate-pulse" />
          </div>
          <div className="hidden md:block h-9 w-9 rounded-full bg-muted animate-pulse shrink-0" />
        </div>
      </div>
    </div>
  </article>
);

/* ── Sort options ── */

const SORT_OPTIONS = [
  { value: "createdAt_desc", labelKey: "list.sort.createdAtDesc" },
  { value: "createdAt_asc", labelKey: "list.sort.createdAtAsc" },
  { value: "publishedAt_desc", labelKey: "list.sort.publishedAtDesc" },
  { value: "publishedAt_asc", labelKey: "list.sort.publishedAtAsc" },
  { value: "currentStatus_asc", labelKey: "list.sort.status" },
  { value: "jobboard_asc", labelKey: "list.sort.jobboard" },
  { value: "appliedAt_asc", labelKey: "list.sort.appliedAtAsc" },
] as const;

/* ── Main component ── */

export const ApplicationListUi = ({
  items,
  total,
  isLoading,
  isError,
  pagination,
  onPageChange,
  canGoNext,
  canGoPrev,
  getTotalPages,
  sortValue,
  onSortValueChange,
  filters,
  onFiltersChange,
  onClearFilters,
  hasActiveFilters,
  onToggleFavorite,
}: IApplicationListUiProps) => {
  const { t } = useTranslation("application");

  const totalPages = getTotalPages() ?? 1;

  return (
    <div className="min-h-screen">

      {/* ── Section Header ── */}
      <div className="text-center mb-10 md:mb-14 pt-20 md:pt-28">
        <h1 className="text-[32px] md:text-[40px] lg:text-[48px] font-medium tracking-[-0.03em] leading-[1.1]">
          {t("list.title")}
        </h1>
      </div>

      {/* ── Filters ── */}
      <div className="w-full max-w-screen-xl mx-auto px-5">
        <ApplicationTableFilters
          filters={filters}
          onFiltersChange={onFiltersChange}
          onClearFilters={onClearFilters}
          hasActiveFilters={hasActiveFilters()}
        />
      </div>

      <main className="w-full max-w-screen-xl mx-auto px-5">

        {/* ── Sort bar ── */}
        <div className="flex justify-between items-center mt-16 mb-6">
          <div className="flex items-center gap-8 pl-3">
            <a href={ROUTES.application.create}
              type="button"
              className="inline-flex items-center gap-1.5 text-[14px] font-medium rounded-lg bg-blue-400 text-white hover:bg-blue-500 px-4 py-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              <span className="md:hidden">{t("list.createShort")}</span>
              <span className="hidden md:inline">{t("list.create")}</span>
            </a>
            <span className="hidden md:inline text-sm text-offgreen-dark">
              {isLoading ? t("list.loading") : t("list.results", { count: total })}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-offgreen-dark hidden sm:inline">{t("list.sort.label")} :</span>
            <Select value={sortValue} onValueChange={onSortValueChange}>
              <SelectTrigger className="h-9 gap-1 border-0 shadow-none text-sm font-medium focus:ring-0 w-auto">
                <SelectValue placeholder={t("list.sort.createdAtDesc")} />
              </SelectTrigger>
              <SelectContent align="end">
                {SORT_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {t(opt.labelKey)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* ── Card list ── */}
        <div className="grid gap-5">

          {/* Loading */}
          {isLoading &&
            Array.from({ length: SKELETON_ROWS }).map((_, i) => (
              <SkeletonCard key={`skeleton-${i}`} />
            ))}

          {/* Error */}
          {isError && !isLoading && (
            <div className="py-16 text-center text-destructive">
              {t("list.error")}
            </div>
          )}

          {/* Empty */}
          {!isLoading && !isError && items.length === 0 && (
            <div className="py-16 text-center text-muted-foreground">
              {t("list.empty")}
            </div>
          )}

          {/* Data */}
          {!isLoading &&
            !isError &&
            items.map((item) => (
              <ApplicationCard key={item.id} item={item} t={t} onToggleFavorite={onToggleFavorite} />
            ))}

        </div>

        {/* ── Pagination ── */}
        {!isLoading && !isError && total > 0 && (
          <nav aria-label="Pagination" className="flex justify-center mt-8 mb-10">
            <Pagination className="mx-0 w-auto">
              <PaginationContent className="gap-1">
                {/* First */}
                <PaginationItem>
                  <PaginationLink
                    onClick={() => onPageChange(1)}
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center cursor-pointer border-0 text-gray-500 hover:text-gray-800 hover:bg-offgreen-light",
                      pagination.page === 1 && "pointer-events-none opacity-40"
                    )}
                  >
                    <ChevronsLeft className="w-4 h-4" />
                  </PaginationLink>
                </PaginationItem>

                {/* Previous */}
                <PaginationItem>
                  <PaginationPrevious
                    label={t("list.pagination.previous")}
                    onClick={() => onPageChange(pagination.page - 1)}
                    className={cn(
                      "gap-1 font-medium text-gray-500 hover:text-gray-800",
                      !canGoPrev() && "pointer-events-none opacity-40"
                    )}
                  />
                </PaginationItem>

                {/* Page numbers (prev, current, next) */}
                {buildPageNumbers(pagination.page, totalPages).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      onClick={() => onPageChange(page)}
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center font-medium cursor-pointer text-sm border-0",
                        page === pagination.page
                          ? "bg-sky-600 hover:bg-sky-700 text-white"
                          : "text-gray-600 hover:bg-offgreen-light"
                      )}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {/* Next */}
                <PaginationItem>
                  <PaginationNext
                    label={t("list.pagination.next")}
                    onClick={() => onPageChange(pagination.page + 1)}
                    className={cn(
                      "gap-1 font-medium text-gray-500 hover:text-gray-800",
                      !canGoNext() && "pointer-events-none opacity-40"
                    )}
                  />
                </PaginationItem>

                {/* Last */}
                <PaginationItem>
                  <PaginationLink
                    onClick={() => onPageChange(totalPages)}
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center cursor-pointer border-0 text-gray-500 hover:text-gray-800 hover:bg-offgreen-light",
                      pagination.page === totalPages && "pointer-events-none opacity-40"
                    )}
                  >
                    <ChevronsRight className="w-4 h-4" />
                  </PaginationLink>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </nav>
        )}

      </main>
    </div>
  );
};
