import { scraperApi } from './scraper.api';
import type { IExtractedApplication } from './types';

export const scraperService = {
  async extractFromUrl(url: string): Promise<IExtractedApplication> {
    return (await scraperApi.extractOffer({ url })).data;
  },

  async extractFromContent(rawContent: string): Promise<IExtractedApplication> {
    return (await scraperApi.extractOffer({ rawContent })).data;
  },
};
