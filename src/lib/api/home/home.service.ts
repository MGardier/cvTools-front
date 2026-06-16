import type { IApiResponse } from "@/shared/types/api";
import type { IUserHomeData } from "@/modules/home/types";
import { homeApi } from "./home.api";

export const homeService = {
  async getHomeData(): Promise<IApiResponse<IUserHomeData>> {
    return homeApi.getHomeData();
  },
};
