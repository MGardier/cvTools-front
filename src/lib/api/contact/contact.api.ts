

import { apiClient } from '@/lib/axios/axios';
import { ENDPOINTS } from '@/app/constants/endpoints';
import type { TCreateContactParams, TUpdateContactParams } from './types';
import type { IContact } from '@/shared/types/entity';
import type { IApiResponse } from '@/shared/types/api';



export const contactApi = {

  // =============================================================================
  //                               CREATE
  // =============================================================================

  async create(params: TCreateContactParams): Promise<IApiResponse<IContact>> {
    return await apiClient.post(`${ENDPOINTS.contact}`, params);
  },

  // =============================================================================
  //                               UPDATE
  // =============================================================================

  async update(id: number, params: TUpdateContactParams): Promise<IApiResponse<IContact>> {
    return await apiClient.patch(`${ENDPOINTS.contact}/${id}`, params);
  },

  // =============================================================================
  //                               DELETE
  // =============================================================================

  async delete(contactId: number): Promise<IApiResponse<void>> {
    return await apiClient.delete(`${ENDPOINTS.contact}/${contactId}`);
  },

  // =============================================================================
  //                              FIND
  // =============================================================================

  async findAll(search?: string): Promise<IApiResponse<IContact[]>> {
    return await apiClient.get(`${ENDPOINTS.contact}`, {
      ...(search && { params: { search } }),
    });
  },

  async findAllByApplicationId(applicationId: number): Promise<IApiResponse<IContact[]>> {
    return await apiClient.get(`${ENDPOINTS.contact}${ENDPOINTS.application}/${applicationId}`);
  },

  async findOneById(contactId: number): Promise<IApiResponse<IContact>> {
    return await apiClient.get(`${ENDPOINTS.contact}/${contactId}`);
  },

  // =============================================================================
  //                            RELATION
  // =============================================================================

  async linkToApplication(contactId: number, applicationId: number): Promise<void> {
    return await apiClient.post(`${ENDPOINTS.contact}/${contactId}${ENDPOINTS.application}/${applicationId}`);
  },

  async unlinkToApplication(contactId: number, applicationId: number): Promise<void> {
    return await apiClient.delete(`${ENDPOINTS.contact}/${contactId}${ENDPOINTS.application}/${applicationId}`);
  },

}
