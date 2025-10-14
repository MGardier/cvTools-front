
import { apiClient } from '@/api/axios';
import type { ICreateJobParams, IUpdateJobParams,  } from './types/api';
import { ENDPOINTS } from '@/data/endpoints';
import type { Job } from '@/types/entity';
import type { IFilterDataResponse, IFilterParams } from '@/types/api';
import type { IFiltersJob } from './types/hook';




export const jobApi = {

  async create(userId: number ,data: Omit<ICreateJobParams,'userId'>): Promise<Job> {
    const response =  await apiClient.post(`${ENDPOINTS.user}/${userId}${ENDPOINTS.job}`, data);
    return response.data;
  },

  async update(jobId: number, userId: number ,data: Omit<IUpdateJobParams, 'jobId' | 'userId'>): Promise<Job> {
    const response =  await apiClient.put(`${ENDPOINTS.user}/${userId}${ENDPOINTS.job}/${jobId}`, data);
    return response.data;
  },

  async findAll(userId: number, filterParams : IFilterParams<IFiltersJob>): Promise<IFilterDataResponse<Job>> {
    const response =  await apiClient.get(`${ENDPOINTS.user}/${userId}${ENDPOINTS.job}`,{params : filterParams});
    return response.data;

  },

  async findOneById(id: number, userId: number): Promise<Job> {
    const response =   await apiClient.get(`${ENDPOINTS.user}/${userId}${ENDPOINTS.job}/${id}`);
    return response.data;

  }

}




