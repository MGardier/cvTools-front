import { useState } from "react";
import { useCreateJob } from "../hooks/use-create-job";
import { Card } from "@/components/ui/card";
import { FormCardHeader } from "@/components/form/form-card-header";
import { FormCardContent } from "@/components/form/form-card-content";
import { JobFormFirstStep } from "./form/job-form-first-step";
import { JobFormSecondStep } from "./form/job-form-second-step";
import { JobFormThirdStep } from "./form/job-form-third-step";
import { JobFormFourthStep } from "./form/job-form-fourth-step";
import { JobFormFifthStep } from "./form/job-form-fifth-step";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/utils/utils";

export const CreateJob = () => {
  const {
    t,
    onSubmit,
    form,
    error,
    isPending,
    isError,
    technologiesFields,
    fieldsInSteps,
  } = useCreateJob();
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

  console.log(form.formState.errors)

  return (
    <Card className="border-0 shadow-none w-full max-w-sm md:max-w-md lg:max-w-lg">
      <FormCardHeader title={t("pages.createJob.title")}>

        {form.formState.errors  && (
          <div className="text-red-600 mt-4 flex items-center justify-center gap-2">
            <p>
              <b>
                { t("form.errors.invalidStep")}
              </b>
            </p>
          </div>
        )}
      </FormCardHeader>
      <FormCardContent
        {...{
          onSubmit,
          form,
          labelButton: t("pages.createJob.button"),
          isLoading: isPending,
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
};
