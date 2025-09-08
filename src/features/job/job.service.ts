import { jobApi } from "./job.api";
import type { CreateJobParams, CreateJobResponse, FindAllJobByUserResponse } from "./types/api";

export const jobService =  {

  /**************** CREATE ************************************************************/

  async create(data: CreateJobParams): Promise<CreateJobResponse> {
    return await jobApi.create(data);
  },


    async findAll(userId: number): Promise<FindAllJobByUserResponse> {
  
      return await jobApi.findAll(userId); 
    },

}