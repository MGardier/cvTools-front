import { useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { usePagination } from "@/shared/hooks/usePagination";
import { offerService } from "@/lib/api/offer/offer.service";

import type { IOfferSearchFilters } from "@/modules/offer/types";
import { OfferListUi } from "./offer-list.ui";

const OFFERS_QUERY_KEY = "offers" as const;
const DEFAULT_PAGE_SIZE = 20;

export const OfferList = () => {
  const { pagination, setPage, setTotalItems, canGoNext, canGoPrev, getTotalPages } =
    usePagination(1, DEFAULT_PAGE_SIZE);

  // Staged filters: what the user is currently editing in the form
  const [stagedFilters, setStagedFilters] = useState<IOfferSearchFilters>({ keyword: "" });

  // Committed filters: what was submitted via the search button
  const [committedFilters, setCommittedFilters] = useState<IOfferSearchFilters>({ keyword: "" });

  // Track whether user has searched at least once
  const [hasSearched, setHasSearched] = useState(false);

  // Counter to force CityAutocomplete remount on clear
  const [cityResetKey, setCityResetKey] = useState(0);

  const handleStagedChange = useCallback(
    (partial: Partial<IOfferSearchFilters>) => {
      setStagedFilters((prev) => ({ ...prev, ...partial }));
    },
    []
  );

  const handleSearch = useCallback(() => {
    if (stagedFilters.keyword.trim() === "") return;
    setCommittedFilters({ ...stagedFilters, keyword: stagedFilters.keyword.trim() });
    setHasSearched(true);
    setPage(1);
  }, [stagedFilters, setPage]);

  const handleRemoveFilter = useCallback(
    (key: keyof IOfferSearchFilters) => {
      if (key === "keyword") {
        setCommittedFilters((prev) => ({ ...prev, keyword: "" }));
        setStagedFilters((prev) => ({ ...prev, keyword: "" }));
        setHasSearched(false);
        setPage(1);
        return;
      }

      const keysToRemove: Exclude<keyof IOfferSearchFilters, "keyword">[] =
        key === "city" ? ["city", "postalCode"] : [key];

      setCommittedFilters((prev) => {
        const next = { ...prev };
        keysToRemove.forEach((k) => delete next[k]);
        return next;
      });
      setStagedFilters((prev) => {
        const next = { ...prev };
        keysToRemove.forEach((k) => delete next[k]);
        return next;
      });
      if (key === "city") setCityResetKey((k) => k + 1);
      setPage(1);
    },
    [setPage]
  );

  const handleClearFilters = useCallback(() => {
    setCommittedFilters({ keyword: "" });
    setStagedFilters({ keyword: "" });
    setHasSearched(false);
    setCityResetKey((k) => k + 1);
    setPage(1);
  }, [setPage]);

  const hasActiveFilters = Object.values(committedFilters).some(
    (v) => v !== undefined && v !== ""
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: [OFFERS_QUERY_KEY, committedFilters, pagination.page, pagination.limit],
    queryFn: () =>
      offerService.search({
        page: pagination.page,
        limit: pagination.limit,
        filters: committedFilters,
      }),
    enabled: hasSearched && !!committedFilters.keyword.trim(),
  });

  useEffect(() => {
    if (data?.data?.meta?.total !== undefined) {
      setTotalItems(data.data.meta.total);
    }
  }, [data?.data?.meta?.total, setTotalItems]);

  return (
    <OfferListUi
      items={data?.data?.offers ?? []}
      total={data?.data?.meta?.total ?? 0}
      isLoading={isLoading && hasSearched}
      isError={isError}
      hasSearched={hasSearched}
      pagination={pagination}
      onPageChange={setPage}
      canGoNext={canGoNext}
      canGoPrev={canGoPrev}
      getTotalPages={getTotalPages}
      stagedFilters={stagedFilters}
      committedFilters={committedFilters}
      onStagedChange={handleStagedChange}
      onSearch={handleSearch}
      onRemoveFilter={handleRemoveFilter}
      onClearFilters={handleClearFilters}
      hasActiveFilters={hasActiveFilters}
      cityResetKey={cityResetKey}
    />
  );
};
