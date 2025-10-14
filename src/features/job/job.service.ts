import type { Job } from "@/types/entity";
import { jobApi } from "./job.api";
import type { ICreateJobParams, IUpdateJobParams } from "./types/api";
import type { IFilterDataResponse } from "@/types/api";
import type { IFindAllJobParams } from "./types/data-table";

export const JobService = {
  
  async create(params: ICreateJobParams): Promise<void> {
    const { userId, ...data } = params;
     await jobApi.create(userId, data);
  },

  async update(params: IUpdateJobParams): Promise<void> {
    const { userId, jobId, ...data } = params;
     await jobApi.update(jobId, userId, data);
  },

  async findAll(userId: number, params: IFindAllJobParams): Promise<IFilterDataResponse<Job>> {
    const { sorting, filters, page, limit } = params;

    const queryParams = {
      page,
      limit,
      ...(sorting.length > 0 && {
        sort: sorting.map((sortItem) => `${sortItem.field}:${sortItem.order}`).join(',')
      }),
      ...Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== undefined && value !== null)
      )
    };

    return await jobApi.findAll(userId, queryParams);
  }
};
