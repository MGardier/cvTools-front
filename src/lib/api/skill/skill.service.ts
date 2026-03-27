import { skillApi } from './skill.api';
import type { TCreateSkillParams, TUpdateSkillParams } from './types';
import type { ISkill } from '@/shared/types/entity';

export const skillService = {
  async create(data: TCreateSkillParams): Promise<ISkill> {
    return (await skillApi.create(data)).data;
  },

  async findOrCreate(data: TCreateSkillParams): Promise<ISkill> {
    return (await skillApi.findOrCreate(data)).data;
  },

  async update(id: number, data: TUpdateSkillParams): Promise<ISkill> {
    return (await skillApi.update(id, data)).data;
  },

  async delete(skillId: number): Promise<void> {
    await skillApi.delete(skillId);
  },

  async findAll(): Promise<ISkill[]> {
    return (await skillApi.findAll()).data;
  },

  async findAllByApplicationId(applicationId: number): Promise<ISkill[]> {
    return (await skillApi.findAllByApplicationId(applicationId)).data;
  },

  async findOneById(skillId: number): Promise<ISkill> {
    return (await skillApi.findOneById(skillId)).data;
  },

  async linkToApplication(skillId: number, applicationId: number): Promise<void> {
    return skillApi.linkToApplication(skillId, applicationId);
  },

  async unlinkFromApplication(skillId: number, applicationId: number): Promise<void> {
    return skillApi.unlinkToApplication(skillId, applicationId);
  },
};
