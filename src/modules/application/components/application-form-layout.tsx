import type { ReactNode } from "react";
import type { TFunction } from "i18next";

import { Card, CardContent } from "@/shared/components/ui/card";
import { Form } from "@/shared/components/ui/form";
import { FormLayout } from "@/shared/components/form/form-layout";
import { FormCardHeader } from "@/shared/components/form/form-card-header";
import { FormStepper } from "@/shared/components/form/form-stepper";
import { FormStepNavigation } from "@/shared/components/form/form-step-navigation";
import { Button } from "@/shared/components/ui/button";
import { Loader2 } from "lucide-react";
import type { IStep } from "@/shared/types/hook";
import type { TMultiStepFormReturn } from "@/shared/hooks/use-multi-step-form";
import type { TCreateApplicationFormReturn, TCreateApplicationFormOutput } from "@/modules/application/schema/application-schema";

import { StepGeneral } from "@/modules/application/create/components/step-general";
import { StepClassification } from "@/modules/application/create/components/step-classification";
import { StepSalaryDescription } from "@/modules/application/create/components/step-salary-description";
import { StepAddress } from "@/modules/application/create/components/step-address";
import { StepContacts } from "@/modules/application/create/components/step-contacts";
import { StepSkills } from "@/modules/application/create/components/step-skills";

interface IApplicationFormLayoutProps {
  form: TCreateApplicationFormReturn;
  onSubmit: (data: TCreateApplicationFormOutput) => void;
  isPending: boolean;
  multiStep: TMultiStepFormReturn;
  steps: IStep[];
  t: TFunction;
  title: string;
  subtitle: string;
  submitLabel: string;
  headerSlot?: ReactNode;
  showPersistentSubmit?: boolean;
  applicationId?: number;
}

export const ApplicationFormLayout = ({
  form,
  onSubmit,
  isPending,
  multiStep,
  steps,
  t,
  title,
  subtitle,
  submitLabel,
  headerSlot,
  showPersistentSubmit = false,
  applicationId,
}: IApplicationFormLayoutProps) => {
  return (
    <FormLayout>
      <Card className="border-0 shadow-none w-full max-w-sm md:max-w-2xl lg:max-w-3xl">
        <FormCardHeader title={title}>
          {subtitle}
        </FormCardHeader>
        <CardContent className="grid gap-6">
          {headerSlot}

          <FormStepper
            steps={steps}
            currentStep={multiStep.currentStep}
            onStepClick={multiStep.goToStep}
          />

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="min-h-[300px]">
                {multiStep.currentStep === 0 && (
                  <StepGeneral form={form} t={t} />
                )}
                {multiStep.currentStep === 1 && (
                  <StepClassification form={form} t={t} />
                )}
                {multiStep.currentStep === 2 && (
                  <StepSalaryDescription form={form} t={t} />
                )}
                {multiStep.currentStep === 3 && (
                  <StepAddress form={form} t={t} />
                )}
                {multiStep.currentStep === 4 && (
                  <StepContacts form={form} t={t} applicationId={applicationId} />
                )}
                {multiStep.currentStep === 5 && (
                  <StepSkills form={form} t={t} applicationId={applicationId} />
                )}
              </div>

              {showPersistentSubmit ? (
                <div className="flex items-center justify-between pt-6">
                  {!multiStep.isFirstStep ? (
                    <Button type="button" variant="outline" onClick={multiStep.prevStep} className="gap-2">
                      {t("pages.create.navigation.previous")}
                    </Button>
                  ) : (
                    <div />
                  )}
                  <div className="flex items-center gap-2">
                    {!multiStep.isLastStep && (
                      <Button type="button" variant="outline" onClick={multiStep.nextStep} className="gap-2">
                        {t("pages.create.navigation.next")}
                      </Button>
                    )}
                    <Button type="submit" variant="blue" disabled={isPending} className="gap-2 text-white">
                      {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                      {submitLabel}
                    </Button>
                  </div>
                </div>
              ) : (
                <FormStepNavigation
                  isFirstStep={multiStep.isFirstStep}
                  isLastStep={multiStep.isLastStep}
                  isPending={isPending}
                  onPrevious={multiStep.prevStep}
                  onNext={multiStep.nextStep}
                  previousLabel={t("pages.create.navigation.previous")}
                  nextLabel={t("pages.create.navigation.next")}
                  submitLabel={submitLabel}
                />
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    </FormLayout>
  );
};
