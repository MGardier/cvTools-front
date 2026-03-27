import { conditionalObject, optString } from "@/shared/utils/zod-helpers";
import type { TFunction } from "i18next";


/**
 * These schemas use the reusable field helpers from: shared/utils/zod-helpers
 *
 * All fields use optString — the "required when present" logic is handled
 * by conditionalObject's requiredIfPresent option.
 */

export const createAddressSchema = (t: TFunction) =>

   conditionalObject(
    {
      city:         optString(t, { max: 100, invalid: t("validation.address.city.invalid") }),
      postalCode:   optString(t, { max: 10, invalid: t("validation.address.postalCode.invalid") }),
      street:       optString(t, { max: 100, invalid: t("validation.address.street.invalid") }),
      streetNumber: optString(t, { max: 10, invalid: t("validation.address.streetNumber.invalid") }),
      complement:   optString(t, { max: 100, invalid: t("validation.address.complement.invalid") }),
    },
    {
      requiredIfPresent: {
        city: t("validation.address.city.required"),
        postalCode: t("validation.address.postalCode.required"),
      },
    },
  );
