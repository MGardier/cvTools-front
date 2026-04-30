// Import shared types for local use
import type {
  TContractType as _TContractType,
  TExperienceLevel as _TExperienceLevel,
  TRemotePolicy as _TRemotePolicy,
} from "@/shared/types/entity";

// Re-export shared enums/types used by offers
export {
  EContractType,
  EExperienceLevel,
  ERemotePolicy,
} from "@/shared/types/entity";


// ================================================
//              OFFER ENUMS (aligned with backend)
// ================================================

export const EOfferJobboardOrigin = {
  FRANCE_TRAVAIL: "FRANCE_TRAVAIL",
  WTTJ: "WTTJ",
  HELLOWORK: "HELLOWORK",
  UNKNOWN: "UNKNOWN",
} as const;
export type TOfferJobboardOrigin = (typeof EOfferJobboardOrigin)[keyof typeof EOfferJobboardOrigin];

export const EOfferApiProvider = {
  FRANCE_TRAVAIL: "FRANCE_TRAVAIL",
  APIFY: "APIFY",
} as const;
export type TOfferApiProvider = (typeof EOfferApiProvider)[keyof typeof EOfferApiProvider];

export const EProviderStatus = {
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  TIMEOUT: "TIMEOUT",
} as const;
export type TProviderStatus = (typeof EProviderStatus)[keyof typeof EProviderStatus];

export const EPublishedSince = {
  "24h": "24h",
  "7d": "7d",
  "14d": "14d",
} as const;
export type TPublishedSince = (typeof EPublishedSince)[keyof typeof EPublishedSince];



export type TContractType = _TContractType;
export type TExperienceLevel = _TExperienceLevel;
export type TRemotePolicy = _TRemotePolicy;

// ================================================
//              OFFER INTERFACES
// ================================================

export interface IOfferLocation {
  city?: string;
  postalCode?: string;
  department?: string;
  region?: string;
}

export interface IOfferSalary {
  min?: number;
  max?: number;
  raw?: string;
}

export interface IOfferExperience {
  level?: TExperienceLevel;
  raw?: string;
}

export interface IOfferListItem {
  id: string;
  externalId?: string;
  title: string;
  company?: string;
  location?: IOfferLocation;
  contractType?: TContractType;
  salary?: IOfferSalary;
  remote?: TRemotePolicy;
  publishedAt: string;
  url: string;
  jobboard: TOfferJobboardOrigin;
  apiProvider: TOfferApiProvider;
  experience?: IOfferExperience;
  skills: string[];
}

// ================================================
//              FILTERS
// ================================================

export interface IOfferSearchFilters {
  keyword: string;
  city?: string;
  postalCode?: string;
  contractType?: TContractType;
  remote?: TRemotePolicy;
  experience?: TExperienceLevel;
  publishedSince?: TPublishedSince;
}

// ================================================
//              QUERY PARAMS & RESPONSES
// ================================================

export interface ISearchOffersParams {
  page: number;
  limit: number;
  filters: IOfferSearchFilters;
}

export interface IProviderSourceStatus {
  apiProvider: TOfferApiProvider;
  status: TProviderStatus;
  count: number;
  message?: string;
}

export interface IAggregatedSearchResponse {
  offers: IOfferListItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    sources: IProviderSourceStatus[];
  };
}
