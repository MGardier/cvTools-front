import type {
  TApplicationStatus,
  TJobboard,
  TContractType,
  TExperienceLevel,
  TRemotePolicy,
  TCompatibilityJob,
  IApplication,
} from "@/shared/types/entity";

export interface ICreateApplicationParams {
  title: string;
  url: string;
  company?: string;
  description?: string;
  salaryMin?: number;
  salaryMax?: number;
  publishedAt?: string;
  jobboard: TJobboard;
  contractType: TContractType;
  currentStatus: TApplicationStatus;
  experience?: TExperienceLevel;
  remotePolicy?: TRemotePolicy;
  compatibility?: TCompatibilityJob;
  address?: {
    city: string;
    postalCode: string;
    street?: string;
    streetNumber?: string;
    complement?: string;
  };
  contactIds?: number[];
  skillIds?: number[];
}

export interface IUpdateApplicationParams {
  title?: string;
  url?: string;
  company?: string;
  description?: string;
  salaryMin?: number;
  salaryMax?: number;
  publishedAt?: string;
  jobboard?: TJobboard;
  contractType?: TContractType;
  currentStatus?: TApplicationStatus;
  experience?: TExperienceLevel;
  remotePolicy?: TRemotePolicy;
  compatibility?: TCompatibilityJob;
  address?: {
    city: string;
    postalCode: string;
    street?: string;
    streetNumber?: string;
    complement?: string;
  };
  disconnectAddress?: boolean;
}

export interface IFlatApplicationQueryParams {
  page: number;
  limit: number;
  sortField?: keyof IApplication;
  sortDirection?: "asc" | "desc";
  keyword?: string;
  city?: string;
  currentStatus?: TApplicationStatus;
  isFavorite?: boolean;
  createdAt?: string;
  company?: string;
  jobboard?: TJobboard;
}
