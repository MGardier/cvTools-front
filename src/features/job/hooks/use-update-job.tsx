import { useAuthStore } from "@/features/auth/auth.store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { jobApi } from "../job.api";
import { queryClient } from "@/api/queryClient";
import { toast } from "react-toastify";
import { ROUTES } from "@/data/routes";
import type { IUpdateJobParams } from "../types/api";
import type { IApiErrors } from "@/types/api";
import type { jobFormSchema } from "../schema/job-schema";
import type z from "zod";
import type { IUseUpdateJobReturn } from "../types/hook";
import type { Job } from "@/types/entity";
import { JobService } from "../job.service";

interface useUpdateJobProps {
  jobId: number;
}

export const useUpdateJob = ({
  jobId,
}: useUpdateJobProps): IUseUpdateJobReturn => {
  const { t } = useTranslation("job");

  const navigate = useNavigate();

  const userId = Number(useAuthStore().user?.id);


  /*************************** QUERY ******************************************/

  const query = useQuery<Job, IApiErrors>({
    queryKey: [`findOneJob-${jobId}-user-${userId}`],
    queryFn: () => jobApi.findOneById(jobId, userId),
  });

  /*************************** MUTATION ******************************************/

  const mutation = useMutation<void, IApiErrors, IUpdateJobParams>({
    mutationFn: JobService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`findAllJobByUser-${userId}`],
      });
      toast.success(t("messages.success.update"));
      navigate(`/${ROUTES.job.findAll}`)
    },
    onError: () => toast.error(t("messages.errors.fallback")),
  });

  const handleSubmit = (values: z.infer<ReturnType<typeof jobFormSchema>>) => {
    mutation.mutate({ ...values, jobId, userId });
  };

  return {
    t,
    job: query.data,
    query,
    mutationIsError:mutation.isError,
    mutationIsPending:mutation.isPending,
    handleSubmit,
    
  };
};
