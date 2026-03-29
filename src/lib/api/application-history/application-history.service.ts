import type { IApiResponse } from "@/shared/types/api";
import type { IApplicationHistory } from "@/shared/types/entity";
import { applicationHistoryApi } from "./application-history.api";
import type {
  ICreateApplicationHistoryParams,
  IUpdateApplicationHistoryParams,
} from "./types";

export const applicationHistoryService = {
  async create(
    applicationId: number,
    data: ICreateApplicationHistoryParams,
  ): Promise<IApiResponse<IApplicationHistory>> {
    return applicationHistoryApi.create(applicationId, data);
  },

  async findAll(
    applicationId: number,
  ): Promise<IApiResponse<IApplicationHistory[]>> {
    return applicationHistoryApi.findAll(applicationId);
  },

  async update(
    applicationId: number,
    id: number,
    data: IUpdateApplicationHistoryParams,
  ): Promise<IApiResponse<IApplicationHistory>> {
    return applicationHistoryApi.update(applicationId, id, data);
  },

  async delete(applicationId: number, id: number): Promise<void> {
    return applicationHistoryApi.delete(applicationId, id);
  },
};
