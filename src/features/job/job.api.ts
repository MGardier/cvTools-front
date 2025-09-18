
import { apiClient } from '@/api/axios';
import type { CreateJobParams, CreateJobResponse, FindAllJobByUserResponse, UpdateJobParams,  } from './types/api';
import { ENDPOINTS } from '@/data/endpoints';
import type { Job } from '@/types/entity';



export const jobApi = {


  /**************** CREATE ************************************************************/

  async create(userId: number ,data: Omit<CreateJobParams,'userId'>): Promise<CreateJobResponse> {
    return await apiClient.post(`${ENDPOINTS.user}/${userId}${ENDPOINTS.job}`, data);
  },

  /**************** UPDATE ************************************************************/

  async update(jobId: number, userId: number ,data: Omit<UpdateJobParams, 'jobId' | 'userId'>): Promise<Job> {
    return await apiClient.put(`${ENDPOINTS.user}/${userId}${ENDPOINTS.job}/${jobId}`, data);
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




