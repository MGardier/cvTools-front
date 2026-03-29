
import { useCallback, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { usePagination } from "@/shared/hooks/usePagination";
import { useSorting } from "@/shared/hooks/useSorting";
import { useFilters } from "@/shared/hooks/useFilters";
import { useMe } from "@/shared/hooks/useMe";
import { applicationService } from "@/lib/api/application/application.service";

import type { IApplication, IApplicationFilters } from "@/modules/application/types";
import { ApplicationListUi } from "./application-list.ui";

const APPLICATIONS_QUERY_KEY = "applications" as const;
const DEFAULT_PAGE_SIZE = 10;

export const ApplicationList = () => {
  const queryClient = useQueryClient();
  const { user } = useMe();

  const { pagination, setPage, setTotalItems, canGoNext, canGoPrev, getTotalPages } =
    usePagination(1, DEFAULT_PAGE_SIZE);

  const { sorting, updateSorting, clearSorting } = useSorting<IApplication>();

  const { filters, updateFilters, clearFilters, hasActiveFilters } =
    useFilters<IApplicationFilters>({});

  const sortField = sorting[0]?.field;
  const sortDirection = sorting[0]?.order;

  // Computed value for the "Sort by" select: "field_direction" or ""
  const sortValue = sortField ? `${String(sortField)}_${sortDirection ?? "asc"}` : "";

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
      setPage(1);
    },
    [clearSorting, updateSorting, setPage]
  );

  const handleFiltersChange = useCallback(
    (partial: Partial<IApplicationFilters>) => {
      updateFilters(partial);
      setPage(1);
    },
    [updateFilters, setPage]
  );

  const handleClearFilters = useCallback(() => {
    clearFilters();
    setPage(1);
  }, [clearFilters, setPage]);

  const { data, isLoading, isError } = useQuery({
    queryKey: [APPLICATIONS_QUERY_KEY, user?.id, pagination.page, pagination.limit, sortField, sortDirection, filters],
    queryFn: () =>
      applicationService.findAllByUserId({
        page: pagination.page,
        limit: pagination.limit,
        sortField,
        sortDirection,
        filters,
      }),
    enabled: !!user,
  });

  useEffect(() => {
    if (data?.data?.total !== undefined) {
      setTotalItems(data.data.total);
    }
  }, [data?.data?.total, setTotalItems]);

  const toggleFavoriteMutation = useMutation({
    mutationFn: ({ id, isFavorite }: { id: number; isFavorite: boolean }) =>
      applicationService.toggleFavorite(id, isFavorite),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [APPLICATIONS_QUERY_KEY] });
    },
  });

  const handleToggleFavorite = useCallback(
    (id: number) => {
      const item = data?.data?.items?.find((app) => app.id === id);
      if (!item) return;
      toggleFavoriteMutation.mutate({ id, isFavorite: !item.isFavorite });
    },
    [data?.data?.items, toggleFavoriteMutation]
  );

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
      onFiltersChange={handleFiltersChange}
      onClearFilters={handleClearFilters}
      hasActiveFilters={hasActiveFilters}
      onToggleFavorite={handleToggleFavorite}
    />
  );
};
