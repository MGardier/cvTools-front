import type { Job } from "@/types/entity";
import { jobApi } from "./job.api";
import type { CreateJobParams, UpdateJobParams } from "./types/api";




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

  async findAll(userId: number): Promise<Job[]> {
    const response = await jobApi.findAll(userId);
    return response.data;
  },




}