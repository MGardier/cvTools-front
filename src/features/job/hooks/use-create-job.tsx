import { useTranslation } from "react-i18next";
import { createJobSchema } from "../schema/job-schema";
import { useFieldArray, useForm, type Resolver } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import type { CreateJobParams, CreateJobResponse } from "../types/api";
import { useAuthStore } from "@/features/auth/auth.store";
import { jobService } from "../job.service";
import { toast } from "react-toastify";
import type { ApiErrors } from "@/types/api";
import type { UseCreateJobReturn } from "../types/hook";
import { removeEmptyFields } from "@/utils/utils";
import { queryClient } from "@/api/queryClient";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/data/routes";



export const useCreateJob = (): UseCreateJobReturn => {
  const { t } = useTranslation("job");

  const navigate = useNavigate();

  const schema = createJobSchema(t);
  const userId = Number(useAuthStore().user?.id);

  const defaultValues = {
    //REQUIRED
    enterprise: "",
    link: "",
    jobTitle: "",
    rating: 0,
    archived: false,
    interviewCount: 0,

    //OPTIONNAL
    managerName: "",
    managerEmail: "",
    appliedAt: "" as "",
    lastContactAt: "" as "",
    rejectedReason: "",
    description: "",

    //ENUM
    type: undefined,
    status: undefined,
    compatibility: undefined,
    applicationMethod: undefined,

    //NESTED
    technologies: [{ name: "" }],
    address: {
      city: "",
      postalCode: "",
    },
  };

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

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema) as Resolver<z.infer<typeof schema>>,
    defaultValues,
  });

  const technologiesFields = useFieldArray({
    control: form.control,
    name: "technologies",
  });

  const mutation = useMutation<CreateJobResponse, ApiErrors, CreateJobParams>({
    mutationFn: jobService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`findAllJobByUser-${userId}`]})
      toast.success(t("messages.success.createJob"));
      navigate(`${ROUTES.job.findAll}`)
    },
    onError: () => toast.error(t("messages.errors.fallback")),
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    const params = removeEmptyFields(values) as z.infer<ReturnType<typeof createJobSchema>>;
    mutation.mutate({ ...params, userId });
  };

  return {
    t,
    form,
    error: mutation.error,
    onSubmit,
    isPending: mutation.isPending,
    isError: mutation.isError,
    technologiesFields,
    fieldsInSteps

  };
};
