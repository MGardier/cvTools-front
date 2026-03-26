import { reqString } from "@/shared/utils/zod-helpers";
import type { TFunction } from "i18next";
import z from "zod/v4";


/**
 * These schemas use the reusable field helpers from: shared/utils/zod-helpers
 */

export const createSkillSchema = (t: TFunction) =>
  z.object({
    label: reqString(t,{max: 100, error: t("validation.skill.label")}),
  });
