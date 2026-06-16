import type { TFunction } from "i18next";
import z from "zod";

const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/;

/**************** ADMIN REGISTER *********************************************/

// No email field: it comes from the validated invitation, not from the form.
export const createAdminRegisterSchema = (t: TFunction<'auth', undefined>) => {

  return z.object({

    //PASSWORD
    password:
      z.string({ message: t('validation.password.invalid') })
        .min(8, { message: t('validation.password.minLength') })
        .regex(REGEX_PASSWORD, { message: t('validation.password.invalid') }),

    //CONFIRM PASSWORD
    confirmPassword:
      z.string({ message: t('validation.confirmPassword.invalid') })
        .min(8, { message: t('validation.confirmPassword.minLength') })
        .regex(REGEX_PASSWORD, { message: t('validation.confirmPassword.invalid') }),
  })

    // CUSTOM VALIDATION
    .refine((data) => data.password === data.confirmPassword, {
      message: t('errors.validation.confirmPassword.notEqual'),
    })

}
