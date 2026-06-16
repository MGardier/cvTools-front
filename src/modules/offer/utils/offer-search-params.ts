import {
  EContractType,
  EExperienceLevel,
  ERemotePolicy,
  EPublishedSince,
} from "@/modules/offer/types";
import type {
  IOfferSearchFilters,
  TContractType,
  TExperienceLevel,
  TRemotePolicy,
  TPublishedSince,
} from "@/modules/offer/types";

export const OFFER_PARAM_KEYS = {
  keyword: "keyword",
  cityName: "cityName",
  cityCode: "cityCode",
  departmentCode: "departmentCode",
  regionCode: "regionCode",
  postalCode: "postalCode",
  contractType: "contractType",
  remote: "remote",
  experience: "experience",
  publishedSince: "publishedSince",
  page: "page",
} as const;

const isContractType = (v: string): v is TContractType =>
  (Object.values(EContractType) as string[]).includes(v);

const isRemotePolicy = (v: string): v is TRemotePolicy =>
  (Object.values(ERemotePolicy) as string[]).includes(v);

const isExperienceLevel = (v: string): v is TExperienceLevel =>
  (Object.values(EExperienceLevel) as string[]).includes(v);

const isPublishedSince = (v: string): v is TPublishedSince =>
  (Object.values(EPublishedSince) as string[]).includes(v);

export interface IParsedOfferUrlState {
  filters: IOfferSearchFilters;
  page: number;
}

export const parseOfferUrlState = (
  params: URLSearchParams,
): IParsedOfferUrlState => {
  const filters: IOfferSearchFilters = {
    keyword: (params.get(OFFER_PARAM_KEYS.keyword) ?? "").trim(),
  };

  const cityName = params.get(OFFER_PARAM_KEYS.cityName);
  if (cityName) filters.cityName = cityName;

  const cityCode = params.get(OFFER_PARAM_KEYS.cityCode);
  if (cityCode) filters.cityCode = cityCode;

  const departmentCode = params.get(OFFER_PARAM_KEYS.departmentCode);
  if (departmentCode) filters.departmentCode = departmentCode;

  const regionCode = params.get(OFFER_PARAM_KEYS.regionCode);
  if (regionCode) filters.regionCode = regionCode;

  const postalCode = params.get(OFFER_PARAM_KEYS.postalCode);
  if (postalCode) filters.postalCode = postalCode;

  const contractType = params.get(OFFER_PARAM_KEYS.contractType);
  if (contractType && isContractType(contractType)) {
    filters.contractType = contractType;
  }

  const remote = params.get(OFFER_PARAM_KEYS.remote);
  if (remote && isRemotePolicy(remote)) filters.remote = remote;

  const experience = params.get(OFFER_PARAM_KEYS.experience);
  if (experience && isExperienceLevel(experience)) filters.experience = experience;

  const publishedSince = params.get(OFFER_PARAM_KEYS.publishedSince);
  if (publishedSince && isPublishedSince(publishedSince)) {
    filters.publishedSince = publishedSince;
  }

  const rawPage = params.get(OFFER_PARAM_KEYS.page);
  const parsedPage = rawPage ? parseInt(rawPage, 10) : NaN;
  const page = Number.isFinite(parsedPage) && parsedPage >= 1 ? parsedPage : 1;

  return { filters, page };
};

export const serializeOfferUrlState = (
  filters: IOfferSearchFilters,
  page: number,
): URLSearchParams => {
  const params = new URLSearchParams();

  const keyword = filters.keyword?.trim();
  if (keyword) params.set(OFFER_PARAM_KEYS.keyword, keyword);

  if (filters.cityName) params.set(OFFER_PARAM_KEYS.cityName, filters.cityName);
  if (filters.cityCode) params.set(OFFER_PARAM_KEYS.cityCode, filters.cityCode);
  if (filters.departmentCode) {
    params.set(OFFER_PARAM_KEYS.departmentCode, filters.departmentCode);
  }
  if (filters.regionCode) params.set(OFFER_PARAM_KEYS.regionCode, filters.regionCode);
  if (filters.postalCode) params.set(OFFER_PARAM_KEYS.postalCode, filters.postalCode);

  if (filters.contractType) {
    params.set(OFFER_PARAM_KEYS.contractType, filters.contractType);
  }
  if (filters.remote) params.set(OFFER_PARAM_KEYS.remote, filters.remote);
  if (filters.experience) {
    params.set(OFFER_PARAM_KEYS.experience, filters.experience);
  }
  if (filters.publishedSince) {
    params.set(OFFER_PARAM_KEYS.publishedSince, filters.publishedSince);
  }

  if (page > 1) params.set(OFFER_PARAM_KEYS.page, String(page));

  return params;
};
