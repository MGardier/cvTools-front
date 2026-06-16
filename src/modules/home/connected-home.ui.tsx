import { HomeIntro } from "./components/home-intro";
import { HomeSearchSection } from "./components/home-search-section";
import { HomeApplicationsSection } from "./components/home-applications-section";
import { HomeTasksSection } from "./components/home-tasks-section";

import type { IUserHomeData } from "@/modules/home/types";
import type { IOfferSearchFilters } from "@/modules/offer/types";

interface IConnectedHomeUiProps {
  homeData: IUserHomeData;
  stagedFilters: IOfferSearchFilters;
  cityResetKey: number;
  onStagedChange: (partial: Partial<IOfferSearchFilters>) => void;
  onSearch: () => void;
  onRemoveFilter: (key: keyof IOfferSearchFilters) => void;
  onClearFilters: () => void;
  onToggleFavorite: (id: number) => void;
  onDeleteApplication: (id: number) => void;
}

export const ConnectedHomeUi = ({
  homeData,
  stagedFilters,
  cityResetKey,
  onStagedChange,
  onSearch,
  onRemoveFilter,
  onClearFilters,
  onToggleFavorite,
  onDeleteApplication,
}: IConnectedHomeUiProps) => (
  <section className="px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-16 md:pb-20">
    <div className="max-w-[880px] mx-auto">
      <HomeIntro
        applicationCounts={homeData.applicationCounts}
        todoCounts={homeData.todoCounts}
      />

      <div className="flex flex-col gap-4 md:gap-5">
        <HomeSearchSection
          stagedFilters={stagedFilters}
          cityResetKey={cityResetKey}
          onStagedChange={onStagedChange}
          onSearch={onSearch}
          onRemoveFilter={onRemoveFilter}
          onClearFilters={onClearFilters}
        />

        <HomeApplicationsSection
          counts={homeData.applicationCounts}
          recentApplications={homeData.recentApplications}
          onToggleFavorite={onToggleFavorite}
          onDelete={onDeleteApplication}
        />

        <HomeTasksSection
          counts={homeData.todoCounts}
          recentTodos={homeData.recentTodos}
        />
      </div>
    </div>
  </section>
);
