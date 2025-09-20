import type { Job } from "@/types/entity";
import { jobApi } from "./job.api";
import type { CreateJobParams, UpdateJobParams } from "./types/api";
import type { FilterDataResponse, FilterOptions } from "@/types/api";




export const JobService = {

  /**************** CREATE ************************************************************/

  async create(params: CreateJobParams): Promise<void> {
    const { userId, ...data } = params;
     await jobApi.create(userId,data);
     return ;
  },


  /**************** UPDATE ************************************************************/
  
  async update(params: UpdateJobParams): Promise<void> {
    const { userId, jobId, ...data } = params;
    await jobApi.update(jobId,userId,data)
    return;

  },

  /**************** FIND ALL ************************************************************/

  async findAll(userId: number, filterOptions  : FilterOptions ): Promise<FilterDataResponse<Job>> {
    const {limit,page} = filterOptions
    const filterParams = {
      ...(limit ? {limit }: {limit: 6} ),
      ...(page ? {page }: {page: 1} )
    };

    const response = await jobApi.findAll(userId,filterParams);
    return response.data;
  },




}