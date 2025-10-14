import type z from "zod";
import type {  jobFormSchema } from "../schema/job-schema";

/**************************** CREATE **************************************************** */

export interface ICreateJobParams extends z.infer<ReturnType<typeof jobFormSchema>>{
  userId : number
}

/**************************** UPDATE **************************************************** */

export interface IUpdateJobParams extends ICreateJobParams{
  jobId: number
}

