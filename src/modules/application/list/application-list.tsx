
import { useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { usePagination } from "@/shared/hooks/usePagination";
import { useSorting } from "@/shared/hooks/useSorting";
import { useFilters } from "@/shared/hooks/useFilters";
import { useMe } from "@/shared/hooks/useMe";
import { applicationService } from "@/lib/service/application/application.service";

import type { IApplication, IApplicationFilters } from "@/modules/application/types";
import { ApplicationListUi } from "./application-list.ui";

const APPLICATIONS_QUERY_KEY = "applications";
const DEFAULT_PAGE_SIZE = 10;

export const ApplicationList = () => {
  const { user } = useMe();

  const { pagination, setPage, setTotalItems, canGoNext, canGoPrev, getTotalPages } =
    usePagination(1, DEFAULT_PAGE_SIZE);

  const { sorting, updateSorting, clearSorting } = useSorting<IApplication>();

  const { filters, updateFilters, clearFilters, hasActiveFilters } =
    useFilters<IApplicationFilters>({});

  const sortField = sorting[0]?.field;
  const sortOrder = sorting[0]?.order;

  // Computed value for the "Sort by" select: "field_order" or ""
  const sortValue = sortField ? `${String(sortField)}_${sortOrder ?? "asc"}` : "";

  // Handler for the "Sort by" select — parses "field_order" and updates sorting hook
  const handleSortValueChange = useCallback(
    (value: string) => {
      clearSorting();
      if (!value) return;
      const lastUnderscore = value.lastIndexOf("_");
      const field = value.slice(0, lastUnderscore) as keyof IApplication;
      const order = value.slice(lastUnderscore + 1) as "asc" | "desc";
      // updateSorting adds with "asc" by default; call twice to reach "desc" if needed
      updateSorting(field);
      if (order === "desc") updateSorting(field);
    },
    [clearSorting, updateSorting]
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: [APPLICATIONS_QUERY_KEY, user?.id, pagination.page, pagination.limit, sortField, sortOrder, filters],
    queryFn: () =>
      applicationService.findAllByUserId({
        userId: user!.id,
        page: pagination.page,
        limit: pagination.limit,
        sortField,
        sortOrder,
        filters,
      }),
    enabled: !!user,
  });

  useEffect(() => {
    if (data?.data?.total !== undefined) {
      setTotalItems(data.data.total);
    }
  }, [data?.data?.total, setTotalItems]);

  // TODO: replace with mutation API call
  const handleToggleFavorite = useCallback((_id: number) => {
    // placeholder — will call API to toggle favorite
  }, []);

  // Reset to page 1 when filters or sort change
  useEffect(() => {
    setPage(1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, sortField, sortOrder]);

  return (
    <ApplicationListUi
      items={data?.data?.items ?? []}
      total={data?.data?.total ?? 0}
      isLoading={isLoading}
      isError={isError}
      pagination={pagination}
      onPageChange={setPage}
      canGoNext={canGoNext}
      canGoPrev={canGoPrev}
      getTotalPages={getTotalPages}
      sortValue={sortValue}
      onSortValueChange={handleSortValueChange}
      filters={filters}
      onFiltersChange={updateFilters}
      onClearFilters={clearFilters}
      hasActiveFilters={hasActiveFilters}
      onToggleFavorite={handleToggleFavorite}
    />
  );
};
