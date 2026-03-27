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
import { enumValues, optDate, optEnum, optNumber, optString, reqEnum, reqString, reqUrl } from "@/shared/utils/zod-helpers";


/**
 * These schemas use the reusable field helpers from: shared/utils/zod-helpers
 */


export const createApplicationSchema = (t: TFunction) =>
  z
    .object({
      // Step 1 — General
      title: reqString(t, { max: 100, required: t("validation.title.required"), invalid: t("validation.title.invalid") }),
      url: reqUrl(t, { required: t("validation.url.required"), invalid: t("validation.url.invalid") }),
      company: optString(t, { max: 100, invalid: t("validation.company.invalid") }),
      jobboard: reqEnum<TJobboard>(enumValues(EJobboard), { required: t("validation.jobboard.required"), invalid: t("validation.jobboard.invalid") }),
      publishedAt: optDate(t, { invalid: t("validation.publishedAt.invalid") }),

      // Step 2 — Classification
      contractType: reqEnum<TContractType>(enumValues(EContractType), { required: t("validation.contractType.required"), invalid: t("validation.contractType.invalid") }),
      currentStatus: reqEnum<TApplicationStatus>(enumValues(EApplicationStatus), { required: t("validation.currentStatus.required"), invalid: t("validation.currentStatus.invalid") }),
      experience: optEnum<TExperienceLevel>(enumValues(EExperienceLevel), { invalid: t("validation.experience.invalid") }),
      remotePolicy: optEnum<TRemotePolicy>(enumValues(ERemotePolicy), { invalid: t("validation.remotePolicy.invalid") }),
      compatibility: optEnum<TCompatibilityJob>(enumValues(ECompatibilityJob), { invalid: t("validation.compatibility.invalid") }),

      // Step 3 — Salary & Description
      salaryMin: optNumber(t, { min: 10000, invalid: t("validation.salaryMin.invalid") }),
      salaryMax: optNumber(t, { min: 10000, invalid: t("validation.salaryMax.invalid") }),
      description: optString(t),

      // Step 4 — Address
      address: createAddressSchema(t),

      // Step 5 — Contacts (stored as full objects with id from backend)
      contacts: z.array(
        z.object({
          id: z.number(),
          firstname: z.string(),
          lastname: z.string(),
          email: z.string(),
          phone: z.string().optional(),
          profession: z.string(),
        })
      ),

      // Step 6 — Skills (stored as full objects with id from backend)
      skills: z.array(
        z.object({
          id: z.number(),
          label: z.string(),
        })
      ),
    })
    .superRefine((data, ctx) => {
      const hasMin = data.salaryMin !== undefined && !Number.isNaN(data.salaryMin);
      const hasMax = data.salaryMax !== undefined && !Number.isNaN(data.salaryMax);
      const invalid = hasMin !== hasMax || (hasMin && hasMax && data.salaryMin! > data.salaryMax!);
      if (invalid) {
        ctx.addIssue({
          code: "custom",
          path: ["salaryMax"],
          message: t("validation.salaryBoth"),
        });
      }
    });

export type TCreateApplicationFormInput = z.input<ReturnType<typeof createApplicationSchema>>;
export type TCreateApplicationFormOutput = z.output<ReturnType<typeof createApplicationSchema>>;

export type { UseFormReturn } from "react-hook-form";
import type { UseFormReturn } from "react-hook-form";
export type TCreateApplicationFormReturn = UseFormReturn<TCreateApplicationFormInput, unknown, TCreateApplicationFormOutput>;
