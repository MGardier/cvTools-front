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

export const EApplicationStatus = {
  TO_APPLY: "TO_APPLY",
  APPLIED: "APPLIED",
  FIRST_CONTACT: "FIRST_CONTACT",
  FIRST_INTERVIEW: "FIRST_INTERVIEW",
  FOLLOW_UP_INTERVIEW: "FOLLOW_UP_INTERVIEW",
  OFFER_RECEIVED: "OFFER_RECEIVED",
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





export interface IApplication {

  /* Number */
  id: number;
  salaryMin?: number;
  salaryMax?: number;

  /* String */
  title: string;
  company?: string;
  url: string;
  description?: string;
  apiOfferId?: string;

  /* Date */
  publishedAt?: Date;
  appliedAt?: Date;
  createdAt: Date;
  updatedAt?: Date;

  /* Boolean */
  isFavorite: boolean;

  /* Enum */
  contractType: TContractType;
  currentStatus: TApplicationStatus;
  experience?: TExperienceLevel;
  remotePolicy?: TRemotePolicy;
  compatibility?: TCompatibilityJob;
  apiProvider?: TApiProvider;
  jobboard?: TJobboard;


  /* Relation */
  userId: number;
  address?: IAddress;
  contacts?: IContact[];
  skills?: ISkill[];

}


// =============================================================================
//                               ADDRESS
// =============================================================================



export const EAddressTable = {
  APPLICATION: "APPLICATION",
} as const;
export type TAddressTable = (typeof EAddressTable)[keyof typeof EAddressTable];



export interface IAddress {
  id: number;
  city: string;
  postalCode: string;
  streetNumber: string | null;
  street: string | null;
  complement: string | null ;
  createdAt: Date;
  updatedAt: Date | null;
}



// =============================================================================
//                               CONTACT
// =============================================================================

export interface IContact {
  id: number
  firstname: string;
  lastname: string;
  email: string;
  profession: string;
  phone?: string;
}

// =============================================================================
//                               SKILL
// =============================================================================

export interface ISkill {
  id: number
  label: string;
  createdAt: Date;
  isOwner?: boolean;
  isUsed?: boolean;
}