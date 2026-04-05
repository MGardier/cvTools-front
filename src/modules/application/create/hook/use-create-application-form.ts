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
import type { IStep } from "@/shared/types/hook";

export const useCreateApplicationForm = () => {
  const { t } = useTranslation("application");
  const navigate = useNavigate();

  const schema = useMemo(() => createApplicationSchema(t), [t]);

  const steps: IStep[] = useMemo(
    () => [
      {
        id: "general",
        label: t("pages.create.steps.general"),
        fields: ["title", "url", "company", "jobboard", "publishedAt"],
      },
      {
        id: "classification",
        label: t("pages.create.steps.classification"),
        fields: ["contractType", "currentStatus", "experience", "remotePolicy", "compatibility"],
      },
      {
        id: "salary",
        label: t("pages.create.steps.salary"),
        fields: ["salaryMin", "salaryMax", "description"],
      },
      {
        id: "address",
        label: t("pages.create.steps.address"),
        fields: ["address.city", "address.postalCode", "address.street", "address.streetNumber", "address.complement"],
      },
      {
        id: "contacts",
        label: t("pages.create.steps.contacts"),
        fields: ["contacts"],
      },
      {
        id: "skills",
        label: t("pages.create.steps.skills"),
        fields: ["skills"],
      },
    ],
    [t],
  );

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
