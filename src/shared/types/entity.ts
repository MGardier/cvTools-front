// =============================================================================
//                               USER
// =============================================================================

export type TUserStatus =
  "ALLOWED"
  | "PENDING"
  | "BANNED"


export type TUserRoles =
  "ADMIN"
  | "USER"




export interface IUser {
  id: number;
  email: string;
  status: TUserStatus;
  roles: TUserRoles;
}


// =============================================================================
//                               APPLICATION
// =============================================================================

export const EApiProvider = {
  FRANCE_TRAVAIL: "FRANCE_TRAVAIL",
  ADZUNA: "ADZUNA",
  APIFY: "APIFY",
  UNKNOW: "UNKNOW",
} as const;
export type TApiProvider = (typeof EApiProvider)[keyof typeof EApiProvider];

export const EJobboard = {
  LINKEDIN: "LINKEDIN",
  INDEED: "INDEED",
  WTTJ: "WTTJ",
  FRANCE_TRAVAIL: "FRANCE_TRAVAIL",
  GLASSDOOR: "GLASSDOOR",
  APEC: "APEC",
  HELLO_WORK: "HELLO_WORK",
  METEO_JOB: "METEO_JOB",
  UNKNOW: "UNKNOW",
} as const;
export type TJobboard = (typeof EJobboard)[keyof typeof EJobboard];

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
  ONSITE: "ONSITE",
  HYBRID: "HYBRID",
  FULL: "FULL",
} as const;
export type TRemotePolicy = (typeof ERemotePolicy)[keyof typeof ERemotePolicy];
