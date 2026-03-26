import { apiClient } from "@/lib/axios/axios";
import { ENDPOINTS } from "@/app/constants/endpoints";
import type { IApiResponse } from "@/shared/types/api";
import type { IApplication } from "@/shared/types/entity";
import type { IGetApplicationsResponse } from "@/modules/application/types";
import type {
  ICreateApplicationParams,
  IFlatApplicationQueryParams,
} from "./types";

export const applicationApi = {


  // =============================================================================
  //                               CREATE
  // =============================================================================
  async create(
    data: ICreateApplicationParams
  ): Promise<IApiResponse<IApplication>> {
    return await apiClient.post(ENDPOINTS.application, data);
  },

  // =============================================================================
  //                               FIND
  // =============================================================================
  async findAllByUserId(
    params: IFlatApplicationQueryParams
  ): Promise<IApiResponse<IGetApplicationsResponse>> {
    return await apiClient.get(ENDPOINTS.application, { params });
  },
};
