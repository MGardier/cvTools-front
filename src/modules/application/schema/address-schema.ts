import { conditionalObject, optString, reqString } from "@/shared/utils/zod-helpers";
import type { TFunction } from "i18next";


/**
 * These schemas use the reusable field helpers from: shared/utils/zod-helpers
 */

export const createAddressSchema = (t: TFunction) =>

   conditionalObject(
    {
      city:         reqString(t, { max: 100, required: t("validation.address.city.required"), invalid: t("validation.address.city.invalid") }),
      postalCode:   reqString(t, { max: 10, required: t("validation.address.postalCode.required"), invalid: t("validation.address.postalCode.invalid") }),
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
