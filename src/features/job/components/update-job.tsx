import { FormCardContent } from "@/components/form/form-card-content";
import { FormCardHeader } from "@/components/form/form-card-header";
import { Card } from "@/components/ui/card";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { JobFormFifthStep } from "@/features/job/components/form/job-form-fifth-step";
import { JobFormFirstStep } from "@/features/job/components/form/job-form-first-step";
import { JobFormFourthStep } from "@/features/job/components/form/job-form-fourth-step";
import { JobFormSecondStep } from "@/features/job/components/form/job-form-second-step";
import { JobFormThirdStep } from "@/features/job/components/form/job-form-third-step";
import { useJobForm } from "@/features/job/hooks/use-job-form";

import { cn } from "@/utils/utils";
import { useState } from "react";
import { useUpdateJob } from "../hooks/use-update-job";

interface UpdateJobProps {
  jobId: number
}

export const UpdateJob = ({jobId}: UpdateJobProps)=> {
  
  const {
    t,
    job,
    queryIsError,
    mutationIsError,
    queryIsPending,
    mutationIsPending,
    handleSubmit,
    fieldsInSteps,
  } = useUpdateJob({jobId});


  const {
    onSubmit,
    form,
    technologiesFields,
  } = useJobForm({t,job, handleSubmit});




  const [currentStep, setCurrentStep] = useState(1);

  /* GET ERROR BY STEP */

  const errorFields = Object.keys(form.formState.errors);
  const isErrorInFirstStep = errorFields.some((field) =>
    fieldsInSteps.first.has(field.split(".")[0])
  );
  const isErrorInSecondStep = errorFields.some((field) =>
    fieldsInSteps.second.has(field.split(".")[0])
  );
  const isErrorInThirdStep = errorFields.some((field) =>
    fieldsInSteps.third.has(field.split(".")[0])
  );
  const isErrorInFourthStep = errorFields.some((field) =>
    fieldsInSteps.fourth.has(field.split(".")[0])
  );
  const isErrorInFithStep = errorFields.some((field) =>
    fieldsInSteps.fifth.has(field.split(".")[0])
  );

    if(queryIsPending)
    return <></>
console.log(form.watch("isArchived"))
console.log(form.watch("isFavorite"))
  return (
    <Card key="form" className="border-0 shadow-none w-full max-w-sm md:max-w-md lg:max-w-lg">
      <FormCardHeader title={t("pages.updateJob.title")}>
        <div className="text-red-600 mt-4 flex items-center justify-center gap-2">
          {errorFields.length > 0 && !mutationIsPending && !mutationIsError && (
            <p>
              <b>{t("form.errors.invalidStep")}</b>
            </p>
          )}
          { !mutationIsPending && mutationIsError && (
            <p>
              <b>{t("messages.errors.createJob")}</b>
            </p>
          )}
        </div>
      </FormCardHeader>
      <FormCardContent
        {...{
          onSubmit,
          form,
          labelButton: t("pages.createJob.button"),
          isLoading: mutationIsPending,
        }}
      >
        <div className="grid gap-6">
          {/* STEP 1 */}
          {currentStep === 1 && (
            <JobFormFirstStep
              {...{
                t,
                form,
                technologiesFields,
                isTechnologyFieldInError: errorFields.some(
                  (field) => field.split(".")[0] === "technologies"
                ),
              }}
            />
          )}

          {/* STEP 2 */}
          {currentStep === 2 && <JobFormSecondStep {...{ t, form }} />}

          {/* STEP 3 */}
          {currentStep === 3 && <JobFormThirdStep {...{ t, form }} />}

          {/* STEP 4 */}
          {currentStep === 4 && <JobFormFourthStep {...{ t, form }} />}

          {/* STEP 5 */}
          {currentStep === 5 && <JobFormFifthStep {...{ t, form }} />}

          <Pagination>
            <PaginationContent className="gap-1 md:gap-2">
              <PaginationItem>
                <PaginationPrevious
                  className="h-6 px-1 text-xs md:h-9 md:px-2 md:text-sm"
                  onClick={() =>
                    currentStep > 1 &&
                    setCurrentStep((prevStep) => prevStep - 1)
                  }
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  className={cn(
                    "h-6 w-6 text-xs md:h-9 md:w-9 md:text-sm",
                    isErrorInFirstStep && "text-red-500",
                    currentStep === 1 && "text-blue-600"
                  )}
                  onClick={() => setCurrentStep(1)}
                  isActive={currentStep === 1}
                >
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  className={cn(
                    "h-6 w-6 text-xs md:h-9 md:w-9 md:text-sm",
                    isErrorInSecondStep && "text-red-500",
                    currentStep === 2 && "text-blue-600"
                  )}
                  onClick={() => setCurrentStep(2)}
                  isActive={currentStep === 2}
                >
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  className={cn(
                    "h-6 w-6 text-xs md:h-9 md:w-9 md:text-sm",
                    isErrorInThirdStep && "text-red-500",
                    currentStep === 3 && "text-blue-600"
                  )}
                  onClick={() => setCurrentStep(3)}
                  isActive={currentStep === 3}
                >
                  3
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  className={cn(
                    "h-6 w-6 text-xs md:h-9 md:w-9 md:text-sm",
                    isErrorInFourthStep && "text-red-500",
                    currentStep === 4 && "text-blue-600"
                  )}
                  onClick={() => setCurrentStep(4)}
                  isActive={currentStep === 4}
                >
                  4
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  className={cn(
                    "h-6 w-6 text-xs md:h-9 md:w-9 md:text-sm",
                    isErrorInFithStep && "text-red-500",
                    currentStep === 5 && "text-blue-600"
                  )}
                  onClick={() => setCurrentStep(5)}
                  isActive={currentStep === 5}
                >
                  5
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    currentStep < 5 &&
                    setCurrentStep((prevStep) => prevStep + 1)
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </FormCardContent>
    </Card>
  );
}