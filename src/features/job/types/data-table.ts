import type { DateFilterParams, IDataTableParams } from "@/types/data-table";
import type { Job, JobApplyMethod, JobStatus } from "@/types/entity";



export interface IFindAllJobParams extends IDataTableParams<Job>  {

  // jobTitle?: string;
  // enterprise?: string;
  // status?: typeof JobStatus[keyof typeof JobStatus];
  // applicationMethod?: typeof JobApplyMethod[keyof typeof JobApplyMethod];
  // appliedAt ?: DateFilterParams

} 