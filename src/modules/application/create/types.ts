import type { IStep } from "@/shared/types/hook";
import type { TFunction } from "i18next";

export const getCreateApplicationSteps = (t: TFunction): IStep[] => [
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
];
