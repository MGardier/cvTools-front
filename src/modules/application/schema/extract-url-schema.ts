import { reqUrl } from "@/shared/utils/zod-helpers";
import type { TFunction } from "i18next";
import z from "zod/v4";

/**
 * These schemas use the reusable field helpers from: shared/utils/zod-helpers
 */

export const extractUrlSchema = (t: TFunction) =>
  z.object({
    url: reqUrl(t, { required: t("validation.url.required"), invalid: t("validation.url.invalid") }),
  });
