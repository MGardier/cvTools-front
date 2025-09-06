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
        name: z.string().min(1,{ message: t('validation.technologies.required') })
      }).array().min(1, { message: t('validation.technologies.required') }),

    //STATUS
    status:
      z.enum(JobStatus,{ message: t('validation.status.required') }),

    //PRIORITY
    priority:
      z.enum(JobPriority, { message: t('validation.priority.required') }),



     /**************************** SECOND STEP ****************************************** */
    //type
    type:
      z.enum(TypeEnterprise, { message: t('validation.type.notEmpty') }),

    //LINK
    link:
      z.string(),


          //ENTERPRISE
    enterprise:
      z.string().min(1, { message: t('validation.jobTitle.notEmpty') }),




    //APPLICATION METHOD
    applicationMethod:
      z.enum(JobApplyMethod),


    //MANAGER NAME
    managerName:
      z.string()
        .optional(),

    //MANAGER EMAIL
    managerEmail:
      z.email()
        .optional(),


    //DETAILS TO REMEMBER
    detailsToRemember:
      z.string()
        .optional(),


    //SALARY MIN
    salaryMin:
      z.number()
        .optional(),

    //SALARY MAX
    salaryMax:
      z.number()
        .optional(),


    //APPLICATION METHOD
    appliedAt:
      z.date().optional(),


    //ADDRESS
    address:
      z.object({
        city: z.string(),
        postalCode: z.string(),
        street: z.string()
      })

  })

    // CUSTOM VALIDATION
    .refine((data) => Number(data?.salaryMax) > Number(data.salaryMin) && data.salaryMin && data.salaryMax, {
      message: t('errors.validation.confirmPassword.notEqual'),
    })

}
