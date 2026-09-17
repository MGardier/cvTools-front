import { HomeIntro } from "./components/home-intro";
import { HomeSearchSection } from "./components/home-search-section";

import type { IOfferSearchFilters } from "@/modules/offer/types";

interface IConnectedHomeUiProps {
  stagedFilters: IOfferSearchFilters;
  cityResetKey: number;
  onStagedChange: (partial: Partial<IOfferSearchFilters>) => void;
  onSearch: () => void;
  onRemoveFilter: (key: keyof IOfferSearchFilters) => void;
  onClearFilters: () => void;
}

export const ConnectedHomeUi = ({
  stagedFilters,
  cityResetKey,
  onStagedChange,
  onSearch,
  onRemoveFilter,
  onClearFilters,
}: IConnectedHomeUiProps) => (
  <section className="px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-16 md:pb-20">
    <div className="max-w-[880px] mx-auto">
      <HomeIntro />

      <div className="flex flex-col gap-4 md:gap-5">
        <HomeSearchSection
          stagedFilters={stagedFilters}
          cityResetKey={cityResetKey}
          onStagedChange={onStagedChange}
          onSearch={onSearch}
          onRemoveFilter={onRemoveFilter}
          onClearFilters={onClearFilters}
        />
      </div>
    </div>
  </section>
);
