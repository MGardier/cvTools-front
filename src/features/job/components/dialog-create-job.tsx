import { FormCardContent } from "@/components/form/form-card-content";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Plus } from "lucide-react";
import { useCreateJob } from "../hooks/useCreateJob";
import { useState } from "react";
import { JobFormFirstStep } from "./form/job-form-first-step";
import { JobFormSecondStep } from "./form/job-form-second-step";
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
import { JobFormSixthStep } from "./form/job-form-sixth-step";
import { JobFormThirdStep } from "./form/job-form-third-step";
import { DialogDescription } from "@radix-ui/react-dialog";


export function DialogCreateJob() {
  const { t, onSubmit, form, error, isPending, isError, technologiesFields } =
    useCreateJob();
  const [currentStep, setCurrentStep] = useState(1);
  const fieldsInSteps = {
    first: new Set(["jobTitle", "technologies", "status", "priority"]),
    second: new Set(["enterprise", "type", "applicationMethod", "appliedAt"]),
    third: new Set(["description", "rating", "rejectedReason", "archived"]),
    fourth: new Set(["link", "address"]),
    fifth: new Set(["managerName", "managerEmail", "salaryMin", "salaryMax"]),
    sixth: new Set(["detailsToRemember", "interviewCount", "lastContactAt"]),
  };

  //Know which steps in invalid
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
  const isErrorInSixthStep = errorFields.some((field) =>
    fieldsInSteps.sixth.has(field.split(".")[0])
  );

  //TODO: message de trad avec params
  return (
    <div className="grid gap-6">
      <Dialog>
        {/* TRIGGER MODAL */}
        <DialogTrigger asChild>
          <Button className="flex  gap-2  text-white" variant="blue">
            <Plus />
            Ajouter
          </Button>
        </DialogTrigger>

        {/************* CONTENT *********************************************** */}
        <DialogContent className="flex flex-col w-full  max-w-[calc(100%-1rem)]  md:max-w-[calc(100%-1rem)] overflow-hidden   lg:max-w-4xl max-h-[95vh] md:max-h-[90vh] lg:max-h-[90vh] ">
          <DialogHeader>
            <DialogTitle className="text-lg">
              {t("pages.createJob.title")}
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div className="text-red-600 text-xs flex-shrink-0 flex flex-col items-center gap-1">
            {/* ERROR DISPLAY */}

            {isError && (
              <p>
                <b>
                  {error?.message
                    ? t(`messages.errors.api.${error.message}.short`)
                    : t("messages.errors.fallback")}
                </b>
                .
              </p>
            )}

            {errorFields.length > 0 && (
              <p>{t("pages.createJob.form.errors.invalid_fields")}</p>
            )}
          </div>
          {/* FORM */}
          <Card className="border-0 shadow-none  ">
            <FormCardContent
              {...{
                onSubmit,
                form,
                labelButton: t("pages.createJob.form.button"),
                isLoading: isPending,
              }}
            >
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

              {/* STEP 6 */}
              {currentStep === 6 && <JobFormSixthStep {...{ t, form }} />}

              {/************* FOOTER *********************************************** */}

              {/* PAGINATION */}
              <DialogFooter className="flex-shrink-0 flex flex-col gap-2 md:flex-row md:justify-between md:items-center mt-2 md:mt-4">
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
                        className={`h-6 w-6 text-xs md:h-9 md:w-9 md:text-sm ${
                          isErrorInFirstStep ? "text-red-500" : ""
                        }`}
                        onClick={() => setCurrentStep(1)}
                        isActive={currentStep === 1}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        className={`h-6 w-6 text-xs md:h-9 md:w-9 md:text-sm ${
                          isErrorInSecondStep ? "text-red-500" : ""
                        }`}
                        onClick={() => setCurrentStep(2)}
                        isActive={currentStep === 2}
                      >
                        2
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        className={`h-6 w-6 text-xs md:h-9 md:w-9 md:text-sm ${
                          isErrorInThirdStep ? "text-red-500" : ""
                        }`}
                        onClick={() => setCurrentStep(3)}
                        isActive={currentStep === 3}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        className={`h-6 w-6 text-xs md:h-9 md:w-9 md:text-sm ${
                          isErrorInFourthStep ? "text-red-500" : ""
                        }`}
                        onClick={() => setCurrentStep(4)}
                        isActive={currentStep === 4}
                      >
                        4
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        className={`h-6 w-6 text-xs md:h-9 md:w-9 md:text-sm ${
                          isErrorInFithStep ? "text-red-500" : ""
                        }`}
                        onClick={() => setCurrentStep(5)}
                        isActive={currentStep === 5}
                      >
                        5
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        className={`h-6 w-6 text-xs md:h-9 md:w-9 md:text-sm ${
                          isErrorInSixthStep ? "text-red-500" : ""
                        }`}
                        onClick={() => setCurrentStep(6)}
                        isActive={currentStep === 6}
                      >
                        6
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext
                        onClick={() =>
                          currentStep < 6 &&
                          setCurrentStep((prevStep) => prevStep + 1)
                        }
                    
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>

                {/* SUBMIT BUTTON  */}
                {currentStep === 6 && (
                  <Button
                    type="submit"
                    variant="blue"
                    className="h-6 px-2 text-xs md:h-10 md:px-4 md:text-sm flex items-center gap-1 md:gap-2 w-full md:w-auto"
                    disabled={isPending}
                  >
                    {isPending && (
                      <Loader2 size="16" className="animate-spin" />
                    )}
                    {isPending
                      ? `${t("pages.createJob.form.button.submit")}...`
                      : t("pages.createJob.form.button.submit")}
                  </Button>
                )}
              </DialogFooter>
            </FormCardContent>
          </Card>
        </DialogContent>
      </Dialog>
    </div>
  );
}
