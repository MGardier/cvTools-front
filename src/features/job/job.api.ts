
import { apiClient } from '@/api/axios';
import type { CreateJobParams, CreateJobResponse } from './types/api';





const ENDPOINT = { 
  job: '/job',
  user: '/user'
 } as const;

export const jobApi = {


  /**************** CREATE ************************************************************/

  async create(params: CreateJobParams): Promise<CreateJobResponse> {
    const {userId, ...rest} = params;
    return await apiClient.post(`${ENDPOINT.user}/${userId}${ENDPOINT.job}`, rest);
  },



}




