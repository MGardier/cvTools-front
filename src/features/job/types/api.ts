import type { ApiResponse } from "@/types/api";

import type z from "zod";
import type { createJobSchema } from "../schema/job-schema";

export interface CreateJobParams extends z.infer<ReturnType<typeof createJobSchema>>{
  userId : number
}



export interface CreateJobResponse extends ApiResponse {
  data: null
}
