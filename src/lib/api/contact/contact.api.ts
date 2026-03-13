

import { apiClient } from '@/lib/axios/axios';


import { ENDPOINTS } from '@/app/constants/endpoints';
import type { IContactResponse, ICreateContactParams, IUpdateContactParams } from './types';






export const contactApi = {

  // =============================================================================
  //                               CREATE
  // =============================================================================

  async create(params: ICreateContactParams): Promise<IContactResponse> {
    return await apiClient.post(`${ENDPOINTS.contact}`, params);
  },

  // =============================================================================
  //                               UPDATE
  // =============================================================================

  async update(params: IUpdateContactParams): Promise<IContactResponse> {
    return await apiClient.patch(`${ENDPOINTS.contact}`, params);
  },

  // =============================================================================
  //                               DELETE
  // =============================================================================

  async delete(contactId: number): Promise<IContactResponse> {
    return await apiClient.delete(`${ENDPOINTS.contact}/${contactId}`);
  },

  // =============================================================================
  //                              FIND 
  // =============================================================================

  async findAll(): Promise<IContactResponse[]> {
    return await apiClient.get(`${ENDPOINTS.contact}`);
  },

  async findAllByApplicationId(applicationId: number): Promise<IContactResponse[]> {
    return await apiClient.get(`${ENDPOINTS.contact}${ENDPOINTS.application}/${applicationId}`);
  },

  async findOneById(contactId: number): Promise<IContactResponse> {
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