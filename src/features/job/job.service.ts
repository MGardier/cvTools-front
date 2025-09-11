import { jobApi } from "./job.api";
import type { CreateJobParams, CreateJobResponse, FindAllJobByUserResponse, FindJobByIdByUserResponse } from "./types/api";

export const jobService =  {

  /**************** CREATE ************************************************************/

  async create(data: CreateJobParams): Promise<CreateJobResponse> {
    return await jobApi.create(data);
  },
  
  async findOneById(id: number, userId: number): Promise<FindJobByIdByUserResponse>{
    return await jobApi.findOneById(id,userId); 
  },

    async findAll(userId: number): Promise<FindAllJobByUserResponse> {
  
      return await jobApi.findAll(userId); 
    },

}