import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { useMultiStepForm } from "@/shared/hooks/use-multi-step-form";
import { applicationService } from "@/lib/api/application/application.service";
import { skillService } from "@/lib/api/skill/skill.service";
import { ROUTES } from "@/app/constants/routes";
import {
  createApplicationSchema,
  type TCreateApplicationFormInput,
  type TCreateApplicationFormOutput,
} from "@/modules/application/schema/application-schema";
import { EApplicationStatus } from "@/modules/application/types";
import { getCreateApplicationSteps } from "./types";
import { CreateApplicationUi } from "./create-application.ui";
import type { IExtractedApplication } from "@/lib/api/scraper/types";

export const CreateApplication = () => {
  const { t } = useTranslation("application");
  const navigate = useNavigate();

  const schema = useMemo(() => createApplicationSchema(t), [t]);
  const steps = useMemo(() => getCreateApplicationSteps(t), [t]);

  const [extractModalOpen, setExtractModalOpen] = useState(false);

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

  const handleExtracted = useCallback(
    async (data: IExtractedApplication, sourceUrl: string) => {
      if (data.title) form.setValue("title", data.title);
      if (sourceUrl) form.setValue("url", sourceUrl);
      if (data.company) form.setValue("company", data.company);
      if (data.description) form.setValue("description", data.description);
      if (data.contractType) form.setValue("contractType", data.contractType);
      if (data.salaryMin !== undefined) form.setValue("salaryMin", String(data.salaryMin));
      if (data.salaryMax !== undefined) form.setValue("salaryMax", String(data.salaryMax));
      if (data.experience) form.setValue("experience", data.experience);
      if (data.remotePolicy) form.setValue("remotePolicy", data.remotePolicy);
      if (data.publishedAt) form.setValue("publishedAt", data.publishedAt);

      if (data.address) {
        if (data.address.city) form.setValue("address.city", data.address.city);
        if (data.address.postalCode) form.setValue("address.postalCode", data.address.postalCode);
        if (data.address.street) form.setValue("address.street", data.address.street);
        if (data.address.streetNumber) form.setValue("address.streetNumber", data.address.streetNumber);
        if (data.address.complement) form.setValue("address.complement", data.address.complement);
      }

      if (data.skills?.length) {
        try {
          const created = await Promise.all(
            data.skills.map((label) => skillService.create({ label }))
          );
          const existing = form.getValues("skills");
          form.setValue("skills", [...existing, ...created.map((s) => ({ id: s.id, label: s.label }))]);
        } catch {
          // skills pre-fill is best-effort
        }
      }
    },
    [form]
  );

  const onSubmit = (data: TCreateApplicationFormOutput) => {
    mutate(data);
  };

  return (
    <CreateApplicationUi
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
      multiStep={multiStep}
      steps={steps}
      t={t}
      extractModalOpen={extractModalOpen}
      onExtractModalOpen={setExtractModalOpen}
      onExtracted={handleExtracted}
    />
  );
};
