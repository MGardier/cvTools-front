import type { ApiResponse, FilterDataResponse } from "@/types/api";

import type z from "zod";
import type {  jobFormSchema } from "../schema/job-schema";
import type { Job } from "@/types/entity";



/**************************** CREATE **************************************************** */

export interface CreateJobParams extends z.infer<ReturnType<typeof jobFormSchema>>{
  userId : number
}

export interface CreateJobResponse extends ApiResponse {
  data: null
}

/**************************** UPDATE **************************************************** */

export interface UpdateJobParams extends CreateJobParams{
  jobId: number
}


/**************************** FIND ONE **************************************************** */

export interface FindJobByIdByUserResponse extends ApiResponse {
  data: Job
}

/**************************** FIND ALL **************************************************** */




export interface FindAllJobByUserResponse extends ApiResponse {
  data: FilterDataResponse<Job>
}
