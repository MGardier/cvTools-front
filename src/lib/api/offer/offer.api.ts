import { apiClient } from "@/lib/axios/axios";
import { ENDPOINTS } from "@/app/constants/endpoints";
import type { IApiResponse } from "@/shared/types/api";
import type { IAggregatedSearchResponse } from "@/modules/offer/types";
import type { ISearchOfferQuery } from "./types";

export const offerApi = {
  async search(
    params: ISearchOfferQuery
  ): Promise<IApiResponse<IAggregatedSearchResponse>> {
    return await apiClient.get(ENDPOINTS.offer, { params });
  },
};
