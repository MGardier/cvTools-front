/**************** SIGNUP *********************************************/

import type { TFunction } from "i18next"
import z from "zod"
import { JobApplyMethod, JobCompatibility, JobStatus, TypeEnterprise } from '../../../types/entity';

export const jobFormSchema = (t: TFunction<'job', undefined>) => {


  return z.object({

    /**************************** FIRST STEP ****************************************** */

    //JOB TITLE
    jobTitle:
      z.string().min(1, { message: t('validation.jobTitle.required') }),

    //TECHNOLOGIES
    technologies:
      z.object({
        name: z.string()
      }).array().transform((array) =>
        // Remove empty technologies
        array.filter(tech => tech.name && tech.name.trim().length > 0)
      )
        .refine(
          (filteredArray) => filteredArray.length >= 1,
          { message: t('validation.technologies.required') }
        ),

    //STATUS
    status:
      z.enum(JobStatus, { message: t('validation.status.required') }),

    //COMPATIBILITY
    compatibility:
      z.enum(JobCompatibility, { message: t('validation.compatibility.required') }),

    //IS FAVORITE
    isFavorite:
      z.coerce.boolean({ message: t('validation.isFavorite.invalid') }),



    /**************************** SECOND STEP ****************************************** */

    //ENTERPRISE
    enterprise:
      z.string().min(1, { message: t('validation.jobTitle.required') }),

    //TYPE
    type:
      z.enum(TypeEnterprise, { message: t('validation.type.required') }),


    //APPLICATION METHOD
    applicationMethod:
      z.enum(JobApplyMethod, { message: t('validation.applicationMethod.required') }),


    //APPLIED AT
    appliedAt: z.union([z.literal(""), z.coerce.date()]),



    /**************************** THIRD STEP ****************************************** */

    //DESCRIPTION
    description:
      z.string().optional(),

    //RATING
    rating:
      z.coerce.number().min(0, { message: t('validation.rating.minLength') }).max(5, { message: t('validation.rating.maxLength') }).nullable(),

    //REJECTED REASON 
    rejectedReason:
      z.string().optional(),

    //ARCHIVED
    isArchived:
      z.coerce.boolean({ message: t('validation.isArchived.invalid') }),



    /**************************** FOURTH STEP ****************************************** */


    //LINK
    link:
      z.string().min(1, { message: t('validation.link.required') }),

    //ADDRESS
    address:
      z.object({
        city: z.string().optional(),
        postalCode: z.string().optional(),
      }, { message: t('validation.address.invalid') }),


    //NOTES
    notes:
      z.string().optional(),


    /**************************** FIFTH STEP ****************************************** */

    //MANAGER NAME
    managerName:
      z.string().optional(),


    //MANAGER EMAIL
    managerEmail:
      z.union([z.literal(""), z.email()]),

    //INTERVIEW COUNT
    interviewCount:
      z.coerce.number().min(0, { message: t('validation.interviewCount.minLength') }),

    //LAST CONTACT AT
    lastContactAt:
      z.union([z.literal(""), z.coerce.date()]),

  })


}
