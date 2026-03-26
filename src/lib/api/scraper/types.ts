import type { TContractType, TExperienceLevel, TRemotePolicy } from '@/shared/types/entity';

export interface IExtractedApplication {
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
  address?: {
    city?: string;
    postalCode?: string;
    street?: string;
    complement?: string;
    streetNumber?: string;
  };
  contacts?: Array<{
    firstname?: string;
    lastname?: string;
    email?: string;
    phone?: string;
    profession?: string;
  }>;
}

export interface IExtractUrlParams {
  url: string;
}
