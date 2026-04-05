import type { TContractType, TExperienceLevel, TJobboard, TRemotePolicy } from '@/shared/types/entity';

export interface IExtractedApplication {
  isSuccess: boolean;
  title: string;
  company?: string;
  description?: string;
  contractType?: TContractType;
  salaryMin?: number;
  salaryMax?: number;
  experience?: TExperienceLevel;
  remotePolicy?: TRemotePolicy;
  publishedAt?: string;
  skills?: string[];
  jobboard?: TJobboard;
  address?: {
    city?: string;
    postalCode?: string;
    street?: string;
    complement?: string;
    streetNumber?: string;
  };
}

export interface IExtractOfferParams {
  url?: string;
  rawContent?: string;
}
