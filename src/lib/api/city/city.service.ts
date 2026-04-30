import type { ICitySearchItem } from "./city.types";
import type { IApiResponse } from "@/shared/types/api";
import { cityApi } from "./city.api";

export const cityService = {
  async search(city: string, limit : number = 8): Promise<IApiResponse<ICitySearchItem[]>> {
    return cityApi.search({ city, limit });
  },
};
