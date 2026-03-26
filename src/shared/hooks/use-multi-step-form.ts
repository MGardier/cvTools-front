import { useState } from "react";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import type { IStep } from "@/shared/types/hook";

interface IUseMultiStepFormParams<
  TInput extends FieldValues,
  TOutput extends FieldValues = TInput,
> {
  steps: IStep[];
  form: UseFormReturn<TInput, unknown, TOutput>;
}

export const useMultiStepForm = <
  TInput extends FieldValues,
  TOutput extends FieldValues = TInput,
>({
  steps,
  form,
}: IUseMultiStepFormParams<TInput, TOutput>) => {
  const [currentStep, setCurrentStep] = useState(0);

  const totalSteps = steps.length;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;
  const step = steps[currentStep];

  const nextStep = async () => {
    const fields = step.fields as Path<TInput>[];
    const isValid = await form.trigger(fields);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
    }
    return isValid;
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const goToStep = async (index: number) => {
    if (index < currentStep) {
      setCurrentStep(index);
      return true;
    }

    // Validate current step before going forward
    const fields = step.fields as Path<TInput>[];
    const isValid = await form.trigger(fields);
    if (isValid && index <= currentStep + 1) {
      setCurrentStep(index);
    }
    return isValid;
  };

  return {
    currentStep,
    totalSteps,
    isFirstStep,
    isLastStep,
    step,
    nextStep,
    prevStep,
    goToStep,
  };
};
