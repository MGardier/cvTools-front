
// ================================================
//                  ENUMS (const + type union)
// ================================================

export const EApiProvider = {
  ADZUNA: "ADZUNA",
  APIFY: "APIFY",
  FRANCE_TRAVAIL: "FRANCE_TRAVAIL",
  UNKNOW: "UNKNOW",
} as const;
export type TApiProvider = (typeof EApiProvider)[keyof typeof EApiProvider];

export const EContractType = {
  CDI: "CDI",
  CDD: "CDD",
  FREELANCE: "FREELANCE",
  ALTERNANCE: "ALTERNANCE",
} as const;
export type TContractType = (typeof EContractType)[keyof typeof EContractType];

export const EExperienceLevel = {
  JUNIOR: "JUNIOR",
  MID: "MID",
  SENIOR: "SENIOR",
} as const;
export type TExperienceLevel = (typeof EExperienceLevel)[keyof typeof EExperienceLevel];

export const ERemotePolicy = {
  FULL: "FULL",
  HYBRID: "HYBRID",
  ONSITE: "ONSITE",
} as const;
export type TRemotePolicy = (typeof ERemotePolicy)[keyof typeof ERemotePolicy];

export const EApplicationStatus = {
  NEED_TO_APPLY: "NEED_TO_APPLY",
  APPLIED: "APPLIED",
  IN_PROCESS: "IN_PROCESS",
  COMPANY_OFFER_RECEIVED: "COMPANY_OFFER_RECEIVED",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
  GHOSTED: "GHOSTED",
  WITHDRAWN: "WITHDRAWN",
} as const;
export type TApplicationStatus = (typeof EApplicationStatus)[keyof typeof EApplicationStatus];

export const ECompatibilityJob = {
  PERFECT: "PERFECT",
  ATTAINABLE: "ATTAINABLE",
  WHY_NOT: "WHY_NOT",
} as const;
export type TCompatibilityJob = (typeof ECompatibilityJob)[keyof typeof ECompatibilityJob];

export const EAddressTable = {
  APPLICATION: "APPLICATION",
} as const;

export type TAddressTable = (typeof EAddressTable)[keyof typeof EAddressTable];

// ================================================
//                  ADDRESS
// ================================================

export interface IAddress {
  id: number;
  city: string;
  postalCode: string;
  street: string | null;
  complement: string | null;
  streetNumber: string | null;
  createdAt: string;
  updatedAt: string | null;
  tableName: TAddressTable;
  tableId: number;
}

// ================================================
//                  JOBBOARD
// ================================================

export interface IJobboard {
  id: number;
  label: string;
  createdAt: string;
  updatedAt: string | null;
  createdBy: number;
}

// ================================================
//                  SKILL
// ================================================

export interface ISkill {
  id: number;
  label: string;
  createdAt: string;
  updatedAt: string | null;
  createdBy: number;
}

// ================================================
//                  CONTACT
// ================================================

export interface IContact {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string | null;
  profession: string;
  createdAt: string;
  updatedAt: string | null;
  createdBy: number;
}

// ================================================
//              JUNCTION TABLES
// ================================================

export interface IApplicationHasContact {
  applicationId: number;
  contactId: number;
  contact: IContact;
}

export interface IApplicationHasSkill {
  applicationId: number;
  skillId: number;
  skill: ISkill;
}

// ================================================
//                  APPLICATION
// ================================================

export interface IApplication {
  id: number;
  apiOfferId: string | null;
  title: string;
  company: string | null;
  url: string;
  description: string | null;
  publishedAt: string | null;
  appliedAt: string | null;
  createdAt: string;
  updatedAt: string | null;
  isFavorite: boolean;
  isArchived: boolean;
  apiProvider: TApiProvider | null;
  contractType: TContractType;
  experience: TExperienceLevel | null;
  remotePolicy: TRemotePolicy | null;
  compatibility: TCompatibilityJob | null;
  currentStatus: TApplicationStatus;
  salaryMin: number | null;
  salaryMax: number | null;
  userId: number;
  jobboardId: number | null;
  jobboard: IJobboard | null;
  applicationContacts: IApplicationHasContact[];
  applicationSkills: IApplicationHasSkill[];
  address: IAddress | null;
}

// ================================================
//              QUERY PARAMS & RESPONSES
// ================================================

export interface IApplicationFilters {
  search?: string;
  city?: string;
  status?: string[];
  isFavorite?: boolean;
  createdAtFrom?: string;
}

export interface IGetApplicationsParams {
  userId: number;
  page: number;
  limit: number;
  sortField?: keyof IApplication;
  sortOrder?: "asc" | "desc";
  filters?: IApplicationFilters;
}

export interface IGetApplicationsResponse {
  items: IApplication[];
  total: number;
  page: number;
  limit: number;
}
