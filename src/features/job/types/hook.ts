import type { TFunction } from "i18next";

import type { SubmitHandler, UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import type { createJobSchema } from "../schema/job-schema";
import type z from "zod";
import type { ApiErrors } from "@/types/api";
import type { FindAllJobByUserResponse } from "./api";
import type { Job } from "@/types/entity";

/**************** CREATE *********************************************/
export interface UseCreateJobReturn {
  isPending: boolean;
  isError: boolean;
  error: ApiErrors | null,
  t: TFunction<'job', undefined>;
  onSubmit: SubmitHandler<z.infer<ReturnType<typeof createJobSchema>>>;
  form: UseFormReturn<z.infer<ReturnType<typeof createJobSchema>>>;
  technologiesFields : UseFieldArrayReturn<z.infer<ReturnType<typeof createJobSchema>>>
}


/**************** FIND ALL  *********************************************/
export interface UseFindAllJobReturn {
  isPending: boolean;
  error: ApiErrors | null,
  t: TFunction<'job', undefined>;
  data: FindAllJobByUserResponse | undefined
}


/**************** FIND ONE  *********************************************/
export interface UseFindOneJobReturn {
  isPending: boolean;
  error: ApiErrors | null,
  t: TFunction<'job', undefined>;
  job: Job | undefined
}


