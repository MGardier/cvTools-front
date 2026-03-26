import { apiClient } from '@/lib/axios/axios';
import { ENDPOINTS } from '@/app/constants/endpoints';
import type { IApiResponse } from '@/shared/types/api';
import type { IExtractedApplication, IExtractUrlParams } from './types';

export const scraperApi = {
  async extractOffer(data: IExtractUrlParams): Promise<IApiResponse<IExtractedApplication>> {
    return await apiClient.post(ENDPOINTS.scraper, data);
  },
};
