import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";

import { OfferTableFilters } from "@/modules/offer/components/offer-table-filters";
import { HomeSectionCard } from "./home-section-card";

import type { IOfferSearchFilters } from "@/modules/offer/types";

interface IHomeSearchSectionProps {
  stagedFilters: IOfferSearchFilters;
  cityResetKey: number;
  onStagedChange: (partial: Partial<IOfferSearchFilters>) => void;
  onSearch: () => void;
  onRemoveFilter: (key: keyof IOfferSearchFilters) => void;
  onClearFilters: () => void;
}

export const HomeSearchSection = ({
  stagedFilters,
  cityResetKey,
  onStagedChange,
  onSearch,
  onRemoveFilter,
  onClearFilters,
}: IHomeSearchSectionProps) => {
  const { t } = useTranslation("home");

  return (
    <HomeSectionCard
      icon={<Search className="w-4 h-4 md:w-5 md:h-5" />}
      title={t("connected.search.title")}
    >
      <OfferTableFilters
        stagedFilters={stagedFilters}
        committedFilters={stagedFilters}
        onStagedChange={onStagedChange}
        onSearch={onSearch}
        onRemoveFilter={onRemoveFilter}
        onClearFilters={onClearFilters}
        hasActiveFilters={false}
        cityResetKey={cityResetKey}
        hideAdvancedFilters
      />
    </HomeSectionCard>
  );
};
