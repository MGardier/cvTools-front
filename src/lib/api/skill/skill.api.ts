

import { apiClient } from '@/lib/axios/axios';

import type { ICreateSkillParams, ISkillResponse, IUpdateSkillParams } from './types';
import { ENDPOINTS } from '@/app/constants/endpoints';






export const skillApi = {


  // =============================================================================
  //                               CREATE
  // =============================================================================

  async create(params: ICreateSkillParams): Promise<ISkillResponse> {
    return await apiClient.post(`${ENDPOINTS.skill}`, params);
  },

  // =============================================================================
  //                               UPDATE
  // =============================================================================

  async update(params: IUpdateSkillParams): Promise<ISkillResponse> {
    return await apiClient.patch(`${ENDPOINTS.skill}`, params);
  },

  // =============================================================================
  //                               DELETE
  // =============================================================================

  async delete(skillId: number): Promise<ISkillResponse> {
    return await apiClient.delete(`${ENDPOINTS.skill}/${skillId}`);
  },


  // =============================================================================
  //                              FIND 
  // =============================================================================

  async findAll(): Promise<ISkillResponse[]> {
    return await apiClient.get(`${ENDPOINTS.skill}`);
  },

  async findAllByApplicationId(applicationId: number): Promise<ISkillResponse[]> {
    return await apiClient.get(`${ENDPOINTS.skill}${ENDPOINTS.application}/${applicationId}`);
  },

  async findOneById(skillId: number): Promise<ISkillResponse> {
    return await apiClient.get(`${ENDPOINTS.skill}/${skillId}`);
  },


  // =============================================================================
  //                            RELATION 
  // =============================================================================

  async linkToApplication(skillId: number, applicationId: number): Promise<void> {
    return await apiClient.post(`${ENDPOINTS.skill}/${skillId}${ENDPOINTS.application}/${applicationId}`);
  },

  async unlinkToApplication(skillId: number, applicationId: number): Promise<void> {
    return await apiClient.delete(`${ENDPOINTS.skill}/${skillId}${ENDPOINTS.application}/${applicationId}`);
  },


}