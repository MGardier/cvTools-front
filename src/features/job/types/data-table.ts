import type { DataTableParams, DateFilterParams } from "@/types/data-table";
import type { Job, JobApplyMethod, JobStatus } from "@/types/entity";

export interface FindAllJobParams extends DataTableParams<Job> {

  jobTitle: string;
  enterprise: string;
  status?: typeof JobStatus[keyof typeof JobStatus];
  applicationMethod?: typeof JobApplyMethod[keyof typeof JobApplyMethod];
  appliedAt : DateFilterParams

} 