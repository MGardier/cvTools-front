import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { usePagination } from "@/shared/hooks/usePagination";
import { offerService } from "@/lib/api/offer/offer.service";

import { useResetKey } from "@/shared/hooks/useResetKey";
import type { IOfferSearchFilters } from "@/modules/offer/types";
import {
  parseOfferUrlState,
  serializeOfferUrlState,
} from "@/modules/offer/utils/offer-search-params";
import { OfferListUi } from "./offer-list.ui";

const OFFERS_QUERY_KEY = "offers" as const;
const DEFAULT_PAGE_SIZE = 20;

export const OfferList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Hydrate state from URL on initial mount only (read-once via lazy initializer)
  const [initialState] = useState(() => parseOfferUrlState(searchParams));

  const [page, setPageState] = useState<number>(initialState.page);
  const [stagedFilters, setStagedFilters] = useState<IOfferSearchFilters>(
    initialState.filters,
  );
  const [committedFilters, setCommittedFilters] = useState<IOfferSearchFilters>(
    initialState.filters,
  );
  const [hasSearched, setHasSearched] = useState<boolean>(
    initialState.filters.keyword.trim() !== "",
  );
  const [cityResetKey, bumpResetKey] = useResetKey();

  // Track the URL we last wrote, so the resync effect can ignore our own writes
  const lastSyncedUrlRef = useRef<string>(
    serializeOfferUrlState(initialState.filters, initialState.page).toString(),
  );

  const syncUrl = useCallback(
    (filters: IOfferSearchFilters, nextPage: number) => {
      const next = serializeOfferUrlState(filters, nextPage);
      lastSyncedUrlRef.current = next.toString();
      setSearchParams(next, { replace: true });
    },
    [setSearchParams],
  );

  // Resync state when URL changes externally (browser back/forward, manual edit),
  // and normalize the URL to its canonical form when needed (mount with reordered
  // params, manual edits, unknown extra params).
  useEffect(() => {
    const currentUrl = searchParams.toString();
    if (currentUrl === lastSyncedUrlRef.current) return;

    const fromUrl = parseOfferUrlState(searchParams);
    const canonicalUrl = serializeOfferUrlState(fromUrl.filters, fromUrl.page);
    const canonicalStr = canonicalUrl.toString();

    // If the canonical form matches what we last synced, the URL is just a
    // non-canonical representation of the same state — normalize without touching state.
    const stateMatchesUrl = canonicalStr === lastSyncedUrlRef.current;

    if (!stateMatchesUrl) {
      setStagedFilters(fromUrl.filters);
      setCommittedFilters(fromUrl.filters);
      setPageState(fromUrl.page);
      setHasSearched(fromUrl.filters.keyword.trim() !== "");
      bumpResetKey();
    }

    if (canonicalStr !== currentUrl) {
      lastSyncedUrlRef.current = canonicalStr;
      setSearchParams(canonicalUrl, { replace: true });
    } else {
      lastSyncedUrlRef.current = currentUrl;
    }
  }, [searchParams, setSearchParams, bumpResetKey]);

  const handleStagedChange = useCallback(
    (partial: Partial<IOfferSearchFilters>) => {
      setStagedFilters((prev) => ({ ...prev, ...partial }));
    },
    [],
  );

  const handleSearch = useCallback(() => {
    if (stagedFilters.keyword.trim() === "") return;
    const next: IOfferSearchFilters = {
      ...stagedFilters,
      keyword: stagedFilters.keyword.trim(),
    };
    setCommittedFilters(next);
    setHasSearched(true);
    setPageState(1);
    syncUrl(next, 1);
  }, [stagedFilters, syncUrl]);

  const handleRemoveFilter = useCallback(
    (key: keyof IOfferSearchFilters) => {
      if (key === "keyword") {
        const next: IOfferSearchFilters = { ...committedFilters, keyword: "" };
        setCommittedFilters(next);
        setStagedFilters((prev) => ({ ...prev, keyword: "" }));
        setHasSearched(false);
        setPageState(1);
        syncUrl(next, 1);
        return;
      }

      const keysToRemove: Exclude<keyof IOfferSearchFilters, "keyword">[] =
        key === "cityName"
          ? ["cityName", "cityCode", "departmentCode", "regionCode", "postalCode"]
          : [key];

      const nextCommitted: IOfferSearchFilters = { ...committedFilters };
      keysToRemove.forEach((k) => delete nextCommitted[k]);

      setCommittedFilters(nextCommitted);
      setStagedFilters((prev) => {
        const next = { ...prev };
        keysToRemove.forEach((k) => delete next[k]);
        return next;
      });
      if (key === "cityName") bumpResetKey();
      setPageState(1);
      syncUrl(nextCommitted, 1);
    },
    [committedFilters, syncUrl, bumpResetKey],
  );

  const handleClearFilters = useCallback(() => {
    const next: IOfferSearchFilters = { keyword: "" };
    setCommittedFilters(next);
    setStagedFilters(next);
    setHasSearched(false);
    bumpResetKey();
    setPageState(1);
    syncUrl(next, 1);
  }, [syncUrl, bumpResetKey]);

  const handlePageChange = useCallback(
    (newPage: number) => {
      setPageState(newPage);
      syncUrl(committedFilters, newPage);
    },
    [committedFilters, syncUrl],
  );

  const hasActiveFilters = Object.values(committedFilters).some(
    (v) => v !== undefined && v !== "",
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: [OFFERS_QUERY_KEY, committedFilters, page, DEFAULT_PAGE_SIZE],
    queryFn: () =>
      offerService.search({
        page,
        limit: DEFAULT_PAGE_SIZE,
        filters: committedFilters,
      }),
    enabled: hasSearched,
  });

  const total = data?.data?.meta?.total;

  const { pagination, setPage, canGoNext, canGoPrev, getTotalPages } =
    usePagination({
      page,
      limit: DEFAULT_PAGE_SIZE,
      totalItems: total,
      onPageChange: handlePageChange,
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
