import { useTranslation } from "react-i18next";
import { createJobSchema } from "../schema/job-schema";
import { useForm } from "react-hook-form";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import type { CreateJobParams, CreateJobResponse } from "../types/api";
import { useAuthStore } from "@/features/auth/auth.store";
import { jobService } from "../job.service";
import { toast } from "react-toastify";
import type { ApiErrors } from "@/types/api";

export const useCreateJob = () => {
  
  const { t } = useTranslation("job");

  const schema = createJobSchema(t);
  const userId = Number(useAuthStore().user?.id);

  const defaultValues = {
    //REQUIRED
    enterprise: "",
    link: "",
    jobTitle: "",
    managerName: "",
    managerEmail: "",
    detailsToRemember: "",

    //OPTIONNAL
    salaryMin: undefined,
    salaryMax: undefined,
    appliedAt: undefined,

    //ENUM
    type: undefined,
    status: undefined,
    priority: undefined,
    applicationMethod: undefined,

    //NESTED
    technologies: [{ name: "" }],
    address: {
      city: "",
      postalCode: "",
      street: "",
    },
  };

    const form = useForm<z.infer<typeof schema>>({
      resolver: zodResolver(schema),
      defaultValues,
    });

    const mutation = useMutation<
    CreateJobResponse,
    ApiErrors,
    CreateJobParams
  >({
    mutationFn: jobService.create,
    onSuccess: (response) => {
      toast.success(t("messages.success.signIn"));
     
    },
    onError: () => toast.error(t("messages.errors.fallback")),
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    
    mutation.mutate({...values,userId});
  };



  return {t,form, onSubmit, isPending : mutation.isPending,}



};
