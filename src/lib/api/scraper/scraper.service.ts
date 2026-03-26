import { scraperApi } from './scraper.api';
import type { IExtractedApplication } from './types';

export const scraperService = {
  async extractOffer(url: string): Promise<IExtractedApplication> {
    return (await scraperApi.extractOffer({ url })).data;
  },
};
