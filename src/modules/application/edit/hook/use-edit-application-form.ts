import { useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

import { useMe } from "@/shared/hooks/useMe";
import { useMultiStepForm } from "@/shared/hooks/use-multi-step-form";
import { applicationService } from "@/lib/api/application/application.service";
import { ROUTES } from "@/app/constants/routes";
import {
  createApplicationSchema,
  type TCreateApplicationFormInput,
  type TCreateApplicationFormOutput,
} from "@/modules/application/schema/application-schema";
import type { IStep } from "@/shared/types/hook";

export const useEditApplicationForm = () => {
  const { t } = useTranslation("application");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const { user } = useMe();
  const applicationId = Number(id);

  const hasPrefilledRef = useRef(false);

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
      currentStatus: "",
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

  // Fetch existing application
  const { data, isLoading, isError } = useQuery({
    queryKey: ["application", applicationId],
    queryFn: () => applicationService.findOneById(applicationId),
    enabled: !!user && !Number.isNaN(applicationId),
  });

  // Prefill form when data arrives
  useEffect(() => {
    const application = data?.data;
    if (!application || hasPrefilledRef.current) return;
    hasPrefilledRef.current = true;

    form.reset({
      title: application.title,
      url: application.url,
      company: application.company ?? "",
      jobboard: application.jobboard ?? "",
      publishedAt: application.publishedAt
        ? new Date(application.publishedAt).toISOString().split("T")[0]
        : "",
      contractType: application.contractType,
      currentStatus: application.currentStatus,
      experience: application.experience ?? "",
      remotePolicy: application.remotePolicy ?? "",
      compatibility: application.compatibility ?? "",
      salaryMin: application.salaryMin != null ? String(application.salaryMin) : "",
      salaryMax: application.salaryMax != null ? String(application.salaryMax) : "",
      description: application.description ?? "",
      address: {
        city: application.address?.city ?? "",
        postalCode: application.address?.postalCode ?? "",
        street: application.address?.street ?? "",
        streetNumber: application.address?.streetNumber ?? "",
        complement: application.address?.complement ?? "",
      },
      contacts: application.contacts?.map((c) => ({
        id: c.id,
        firstname: c.firstname,
        lastname: c.lastname,
        email: c.email,
        phone: c.phone,
        profession: c.profession,
      })) ?? [],
      skills: application.skills?.map((s) => ({
        id: s.id,
        label: s.label,
        isOwner: s.isOwner,
        isUsed: s.isUsed,
      })) ?? [],
    });
  }, [data, form]);

  const multiStep = useMultiStepForm({ steps, form, freeNavigation: true });

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: TCreateApplicationFormOutput) =>
      applicationService.update(applicationId, formData),
    onSuccess: () => {
      toast.success(t("pages.edit.messages.success"));
      queryClient.invalidateQueries({ queryKey: ["application", applicationId] });
      queryClient.invalidateQueries({ queryKey: ["applications"] });
      navigate(ROUTES.application.detail(applicationId));
    },
    onError: () => {
      toast.error(t("pages.edit.messages.error"));
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
    isLoading,
    isError,
    applicationId,
  };
};
