import type { TFunction } from "i18next";

import type { SubmitHandler, UseFieldArrayReturn, UseFormReturn } from "react-hook-form";

import type z from "zod";
import type { ApiErrors } from "@/types/api";
import type { Job } from "@/types/entity";
import type { jobFormSchema } from "../schema/job-schema";
import type { UseQueryResult } from "@tanstack/react-query";
import type { Dispatch, SetStateAction } from "react";

/**************** FORM *********************************************/

export interface UseJobFormReturn {

  onSubmit: SubmitHandler<z.infer<ReturnType<typeof jobFormSchema>>>;
  form: UseFormReturn<z.infer<ReturnType<typeof jobFormSchema>>>;
  technologiesFields : UseFieldArrayReturn<z.infer<ReturnType<typeof jobFormSchema>>>
  fieldsByStep : Record<string,Set<string>>

}

/**************** UPDATE  *********************************************/

export interface UseUpdateJobReturn {
  query : UseQueryResult<Job, ApiErrors>;
  mutationIsPending : boolean;
  mutationIsError : boolean;
  job?: Job ;
  t: TFunction<'job', undefined>;
  handleSubmit: SubmitHandler<z.infer<ReturnType<typeof jobFormSchema>>>;
}


export interface UseCreateJobReturn {
  isPending: boolean;
  isError: boolean;
  t: TFunction<'job', undefined>;
  handleSubmit: SubmitHandler<z.infer<ReturnType<typeof jobFormSchema>>>;

}


/**************** FIND ALL  *********************************************/
export interface UseJobsListReturn {
  isPending: boolean;
  isError: boolean;
  t: TFunction<'job', undefined>;
  data?: Job[]
  count?: number,
  limit: number,
  maxPage?: number 
  currentPage : number,
  setCurrentPage :  Dispatch<SetStateAction<number>>
}


/**************** FIND ONE  *********************************************/
export interface UseFindOneJobReturn {
  isPending: boolean;
  error: ApiErrors | null,
  t: TFunction<'job', undefined>;
  job: Job | undefined
}


