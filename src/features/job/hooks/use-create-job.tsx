import { useTranslation } from "react-i18next";

import type z from "zod";
import { useMutation } from "@tanstack/react-query";

import { useAuthStore } from "@/features/auth/auth.store";
import { toast } from "react-toastify";
import type { ApiErrors } from "@/types/api";

import { queryClient } from "@/api/queryClient";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/data/routes";
import { jobApi } from "../job.api";
import { jobFormSchema } from "../schema/job-schema";
import type { UseCreateJobReturn } from "../types/hook";




export const useCreateJob = (): UseCreateJobReturn => {
  const { t } = useTranslation("job");

  const navigate = useNavigate();


  const userId = Number(useAuthStore().user?.id);


  const mutation = useMutation<any, ApiErrors, any>({
    mutationFn: jobApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`findAllJobByUser-${userId}`]})
      toast.success(t("messages.success.createJob"));
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
