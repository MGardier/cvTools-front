import { apiClient } from "@/lib/axios/axios";
import { ENDPOINTS } from "@/app/constants/endpoints";
import type { ICitySearchItem } from "./city.types";
import type { IApiResponse } from "@/shared/types/api";

export const cityApi = {
  async search(
    params: Record<string, unknown>
  ): Promise<IApiResponse<ICitySearchItem[]>> {
    return await apiClient.get(ENDPOINTS.city, { params });
  },
};
