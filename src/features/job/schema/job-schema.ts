/**************** SIGNUP *********************************************/

import type { TFunction } from "i18next"
import z from "zod"
import { JobApplyMethod, JobPriority, JobStatus, TypeEnterprise } from '../../../types/entity';

export const createJobSchema = (t: TFunction<'job', undefined>) => {


  return z.object({

    /**************************** FIRST STEP ****************************************** */

    //JOB TITLE
    jobTitle:
      z.string().min(1, { message: t('validation.jobTitle.required') }),

    //TECHNOLOGIES
    technologies:
      z.object({
        name: z.string().min(1, { message: t('validation.technologies.required') })
      }).array().min(1, { message: t('validation.technologies.required') }),

    //STATUS
    status:
      z.enum(JobStatus, { message: t('validation.status.required') }),

    //PRIORITY
    priority:
      z.enum(JobPriority, { message: t('validation.priority.required') }),



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
    appliedAt:
      z.date({ message: t('validation.appliedAt.invalid') }).optional(),



    /**************************** THIRD STEP ****************************************** */

    //DESCRIPTION
    description:
      z.string().optional(),

    //RATING
    rating:
      z.number().min(0, { message: t('validation.rating.minLength') }).max(5, { message: t('validation.rating.maxLength') }).optional(),

    //REJECTED REASON 
    rejectedReason:
      z.string().optional(),

    //ARCHIVED
    archived:
      z.boolean({ message: t('validation.archived.invalid') }),



    /**************************** FOURTH STEP ****************************************** */
    //LINK
    link:
      z.string().min(1, { message: t('validation.link.required') }),

    //ADDRESS
    address:
      z.object({
        city: z.string(),
        postalCode: z.string(),
        street: z.string()
      }, { message: t('validation.address.invalid') }).optional(),


    /**************************** FIFTH STEP ****************************************** */

    //MANAGER NAME
    managerName:
      z.string()
        .optional(),

    //MANAGER EMAIL
    managerEmail:
      z.email()
        .optional(),

    //SALARY MIN
    salaryMin:
      z.number()
        .optional(),

    //SALARY MAX
    salaryMax:
      z.number()
        .optional(),

    /**************************** SIXTH STEP ****************************************** */

    //DETAILS TO REMEMBER
    detailsToRemember:
      z.string()
        .optional(),

    //INTERVIEW COUNT
    interviewCount:
      z.number().min(0, { message: t('validation.interviewCount.minLength') }),

    //LAST CONTACT AT
    lastContactAt:
      z.date({ message: t('validation.lastContactAt.invalid') }).optional(),



  })

    // CUSTOM VALIDATION
    .refine((data) => Number(data?.salaryMax) > Number(data.salaryMin) && data.salaryMin && data.salaryMax, {
      message: t('errors.validation.confirmPassword.notEqual'),
    })

}
