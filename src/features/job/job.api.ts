
import { apiClient } from '@/api/axios';
import type { CreateJobParams, CreateJobResponse, FindAllJobByUserResponse, UpdateJobParams,  } from './types/api';
import { ENDPOINTS } from '@/data/endpoints';
import type { Job } from '@/types/entity';
import type { FilterParams } from '@/types/api';





export const jobApi = {

  async create(userId: number ,data: Omit<CreateJobParams,'userId'>): Promise<CreateJobResponse> {
    return await apiClient.post(`${ENDPOINTS.user}/${userId}${ENDPOINTS.job}`, data);
  },

  async update(jobId: number, userId: number ,data: Omit<UpdateJobParams, 'jobId' | 'userId'>): Promise<Job> {
    return await apiClient.put(`${ENDPOINTS.user}/${userId}${ENDPOINTS.job}/${jobId}`, data);
  },

  async findAll(userId: number, filterParams : FilterParams): Promise<FindAllJobByUserResponse> {
    return await apiClient.get(`${ENDPOINTS.user}/${userId}${ENDPOINTS.job}`,{params : filterParams});

  },

  async findOneById(id: number, userId: number): Promise<Job> {
    const response =  await apiClient.get(`${ENDPOINTS.user}/${userId}${ENDPOINTS.job}/${id}`);
    return response.data;

  }

}




