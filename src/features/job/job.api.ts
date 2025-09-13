
import { apiClient } from '@/api/axios';
import type { CreateJobParams, CreateJobResponse, FindAllJobByUserResponse, FindJobByIdByUserResponse } from './types/api';






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


  async findAll(userId: number): Promise<FindAllJobByUserResponse> {
    return  await apiClient.get(`${ENDPOINT.user}/${userId}${ENDPOINT.job}`);

  },

  async findOneById(id: number, userId:number): Promise<FindJobByIdByUserResponse>{
    return  await apiClient.get(`${ENDPOINT.user}/${userId}${ENDPOINT.job}/${id}`);

  }
  

}




