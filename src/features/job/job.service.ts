import type { Job } from "@/types/entity";
import { jobApi } from "./job.api";
import type { CreateJobParams, UpdateJobParams } from "./types/api";
import type {  FilterDataResponse } from "@/types/api";
import type { DataTableParams } from "@/types/data-table";




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

  async findAll(userId: number, params  : DataTableParams ): Promise<FilterDataResponse<Job>> {
    const {limit,currentPage,sorting} = params
    //retiret limit , sortir util 
    const filterParams = {
      ...(limit ? {limit }: {limit: 6} ),
      ...(currentPage ? {page: currentPage }: {page: 1} ),
      ...(sorting.length >0 ? {sort: (sorting.map((sortItem)=> `${sortItem.field}:${sortItem.direction}`)).join()}: {})
    };

    const response = await jobApi.findAll(userId,filterParams);
    return response.data;
  },




}