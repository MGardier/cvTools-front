import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";

import { usePagination } from "@/shared/hooks/usePagination";
import { offerService } from "@/lib/api/offer/offer.service";

import type { IOfferSearchFilters } from "@/modules/offer/types";
import { OfferListUi } from "./offer-list.ui";

const OFFERS_QUERY_KEY = "offers" as const;
const DEFAULT_PAGE_SIZE = 20;

export const OfferList = () => {
  const [page, setPageState] = useState(1);

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
    setPageState(1);
  }, [stagedFilters]);

  const handleRemoveFilter = useCallback(
    (key: keyof IOfferSearchFilters) => {
      if (key === "keyword") {
        setCommittedFilters((prev) => ({ ...prev, keyword: "" }));
        setStagedFilters((prev) => ({ ...prev, keyword: "" }));
        setHasSearched(false);
        setPageState(1);
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
      setPageState(1);
    },
    []
  );

  const handleClearFilters = useCallback(() => {
    setCommittedFilters({ keyword: "" });
    setStagedFilters({ keyword: "" });
    setHasSearched(false);
    setCityResetKey((k) => k + 1);
    setPageState(1);
  }, []);

  const hasActiveFilters = Object.values(committedFilters).some(
    (v) => v !== undefined && v !== ""
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: [OFFERS_QUERY_KEY, committedFilters, page, DEFAULT_PAGE_SIZE],
    queryFn: () =>
      offerService.search({
        page,
        limit: DEFAULT_PAGE_SIZE,
        filters: committedFilters,
      }),
    enabled: hasSearched && !!committedFilters.keyword.trim(),
  });

  const total = data?.data?.meta?.total;

  const { pagination, setPage, canGoNext, canGoPrev, getTotalPages } = usePagination({
    page,
    limit: DEFAULT_PAGE_SIZE,
    totalItems: total,
    onPageChange: setPageState,
  });

  return (
    <OfferListUi
      items={data?.data?.offers ?? []}
      total={total ?? 0}
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
