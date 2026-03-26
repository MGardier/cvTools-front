import { z } from "zod/v4";
import { reqString } from "@/shared/utils/zod-helpers";
import type { TFunction } from "i18next";
import type { UseFormReturn } from "react-hook-form";


/**
 * These schemas use the reusable field helpers from: shared/utils/zod-helpers
 */

export const createSkillSchema = (t: TFunction) =>
  z.object({
    label: reqString(t, { max: 100, error: t("validation.skill.label") }),
  });

export type TCreateSkillInput = z.input<ReturnType<typeof createSkillSchema>>;
export type TCreateSkillOutput = z.output<ReturnType<typeof createSkillSchema>>;
export type TCreateSkillFormReturn = UseFormReturn<TCreateSkillInput, unknown, TCreateSkillOutput>;
