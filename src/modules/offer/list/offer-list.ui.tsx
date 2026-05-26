import { useTranslation } from "react-i18next";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/shared/components/ui/pagination";

import { OfferTableFilters } from "@/modules/offer/components/offer-table-filters";
import { OfferCard } from "@/modules/offer/components/offer-card";
import { OfferSkeletonCard } from "@/modules/offer/components/offer-skeleton-card";
import { cn } from "@/shared/utils/utils";

import type { IOfferListItem, IOfferSearchFilters } from "@/modules/offer/types";
import type { IPaginationItem } from "@/shared/types/hook";

const SKELETON_ROWS = 10;

interface IOfferListUiProps {
  items: IOfferListItem[];
  total: number;
  isLoading: boolean;
  isError: boolean;
  hasSearched: boolean;
  pagination: IPaginationItem;
  onPageChange: (page: number) => void;
  canGoNext: () => boolean | undefined;
  canGoPrev: () => boolean;
  getTotalPages: () => number | undefined;
  stagedFilters: IOfferSearchFilters;
  committedFilters: IOfferSearchFilters;
  onStagedChange: (partial: Partial<IOfferSearchFilters>) => void;
  onSearch: () => void;
  onRemoveFilter: (key: keyof IOfferSearchFilters) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  cityResetKey: number;
}

const buildPageNumbers = (currentPage: number, totalPages: number): number[] => {
  const pages: number[] = [];
  if (currentPage > 1) pages.push(currentPage - 1);
  pages.push(currentPage);
  if (currentPage < totalPages) pages.push(currentPage + 1);
  return pages;
};

export const OfferListUi = ({
  items,
  total,
  isLoading,
  isError,
  hasSearched,
  pagination,
  onPageChange,
  canGoNext,
  canGoPrev,
  getTotalPages,
  stagedFilters,
  committedFilters,
  onStagedChange,
  onSearch,
  onRemoveFilter,
  onClearFilters,
  hasActiveFilters,
  cityResetKey,
}: IOfferListUiProps) => {
  const { t } = useTranslation("offer");
  const totalPages = getTotalPages() ?? 1;

  return (
    <div className="min-h-screen">

      {/* ── Header ── */}
      <div className="text-center mb-10 md:mb-14 pt-20 md:pt-28">
        <h1 className="text-[32px] md:text-[40px] lg:text-[48px] font-medium tracking-[-0.03em] leading-[1.1]">
          {t("list.title")}
        </h1>
      </div>

      {/* ── Filters ── */}
      <div className="w-full max-w-screen-xl mx-auto px-5">
        <OfferTableFilters
          stagedFilters={stagedFilters}
          committedFilters={committedFilters}
          onStagedChange={onStagedChange}
          onSearch={onSearch}
          onRemoveFilter={onRemoveFilter}
          onClearFilters={onClearFilters}
          hasActiveFilters={hasActiveFilters}
          cityResetKey={cityResetKey}
        />
      </div>

      <main className="w-full max-w-screen-xl mx-auto px-5">

        {/* ── Results count ── */}
        <div className="flex items-center mt-16 mb-6 pl-3">
          <span className="text-sm text-offgreen-dark">
            {isLoading ? t("list.loading") : hasSearched ? t("list.results", { count: total }) : ""}
          </span>
        </div>

        {/* ── Card list ── */}
        <div className="grid gap-5">
          {isLoading &&
            Array.from({ length: SKELETON_ROWS }).map((_, i) => (
              <OfferSkeletonCard key={`skeleton-${i}`} />
            ))}

          {isError && !isLoading && (
            <div className="py-16 text-center text-destructive">{t("list.error")}</div>
          )}

          {!isLoading && !isError && !hasSearched && (
            <div className="py-16 text-center text-muted-foreground">{t("list.emptyKeyword")}</div>
          )}

          {!isLoading && !isError && hasSearched && items.length === 0 && (
            <div className="py-16 text-center text-muted-foreground">{t("list.empty")}</div>
          )}

          {!isLoading &&
            !isError &&
            items.map((item) => <OfferCard key={item.id} item={item} t={t} />)}
        </div>

        {/* ── Pagination ── */}
        {!isLoading && !isError && total > 0 && (
          <nav aria-label="Pagination" className="flex justify-center mt-8 mb-10">
            <Pagination className="mx-0 w-auto">
              <PaginationContent className="gap-1">
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
