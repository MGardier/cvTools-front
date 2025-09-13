import type { Job } from "@/types/entity";
import { jobApi } from "./job.api";
import type { CreateJobParams, CreateJobResponse } from "./types/api";

export const jobService =  {

  /**************** CREATE  METHOD ************************************************************/

  async create(data: CreateJobParams): Promise<CreateJobResponse> {
    return await jobApi.create(data);
  },
  

  /**************** FIND METHOD  ************************************************************/
  
  async findOneById(id: number, userId: number): Promise<Job>{

    const {data} =   await jobApi.findOneById(id,userId); 
    return data;
  },

    async findAll(userId: number): Promise<Job[]> {
      const {data} = await jobApi.findAll(userId); 
      return data;
    },

}