
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
  ESN : "ESN",
  START_UP:"START_UP",
  ENTERPRISE: "ENTERPRISE"
} as const;

export const JobStatus = { 
  NEED_TO_CONTACT: "NEED_TO_CONTACT",
  NEED_TO_VALIDATE_MESSAGE: "NEED_TO_VALIDATE_MESSAGE",
  NEED_TO_SEND_MESSAGE:  "NEED_TO_SEND_MESSAGE",
  INTERVIEWS:  "INTERVIEWS",
  TECHNICAL_TEST :"TECHNICAL_TEST",
  NEED_TO_SEND_THANKS_AFTER_INTERVIEW: "NEED_TO_SEND_THANKS_AFTER_INTERVIEW",
  NEED_TO_SEND_MAIL_REMINDER: "NEED_TO_SEND_MAIL_REMINDER"

}as const  ;

export const JobPriority = {
  PERFECT:"PERFECT",
  ATTAINABLE: "ATTAINABLE",
  WHY_NOT:"WHY_NOT"
  
} as const;

export const JobApplyMethod = {
  LINKEDIN :"LINKEDIN",
  JOBBOARD :"JOBBOARD",
  EMAIL: "EMAIL",
  OTHER: "OTHER",
} as const;





export type Job = {
  id: number;
  enterprise: string;
  type: typeof TypeEnterprise[keyof typeof TypeEnterprise];
  link: string;
  jobTitle: string;
  managerName: string;
  managerEmail: string;

  status: typeof JobStatus[keyof typeof JobStatus];
  priority: typeof JobPriority[keyof typeof JobPriority];
  description?: string;
  applicationMethod: typeof JobApplyMethod[keyof typeof JobApplyMethod];
  interviewCount: number;
  rejectionReason?: string;
  rating?: number;
  archived: boolean;


  createdAt: Date;
  updatedAt?: Date;
  appliedAt?: Date ;
  lastContactAt?: Date;

  technologies: Technology[];
  adress: Address;
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