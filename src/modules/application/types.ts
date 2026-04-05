// Re-export all shared entity types so components can import from this module
export type {
  IApplication,
  IAddress,
  IContact,
  ISkill,
  TContractType,
  TApplicationStatus,
  TExperienceLevel,
  TRemotePolicy,
  TCompatibilityJob,
  TApiProvider,
  TJobboard,
} from "@/shared/types/entity";

export {
  EContractType,
  EApplicationStatus,
  EExperienceLevel,
  ERemotePolicy,
  ECompatibilityJob,
  EApiProvider,
  EJobboard,
} from "@/shared/types/entity";

// ================================================
//              FILTERS — aligned with backend
// ================================================

import type { TApplicationStatus, TJobboard } from "@/shared/types/entity";

export interface IApplicationFilters {
  keyword?: string;
  city?: string;
  currentStatus?: TApplicationStatus;
  isFavorite?: boolean;
  createdAt?: string;
  company?: string;
  jobboard?: TJobboard;
}

// ================================================
//              QUERY PARAMS & RESPONSES
// ================================================

import type { IApplication } from "@/shared/types/entity";

export interface IGetApplicationsParams {
  page: number;
  limit: number;
  sortField?: keyof IApplication;
  sortDirection?: "asc" | "desc";
  filters?: IApplicationFilters;
}

export interface IGetApplicationsResponse {
  items: IApplication[];
  total: number;
  page: number;
  limit: number;
}
