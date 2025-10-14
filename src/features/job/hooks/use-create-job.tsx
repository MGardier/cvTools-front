import { useTranslation } from "react-i18next";

import type z from "zod";
import { useMutation } from "@tanstack/react-query";

import { useAuthStore } from "@/features/auth/auth.store";
import { toast } from "react-toastify";
import type { IApiErrors } from "@/types/api";

import { queryClient } from "@/api/queryClient";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/data/routes";
import { jobFormSchema } from "../schema/job-schema";
import type { IUseCreateJobReturn } from "../types/hook";
import { JobService } from "../job.service";
import type { ICreateJobParams } from "../types/api";




export const useCreateJob = (): IUseCreateJobReturn => {
  const { t } = useTranslation("job");

  const navigate = useNavigate();


  const userId = Number(useAuthStore().user?.id);


  const mutation = useMutation<void, IApiErrors, ICreateJobParams>({
    mutationFn: JobService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`findAllJobByUser-${userId}`]})
      toast.success(t("messages.success.create"));
      navigate(`/${ROUTES.job.findAll}`)
    },
    onError: () => toast.error(t("messages.errors.fallback")),
  });

  const handleSubmit = (values: z.infer<ReturnType<typeof jobFormSchema>>) => {
    mutation.mutate({ ...values, userId });
  };

  return {
    t,
    handleSubmit,
    isPending: mutation.isPending,
    isError: mutation.isError,
 
  };
};
