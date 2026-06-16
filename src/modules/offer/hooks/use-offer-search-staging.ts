import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "@/app/constants/routes";
import { useResetKey } from "@/shared/hooks/useResetKey";
import type { IOfferSearchFilters } from "@/modules/offer/types";
import { serializeOfferUrlState } from "@/modules/offer/utils/offer-search-params";

/**
 * Staged offer-search filters + handlers, shared by the public and connected
 * home pages. Submitting navigates to the offer list with serialized params.
 */
export const useOfferSearchStaging = () => {
  const navigate = useNavigate();

  const [stagedFilters, setStagedFilters] = useState<IOfferSearchFilters>({
    keyword: "",
  });
  const [cityResetKey, bumpResetKey] = useResetKey();

  const handleStagedChange = useCallback(
    (partial: Partial<IOfferSearchFilters>) => {
      setStagedFilters((prev) => ({ ...prev, ...partial }));
    },
    [],
  );

  const handleSearch = useCallback(() => {
    const keyword = stagedFilters.keyword.trim();
    if (keyword === "") return;
    const params = serializeOfferUrlState({ ...stagedFilters, keyword }, 1);
    navigate(`${ROUTES.offer.list}?${params.toString()}`);
  }, [stagedFilters, navigate]);

  const handleRemoveFilter = useCallback(
    (key: keyof IOfferSearchFilters) => {
      if (key === "keyword") {
        setStagedFilters((prev) => ({ ...prev, keyword: "" }));
        return;
      }
      const keysToRemove: Exclude<keyof IOfferSearchFilters, "keyword">[] =
        key === "cityName"
          ? ["cityName", "cityCode", "departmentCode", "regionCode", "postalCode"]
          : [key];

      setStagedFilters((prev) => {
        const next = { ...prev };
        keysToRemove.forEach((k) => delete next[k]);
        return next;
      });
      if (key === "cityName") bumpResetKey();
    },
    [bumpResetKey],
  );

  const handleClearFilters = useCallback(() => {
    setStagedFilters({ keyword: "" });
    bumpResetKey();
  }, [bumpResetKey]);

  return {
    stagedFilters,
    cityResetKey,
    onStagedChange: handleStagedChange,
    onSearch: handleSearch,
    onRemoveFilter: handleRemoveFilter,
    onClearFilters: handleClearFilters,
  };
};
