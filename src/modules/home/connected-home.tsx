import { useOfferSearchStaging } from "@/modules/offer/hooks/use-offer-search-staging";
import { ConnectedHomeUi } from "./connected-home.ui";

export const ConnectedHome = () => {
  const offerSearch = useOfferSearchStaging();

  return (
    <ConnectedHomeUi
      stagedFilters={offerSearch.stagedFilters}
      cityResetKey={offerSearch.cityResetKey}
      onStagedChange={offerSearch.onStagedChange}
      onSearch={offerSearch.onSearch}
      onRemoveFilter={offerSearch.onRemoveFilter}
      onClearFilters={offerSearch.onClearFilters}
    />
  );
};
