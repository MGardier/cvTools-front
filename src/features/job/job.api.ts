
import { apiClient } from '@/api/axios';
import type { CreateJobParams, CreateJobResponse, FindAllJobByUserResponse, UpdateJobParams,  } from './types/api';
import { ENDPOINTS } from '@/data/endpoints';
import type { Job } from '@/types/entity';



export const jobApi = {


  /**************** CREATE ************************************************************/

  async create(params: CreateJobParams): Promise<CreateJobResponse> {
    const { userId, ...rest } = params;
    return await apiClient.post(`${ENDPOINTS.user}/${userId}${ENDPOINTS.job}`, rest);
  },



  /**************** UPDATE ************************************************************/

  async update(params: UpdateJobParams): Promise<Job> {

    const { userId, jobId, ...rest } = params;
    const response = await apiClient.put(`${ENDPOINTS.user}/${userId}${ENDPOINTS.job}/${jobId}`, rest);
    return response.data;

  },

  /**************** FIND ************************************************************/

  async findAll(userId: number): Promise<FindAllJobByUserResponse> {
    return await apiClient.get(`${ENDPOINTS.user}/${userId}${ENDPOINTS.job}`);

  },

  async findOneById(id: number, userId: number): Promise<Job> {
    const response =  await apiClient.get(`${ENDPOINTS.user}/${userId}${ENDPOINTS.job}/${id}`);
    return response.data;

  }


}




