
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



export type TypeEnterprise =
  "ESN"
  | "START_UP"
  | "ENTERPRISE"
  ;

export type JobStatus =
  "NEED_TO_CONTACT"
  | "NEED_TO_VALIDATE_MESSAGE"
  | "NEED_TO_SEND_MESSAGE"
  | "INTERVIEWS"
  | "TECHNICAL_TEST"
  | "NEED_TO_SEND_THANKS_AFTER_INTERVIEW"
  | "NEED_TO_SEND_MAIL_REMINDER"
  ;

export type PriorityJob =
  "PERFECT"
  | "ATTAINABLE"
  | "WHY_NOT"
  ;

export type ApplyMethod =
|"LINKEDIN"
|"SITE_WEB"
|"EMAIL"
|"AUTRE"
  ;

type Technology = {
  id: number;
  name: string;
};

export type ApplicationOrigin = 
|"LINKEDIN"
|"HELLOWORK"
|"FRANCE_TRAVAIL"
|"INDEED"
|"WELCOME TO THE JUNGLE";



export type Address = {
  id: number;
  city: string
  postalCode: string;
};


export type Job = {
  id: number;
  enterprise: string;
  type: TypeEnterprise;
  link: string;
  jobTitle: string;
  managerName: string;
  managerEmail: string;
  detailsToRemember: string | null;
  linkLinkedin: string | null;
  salaryMin: number | null;
  salaryMax: number | null;
  salaryCurrency: string | null;
  status: JobStatus;
  priority: PriorityJob;
  description: string | null;
  applicationMethod: ApplyMethod;
  origin: ApplicationOrigin;
  interviewCount: number;
  rejectionReason: string | null;
  rating: number | null;
  archived: boolean;
  createdAt: Date;
  updatedAt: Date | null;
  appliedAt: Date | null;
  lastContactAt: Date | null;
  technologies: Technology[];
  adress : Address;
  user: User;
};