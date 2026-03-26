import { conditionalObject, optString, reqEmail, reqString } from "@/shared/utils/zod-helpers";
import type { TFunction } from "i18next";


/**
 * These schemas use the reusable field helpers from: shared/utils/zod-helpers
 */

export const createContactSchema = (t: TFunction) =>
 conditionalObject(
      {
        firstname:   reqString(t, { max: 100 ,error: t("validation.contact.firstname") }),
        lastname:   reqString(t, { max: 100 , error : t("validation.contact.lastname")}),
        email:   reqEmail(t, { max: 100 , error: t("validation.contact.email")}),
        phone:       optString(t, { max: 20 }),
        profession: reqString(t, { max: 50 }),
        complement:   optString(t, { max: 100 , error:  t("validation.contact.profession")}),
      },
      {
        requiredIfPresent: {
          firstname:  t("validation.contact.firstname"),
          lastname:  t("validation.contact.lastname"),
          email: t("validation.contact.email"),
          profession: t("validation.contact.profession"),
        },
      },
    );
  

  