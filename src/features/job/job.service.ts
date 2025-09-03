import { jobApi } from "./job.api";
import type { CreateJobParams, CreateJobResponse } from "./types/api";

export const jobService =  {

  /**************** CREATE ************************************************************/

  async create(data: CreateJobParams): Promise<CreateJobResponse> {
    return await jobApi.create(data);
  },


}