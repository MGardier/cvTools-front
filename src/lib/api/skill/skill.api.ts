

import { apiClient } from '@/lib/axios/axios';

import type { TCreateSkillParams, TUpdateSkillParams } from './types';
import { ENDPOINTS } from '@/app/constants/endpoints';
import type { ISkill } from '@/shared/types/entity';






export const skillApi = {


  // =============================================================================
  //                               CREATE
  // =============================================================================

  async create(params: TCreateSkillParams): Promise<ISkill> {
    return await apiClient.post(`${ENDPOINTS.skill}`, params);
  },

  // =============================================================================
  //                               UPDATE
  // =============================================================================

  async update(params: TUpdateSkillParams): Promise<ISkill> {
    return await apiClient.patch(`${ENDPOINTS.skill}`, params);
  },

  // =============================================================================
  //                               DELETE
  // =============================================================================

  async delete(skillId: number): Promise<ISkill> {
    return await apiClient.delete(`${ENDPOINTS.skill}/${skillId}`);
  },


  // =============================================================================
  //                              FIND 
  // =============================================================================

  async findAll(): Promise<ISkill[]> {
    return await apiClient.get(`${ENDPOINTS.skill}`);
  },

  async findAllByApplicationId(applicationId: number): Promise<ISkill[]> {
    return await apiClient.get(`${ENDPOINTS.skill}${ENDPOINTS.application}/${applicationId}`);
  },

  async findOneById(skillId: number): Promise<ISkill> {
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