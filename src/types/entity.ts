
/****************************  USER **************************************************************************** */

export type UserStatus =
  "ALLOWED"
  | "PENDING"
  | "BANNED"


export type UserRoles =
  "ADMIN"
  | "USER"




export interface User {
  id: string;
  email: string;
  status: UserStatus
  roles: UserRoles;
  createdAt?: Date;
  updatedAt?: Date;

}

/****************************  JOB **************************************************************************** */

export const TypeEnterprise = {
  ESN: "ESN",
  START_UP: "START_UP",
  ENTERPRISE: "ENTERPRISE"
} as const;

export const JobStatus = {
  NEED_TO_CONTACT: "NEED_TO_CONTACT",
  NEED_TO_VALIDATE_MESSAGE: "NEED_TO_VALIDATE_MESSAGE",
  NEED_TO_SEND_MESSAGE: "NEED_TO_SEND_MESSAGE",
  INTERVIEWS: "INTERVIEWS",
  TECHNICAL_TEST: "TECHNICAL_TEST",
  NEED_TO_SEND_THANKS_AFTER_INTERVIEW: "NEED_TO_SEND_THANKS_AFTER_INTERVIEW",
  NEED_TO_SEND_MAIL_REMINDER: "NEED_TO_SEND_MAIL_REMINDER"

} as const;

export const JobCompatibility = {
  PERFECT: "PERFECT",
  ATTAINABLE: "ATTAINABLE",
  WHY_NOT: "WHY_NOT"

} as const;

export const JobApplyMethod = {
  LINKEDIN: "LINKEDIN",
  JOBBOARD: "JOBBOARD",
  EMAIL: "EMAIL",
  OTHER: "OTHER",
} as const;





export type Job = {

  //NUMBER
  id: number;
  interviewCount: number;
  rating?: number;


  //STRING
  jobTitle: string;
  enterprise: string;
  link: string;
  managerName: string;
  managerEmail: string;
  description?: string;
  notes?: string;
  rejectedReason?: string;

  //ENUM
  type: typeof TypeEnterprise[keyof typeof TypeEnterprise];
  status: typeof JobStatus[keyof typeof JobStatus];
  compatibility: typeof JobCompatibility[keyof typeof JobCompatibility];
  applicationMethod: typeof JobApplyMethod[keyof typeof JobApplyMethod];


  //BOOLEAN
  isArchived: boolean;
  isFavorite: boolean;

  //DATE
  createdAt: Date;
  updatedAt?: Date;
  appliedAt?: Date;
  lastContactAt?: Date;

  //RELATION
  technologies: Technology[];
  address: Address;
  user: User;
  
};


/****************************  TECHNOLOGY  **************************************************************************** */

export type Technology = {
  id: number;
  name: string;
}

/****************************  ADDRESS **************************************************************************** */

export type Address = {
  id: number;
  city: string
  postalCode: string;
};