import { z } from "zod/v4";
import { optString, reqEmail, reqString } from "@/shared/utils/zod-helpers";
import type { TFunction } from "i18next";
import type { UseFormReturn } from "react-hook-form";


/**
 * These schemas use the reusable field helpers from: shared/utils/zod-helpers
 */

export const createContactSchema = (t: TFunction) =>
  z.object({
    firstname: reqString(t, { max: 100, required: t("validation.contact.firstname.required"), invalid: t("validation.contact.firstname.invalid") }),
    lastname: reqString(t, { max: 100, required: t("validation.contact.lastname.required"), invalid: t("validation.contact.lastname.invalid") }),
    email: reqEmail(t, { max: 100, required: t("validation.contact.email.required"), invalid: t("validation.contact.email.invalid") }),
    phone: optString(t, { max: 20, invalid: t("validation.contact.phone.invalid") }),
    profession: reqString(t, { max: 50, required: t("validation.contact.profession.required"), invalid: t("validation.contact.profession.invalid") }),
  });

export type TCreateContactInput = z.input<ReturnType<typeof createContactSchema>>;
export type TCreateContactOutput = z.output<ReturnType<typeof createContactSchema>>;
export type TCreateContactFormReturn = UseFormReturn<TCreateContactInput, unknown, TCreateContactOutput>;
