import type { TFunction } from "i18next";

import type { SubmitHandler, UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import type { createJobSchema } from "../schema/job-schema";
import type z from "zod";
import type { ApiErrors } from "@/types/api";

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

