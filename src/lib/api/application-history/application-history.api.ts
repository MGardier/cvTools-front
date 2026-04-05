import { apiClient } from "@/lib/axios/axios";
import { ENDPOINTS } from "@/app/constants/endpoints";
import type { IApiResponse } from "@/shared/types/api";
import type { IApplicationHistory } from "@/shared/types/entity";
import type {
  ICreateApplicationHistoryParams,
  IUpdateApplicationHistoryParams,
} from "./types";

export const applicationHistoryApi = {
  async create(
    applicationId: number,
    data: ICreateApplicationHistoryParams,
  ): Promise<IApiResponse<IApplicationHistory>> {
    return await apiClient.post(ENDPOINTS.history(applicationId), data);
  },

  async findAll(
    applicationId: number,
  ): Promise<IApiResponse<IApplicationHistory[]>> {
    return await apiClient.get(ENDPOINTS.history(applicationId));
  },

  async update(
    applicationId: number,
    id: number,
    data: IUpdateApplicationHistoryParams,
  ): Promise<IApiResponse<IApplicationHistory>> {
    return await apiClient.patch(
      `${ENDPOINTS.history(applicationId)}/${id}`,
      data,
    );
  },

  async delete(applicationId: number, id: number): Promise<void> {
    await apiClient.delete(`${ENDPOINTS.history(applicationId)}/${id}`);
  },
};
