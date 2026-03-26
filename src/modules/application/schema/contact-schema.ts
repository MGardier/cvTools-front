import { z } from "zod/v4";
import { optString, reqEmail, reqString } from "@/shared/utils/zod-helpers";
import type { TFunction } from "i18next";
import type { UseFormReturn } from "react-hook-form";


/**
 * These schemas use the reusable field helpers from: shared/utils/zod-helpers
 */

export const createContactSchema = (t: TFunction) =>
  z.object({
    firstname: reqString(t, { max: 100, error: t("validation.contact.firstname") }),
    lastname: reqString(t, { max: 100, error: t("validation.contact.lastname") }),
    email: reqEmail(t, { max: 100, error: t("validation.contact.email") }),
    phone: optString(t, { max: 20 }),
    profession: reqString(t, { max: 50 }),
  });

export type TCreateContactInput = z.input<ReturnType<typeof createContactSchema>>;
export type TCreateContactOutput = z.output<ReturnType<typeof createContactSchema>>;
export type TCreateContactFormReturn = UseFormReturn<TCreateContactInput, unknown, TCreateContactOutput>;
