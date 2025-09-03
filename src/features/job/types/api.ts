import type { ApiResponse } from "@/types/api";
import type { CreateJobData } from "./form";

export interface CreateJobParams extends CreateJobData{
  userId : number
}



export interface CreateJobResponse extends ApiResponse {
  data: null
}
