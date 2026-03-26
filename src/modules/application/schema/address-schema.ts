import { conditionalObject, optString, reqString } from "@/shared/utils/zod-helpers";
import type { TFunction } from "i18next";


/**
 * These schemas use the reusable field helpers from: shared/utils/zod-helpers
 */

export const createAddressSchema = (t: TFunction) =>

   conditionalObject(
    {
      city:         reqString(t, { max: 100 }),
      postalCode:   reqString(t, { max: 10 }),
      street:       optString(t, { max: 100 }),
      streetNumber: optString(t, { max: 10 }),
      complement:   optString(t, { max: 100 }),
    },
    {
      requiredIfPresent: {
        city: t("validation.address.city"),
        postalCode: t("validation.address.postalCode"),
      },
    },
  );

