

import { apiClient } from '@/lib/axios/axios';

import type { TCreateSkillParams, TUpdateSkillParams } from './types';
import { ENDPOINTS } from '@/app/constants/endpoints';
import type { ISkill } from '@/shared/types/entity';
import type { IApiResponse } from '@/shared/types/api';




export const skillApi = {


  // =============================================================================
  //                               CREATE
  // =============================================================================

  async create(params: TCreateSkillParams): Promise<IApiResponse<ISkill>> {
    return await apiClient.post(`${ENDPOINTS.skill}`, params);
  },

  // =============================================================================
  //                               UPDATE
  // =============================================================================

  async update(id: number, params: TUpdateSkillParams): Promise<IApiResponse<ISkill>> {
    return await apiClient.patch(`${ENDPOINTS.skill}/${id}`, params);
  },

  // =============================================================================
  //                               DELETE
  // =============================================================================

  async delete(skillId: number): Promise<IApiResponse<void>> {
    return await apiClient.delete(`${ENDPOINTS.skill}/${skillId}`);
  },


  // =============================================================================
  //                              FIND
  // =============================================================================

  async findAll(): Promise<IApiResponse<ISkill[]>> {
    return await apiClient.get(`${ENDPOINTS.skill}`);
  },

  async findAllByApplicationId(applicationId: number): Promise<IApiResponse<ISkill[]>> {
    return await apiClient.get(`${ENDPOINTS.skill}${ENDPOINTS.application}/${applicationId}`);
  },

  async findOneById(skillId: number): Promise<IApiResponse<ISkill>> {
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
