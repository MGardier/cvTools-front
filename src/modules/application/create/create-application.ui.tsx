import type { TFunction } from "i18next";
import { Link2 } from "lucide-react";

import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Form } from "@/shared/components/ui/form";
import { FormLayout } from "@/shared/components/form/form-layout";
import { FormCardHeader } from "@/shared/components/form/form-card-header";
import { FormStepper } from "@/shared/components/form/form-stepper";
import { FormStepNavigation } from "@/shared/components/form/form-step-navigation";
import type { IStep } from "@/shared/types/hook";
import type { TCreateApplicationFormReturn, TCreateApplicationFormOutput } from "@/modules/application/schema/application-schema";
import type { IExtractedApplication } from "@/lib/api/scraper/types";

import { StepGeneral } from "./components/step-general";
import { StepClassification } from "./components/step-classification";
import { StepSalaryDescription } from "./components/step-salary-description";
import { StepAddress } from "./components/step-address";
import { StepContacts } from "./components/step-contacts";
import { StepSkills } from "./components/step-skills";
import { UrlExtractModal } from "./components/url-extract-modal";

interface ICreateApplicationUiProps {
  form: TCreateApplicationFormReturn;
  onSubmit: (data: TCreateApplicationFormOutput) => void;
  isPending: boolean;
  multiStep: {
    currentStep: number;
    totalSteps: number;
    isFirstStep: boolean;
    isLastStep: boolean;
    step: IStep;
    nextStep: () => Promise<boolean>;
    prevStep: () => void;
    goToStep: (index: number) => Promise<boolean>;
  };
  steps: IStep[];
  t: TFunction;
  extractModalOpen: boolean;
  onExtractModalOpen: (open: boolean) => void;
  onExtracted: (data: IExtractedApplication, sourceUrl: string) => void;
}

export const CreateApplicationUi = ({
  form,
  onSubmit,
  isPending,
  multiStep,
  steps,
  t,
  extractModalOpen,
  onExtractModalOpen,
  onExtracted,
}: ICreateApplicationUiProps) => {
  return (
    <FormLayout>
      <Card className="border-0 shadow-none w-full max-w-sm md:max-w-2xl lg:max-w-3xl">
        <FormCardHeader title={t("pages.create.title")}>
          {t("pages.create.subtitle")}
        </FormCardHeader>
        <CardContent className="grid gap-6">
          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onExtractModalOpen(true)}
              className="gap-2"
            >
              <Link2 className="w-4 h-4" />
              {t("pages.create.extract.button")}
            </Button>
          </div>

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
                  <StepContacts form={form} t={t} />
                )}
                {multiStep.currentStep === 5 && (
                  <StepSkills form={form} t={t} />
                )}
              </div>

              <FormStepNavigation
                isFirstStep={multiStep.isFirstStep}
                isLastStep={multiStep.isLastStep}
                isPending={isPending}
                onPrevious={multiStep.prevStep}
                onNext={multiStep.nextStep}
                previousLabel={t("pages.create.navigation.previous")}
                nextLabel={t("pages.create.navigation.next")}
                submitLabel={t("pages.create.navigation.submit")}
              />
            </form>
          </Form>
        </CardContent>
      </Card>

      <UrlExtractModal
        open={extractModalOpen}
        onOpenChange={onExtractModalOpen}
        onExtracted={onExtracted}
      />
    </FormLayout>
  );
};
