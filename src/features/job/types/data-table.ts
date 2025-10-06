import type {  IDataTableParams } from "@/types/data-table";
import type { Job } from "@/types/entity";
import type { IFiltersJob } from "./hook";



export interface IFindAllJobParams extends IDataTableParams<Job>  {

filters : IFiltersJob;

} 

