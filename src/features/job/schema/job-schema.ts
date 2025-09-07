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
        name: z.string()
      }).array().min(1, { message: t('validation.technologies.required') }).transform((tech)=> tech.filter(tech => tech.name.trim())),

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
      z.coerce.date({ message: t('validation.appliedAt.invalid') }).optional(),



    /**************************** THIRD STEP ****************************************** */

    //DESCRIPTION
    description:
      z.string().optional(),

    //RATING
    rating:
      z.coerce.number().min(0, { message: t('validation.rating.minLength') }).max(5, { message: t('validation.rating.maxLength') }).optional(),

    //REJECTED REASON 
    rejectedReason:
      z.string().optional(),

    //ARCHIVED
    archived:
      z.coerce.boolean({ message: t('validation.archived.invalid') }),



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
      z.email( { message: t('validation.managerEmail.required') })
        .optional(),

    //SALARY MIN
    salaryMin:
      z.coerce.number( { message: t('validation.salaryMin.required') })
        .optional(),

    //SALARY MAX
    salaryMax:
      z.coerce.number( { message: t('validation.salaryMax.required') })
        .optional(),

    /**************************** SIXTH STEP ****************************************** */

    //DETAILS TO REMEMBER
    detailsToRemember:
      z.string()
        .optional(),

    //INTERVIEW COUNT
    interviewCount:
      z.coerce.number().min(0, { message: t('validation.interviewCount.minLength') }),

    //LAST CONTACT AT
    lastContactAt:
      z.coerce.date({ message: t('validation.lastContactAt.invalid') }).optional(),


  })

}
