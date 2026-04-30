import type {
  TContractType,
  TExperienceLevel,
  TOfferJobboardOrigin,
  TPublishedSince,
  TRemotePolicy,
} from "@/modules/offer/types";

export interface ISearchOfferQuery {
  keyword: string;
  city?: string;
  postalCode?: string;
  contractType?: TContractType;
  remote?: TRemotePolicy;
  experience?: TExperienceLevel;
  publishedSince?: TPublishedSince;
  jobboard?: TOfferJobboardOrigin[];
  page?: number;
  limit?: number;
}
