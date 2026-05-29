import { apiClient } from "@/lib/axios/axios";
import { ENDPOINTS } from "@/app/constants/endpoints";
import type { IApiResponse } from "@/shared/types/api";
import type { IUserHomeData } from "@/modules/home/types";

export const homeApi = {
  async getHomeData(): Promise<IApiResponse<IUserHomeData>> {
    return await apiClient.get(ENDPOINTS.userHome);
  },
};
