import { contactApi } from './contact.api';
import type { TCreateContactParams, TUpdateContactParams } from './types';
import type { IContact } from '@/shared/types/entity';

export const contactService = {
  async create(data: TCreateContactParams): Promise<IContact> {
    return (await contactApi.create(data)).data;
  },

  async update(id: number, data: TUpdateContactParams): Promise<IContact> {
    return (await contactApi.update(id, data)).data;
  },

  async delete(contactId: number): Promise<void> {
    await contactApi.delete(contactId);
  },

  async findAll(): Promise<IContact[]> {
    return (await contactApi.findAll()).data;
  },

  async findAllByApplicationId(applicationId: number): Promise<IContact[]> {
    return (await contactApi.findAllByApplicationId(applicationId)).data;
  },

  async findOneById(contactId: number): Promise<IContact> {
    return (await contactApi.findOneById(contactId)).data;
  },

  async linkToApplication(contactId: number, applicationId: number): Promise<void> {
    return contactApi.linkToApplication(contactId, applicationId);
  },

  async unlinkFromApplication(contactId: number, applicationId: number): Promise<void> {
    return contactApi.unlinkToApplication(contactId, applicationId);
  },
};
