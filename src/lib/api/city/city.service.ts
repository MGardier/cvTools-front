import type { ICitySearchItem, ICitySearchQuery } from "./city.types";
import type { IApiResponse } from "@/shared/types/api";
import { cityApi } from "./city.api";

export const cityService = {
  async search({
    city,
    postalCode,
    limit = 8,
  }: ICitySearchQuery): Promise<IApiResponse<ICitySearchItem[]>> {
    return cityApi.search({ city, postalCode, limit });
  },
};
