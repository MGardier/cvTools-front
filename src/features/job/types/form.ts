import type { Address, JobApplyMethod, JobPriority, JobStatus, Technology, TypeEnterprise } from "@/types/entity";



/**************** CREATE  *********************************************/

export interface CreateJobData {
    enterprise: string;
    type: typeof TypeEnterprise[keyof typeof TypeEnterprise];
    link: string;
    jobTitle: string;
    managerName?: string;
    managerEmail?: string;
    salaryMin?: number;
    salaryMax?: number;
  
    status: typeof JobStatus[keyof typeof JobStatus];
    priority: typeof JobPriority[keyof typeof JobPriority];
    description?: string;
    detailsToRemember?: string;
    applicationMethod: typeof JobApplyMethod[keyof typeof JobApplyMethod];

    appliedAt?: Date ;
    
    technologies: Omit<Technology,'id'>[];
    address: Omit<Address,'id'>;

}
