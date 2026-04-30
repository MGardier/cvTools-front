import type { IApiResponse } from "@/shared/types/api";
import type { ISearchOffersParams, IAggregatedSearchResponse } from "@/modules/offer/types";
import { offerApi } from "./offer.api";

export const offerService = {
  async search(
    params: ISearchOffersParams
  ): Promise<IApiResponse<IAggregatedSearchResponse>> {
    const { page, limit, filters } = params;

    return offerApi.search({
      page,
      limit,
      ...(filters.keyword && { keyword: filters.keyword }),
      ...(filters.city && { city: filters.city }),
      ...(filters.postalCode && { postalCode: filters.postalCode }),
      ...(filters.contractType && { contractType: filters.contractType }),
      ...(filters.remote && { remote: filters.remote }),
      ...(filters.experience && { experience: filters.experience }),
      ...(filters.publishedSince && { publishedSince: filters.publishedSince }),
    });
  },
};
