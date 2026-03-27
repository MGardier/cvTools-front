import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useMultiStepForm } from "@/shared/hooks/use-multi-step-form";
import { applicationService } from "@/lib/api/application/application.service";
import { ROUTES } from "@/app/constants/routes";
import {
  createApplicationSchema,
  type TCreateApplicationFormInput,
  type TCreateApplicationFormOutput,
} from "@/modules/application/schema/application-schema";
import { EApplicationStatus } from "@/modules/application/types";
import { getCreateApplicationSteps } from "../types";

export const useCreateApplicationForm = () => {
  const { t } = useTranslation("application");
  const navigate = useNavigate();

  const schema = useMemo(() => createApplicationSchema(t), [t]);
  const steps = useMemo(() => getCreateApplicationSteps(t), [t]);

  const form = useForm<TCreateApplicationFormInput, unknown, TCreateApplicationFormOutput>({

    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      url: "",
      company: "",
      jobboard: "",
      publishedAt: "",
      contractType: "",
      currentStatus: EApplicationStatus.TO_APPLY,
      experience: "",
      remotePolicy: "",
      compatibility: "",
      salaryMin: "",
      salaryMax: "",
      description: "",

      //Object
      address: {
        city: "",
        postalCode: "",
        street: "",
        streetNumber: "",
        complement: "",
      },
      contacts: [],
      skills: [],
    },
  });

  const multiStep = useMultiStepForm({ steps, form });

  const { mutate, isPending } = useMutation({
    mutationFn: applicationService.create,
    onSuccess: () => {
      toast.success(t("pages.create.messages.success"));
      navigate(ROUTES.application.list);
    },
    onError: () => {
      toast.error(t("pages.create.messages.error"));
    },
  });

  const onSubmit = (data: TCreateApplicationFormOutput) => {
    mutate(data);
  };

  return {
    form,
    onSubmit,
    isPending,
    multiStep,
    steps,
    t,
  };
};
