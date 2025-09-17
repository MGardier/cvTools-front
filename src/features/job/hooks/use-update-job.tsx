import { useAuthStore } from "@/features/auth/auth.store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { jobApi } from "../job.api";
import { queryClient } from "@/api/queryClient";
import { toast } from "react-toastify";
import { ROUTES } from "@/data/routes";
import type { UpdateJobParams } from "../types/api";
import type { ApiErrors } from "@/types/api";
import type { jobFormSchema } from "../schema/job-schema";
import type z from "zod";
import type { UseUpdateJobReturn } from "../types/hook";
import type { Job } from "@/types/entity";

interface useUpdateJobProps {
  jobId: number;
}

export const useUpdateJob = ({
  jobId,
}: useUpdateJobProps): UseUpdateJobReturn => {
  const { t } = useTranslation("job");

  const navigate = useNavigate();

  const userId = Number(useAuthStore().user?.id);

  const fieldsInSteps = {
    first: new Set([
      "jobTitle",
      "technologies",
      "status",
      "compatibility",
      "isFavorite",
    ]),
    second: new Set(["enterprise", "type", "applicationMethod", "appliedAt"]),
    third: new Set(["description", "rating", "rejectedReason", "isArchived"]),
    fourth: new Set(["link", "address", "notes"]),
    fifth: new Set([
      "managerName",
      "managerEmail",
      "interviewCount",
      "lastContactAt",
    ]),
  };

  /*************************** QUERY ******************************************/

  const query = useQuery<Job, ApiErrors>({
    queryKey: [`findOneJob-${jobId}-user-${userId}`],
    queryFn: () => jobApi.findOneById(jobId, userId),
  });

  /*************************** MUTATION ******************************************/

  const mutation = useMutation<Job, ApiErrors, UpdateJobParams>({
    mutationFn: jobApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`findAllJobByUser-${userId}`],
      });
      toast.success(t("messages.success.createJob"));
      navigate(`${ROUTES.job.findAll}`);
    },
    onError: () => toast.error(t("messages.errors.fallback")),
  });

  const handleSubmit = (values: z.infer<ReturnType<typeof jobFormSchema>>) => {
    mutation.mutate({ ...values, jobId, userId });
  };

  return {
    t,
    job: query.data,
    queryIsError:query.isError,
    queryIsPending:query.isPending,
    mutationIsError:mutation.isError,
    mutationIsPending:mutation.isPending,
    handleSubmit,
    fieldsInSteps,
  };
};
