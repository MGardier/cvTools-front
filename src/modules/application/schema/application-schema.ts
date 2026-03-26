import { z } from "zod/v4";
import type { TFunction } from "i18next";

import {
  EJobboard,
  EApplicationStatus,
  EContractType,
  EExperienceLevel,
  ERemotePolicy,
  ECompatibilityJob,
  type TJobboard,
  type TApplicationStatus,
  type TContractType,
  type TExperienceLevel,
  type TRemotePolicy,
  type TCompatibilityJob,
} from "@/modules/application/types";
import { createAddressSchema } from "./address-schema";
import { createContactSchema } from "./contact-schema";
import { createSkillSchema } from "./skill-schema";
import { enumValues, optDate, optEnum, optNumber, optString, optUrl, reqEnum, reqString } from "@/shared/utils/zod-helpers";


/**
 * These schemas use the reusable field helpers from: shared/utils/zod-helpers
 */


export const createApplicationSchema = (t: TFunction) =>
  z
    .object({
      // Step 1 — General
      title: reqString(t, { max: 100, error: t("validation.title") }),
      url: optUrl(t),
      company: optString(t, {max: 100}),
      jobboard:  reqEnum<TJobboard>(enumValues(EJobboard), t("validation.jobboard")),
      publishedAt: optDate(t),

      // Step 2 — Classification
      contractType: optEnum<TContractType>(enumValues(EContractType) , t("validation.contractType")),
      currentStatus:  reqEnum<TApplicationStatus>(enumValues(EApplicationStatus), t("validation.currentStatus")),
      experience: optEnum<TExperienceLevel>(enumValues(EExperienceLevel),t("validation.experience")),
      remotePolicy: optEnum<TRemotePolicy>(enumValues(ERemotePolicy),t("validation.remotePolicy")),
      compatibility: optEnum<TCompatibilityJob>(enumValues(ECompatibilityJob),t("validation.compatibility")),

      // Step 3 — Salary & Description
      salaryMin: optNumber(t , {min:10000, minError : t("validation.salaryMin")}),
      salaryMax: optNumber(t),
      description: optString(t),

      // Step 4 — Address
      address: createAddressSchema(t),

      // Step 5 — Contacts
      contacts: z.array(createContactSchema(t)),

      // Step 6 — Skills
      skills: z.array(createSkillSchema(t)),
    })
    .refine(
      (data) => {
        const hasMin = data.salaryMin !== undefined && !Number.isNaN(data.salaryMin);
        const hasMax = data.salaryMax !== undefined && !Number.isNaN(data.salaryMax);
        // Both must be defined or both undefined
        if (hasMin !== hasMax) return false;
        // If both defined, min <= max
        if (hasMin && hasMax) return data.salaryMin! <= data.salaryMax!;
        return true;
      },
      {
        message: t("validation.salaryBoth"),
        path: ["salaryMax"],
      }
    );

export type TCreateApplicationForm = z.infer<ReturnType<typeof createApplicationSchema>>;
