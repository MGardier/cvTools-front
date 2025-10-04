import type { Job } from "@/types/entity";
import { jobApi } from "./job.api";
import type { CreateJobParams, UpdateJobParams } from "./types/api";
import type {  FilterDataResponse } from "@/types/api";
import type {  IFindAllJobParams } from "./types/data-table";




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

  async findAll(userId: number, params  : IFindAllJobParams ): Promise<FilterDataResponse<Job>> {
    const {sorting, ...restParams} = params
    //retirer limit , sort dans un  util 
    const filterParams = {

      ...(sorting.length >0 ? {sort: (sorting.map((sortItem)=> `${sortItem.field}:${sortItem.order}`)).join()}: {}),

  
    };

    const response = await jobApi.findAll(userId,{...filterParams,...restParams});
    return response.data;
  },




}