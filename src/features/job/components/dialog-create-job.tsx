import { FormCardContent } from "@/components/form/form-card-content";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { JobFormThirdStep } from "./form/job-form-third-step";
import { JobFormFourthStep } from "./form/job-form-fourth-step";

export function DialogCreateJob() {
  const { t, onSubmit, form, error, isPending, isError, technologiesFields } =
    useCreateJob();
  const [currentStep, setCurrentStep] = useState(1);
  return (
    <div className="grid gap-6">
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button className="flex  gap-2  text-white" variant="blue">
              <Plus />
              Ajouter
            </Button>
          </DialogTrigger>
          <DialogContent className="lg:min-w-4xl md:min-w-2xl min-w-64">
            <DialogHeader>
              <DialogTitle>{t("pages.createJob.title")}</DialogTitle>
              <DialogDescription>
                {isError && (
                  <div className="text-red-600 mt-4 flex items-center justify-center gap-2">
                    <p>
                      <b>
                        {error?.message
                          ? t(`messages.errors.api.${error.message}.short`)
                          : t("messages.errors.fallback")}
                      </b>
                      .
                    </p>
                  </div>
                )}
              </DialogDescription>
            </DialogHeader>
            <Card className="border-0 shadow-none w-full ">
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
                  <JobFormFirstStep {...{ t, form, technologiesFields }} />
                )}

                {/* STEP 2 */} 
                {currentStep === 2 && (
                  <JobFormSecondStep {...{ t, form, technologiesFields }} />
                )}

                {/* STEP 3 */} 
                {currentStep === 3 && (
                  <JobFormThirdStep {...{ t, form, technologiesFields }} />
                )}

                {/* STEP 4 */} 
                {currentStep === 4 && (
                  <JobFormFourthStep {...{ t, form, technologiesFields }} />
                )}

              </FormCardContent>
            </Card>
            <DialogFooter>

              {/* PREVIOUS BUTTON  */} 
              {currentStep !== 1 && (
                <Button
                  variant="destructive"
                  className="w-min flex gap-2 "
                  onClick={() => setCurrentStep((prevStep)=> prevStep-1)}
                >
                  {t("pages.createJob.form.button.previous_step")}
                </Button>
              )}

              {/* NEXT BUTTON  */} 
              {currentStep !== 4 && (
                <Button
                  className="w-min flex gap-2 "
                  variant="blue"
                  onClick={() => setCurrentStep((prevStep) => prevStep+ 1)}
                >
                  {t("pages.createJob.form.button.next_step")}
                </Button>
              )}

              {/* SUBMIT BUTTON  */} 
              {currentStep === 4 && (
                <Button
                  type="submit"
                  variant="blue"
                  className="w-min flex gap-2 "
                  disabled={isPending}
                >
                  {isPending && <Loader2 size="16" className="animate-spin" />}
                  {isPending
                    ? `${t("pages.createJob.form.button.submit")}...`
                    : t("pages.createJob.form.button.submit")}
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}
