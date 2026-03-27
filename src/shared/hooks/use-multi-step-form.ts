import { useState, useCallback } from "react";
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

  /**
   * Validate only the specified fields for the current step.
   */
  const validateStepFields = useCallback(
    async (fields: Path<TInput>[]) => {
      await form.trigger(fields);
      return !fields.some(
        (field) => form.getFieldState(field).error,
      );
    },
    [form],
  );

  const nextStep = useCallback(async () => {
    const fields = step.fields as Path<TInput>[];
    const isValid = await validateStepFields(fields);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
    }
    return isValid;
  }, [step, totalSteps, validateStepFields]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const goToStep = useCallback(async (index: number) => {
    if (index < currentStep) {
      setCurrentStep(index);
      return true;
    }

    const fields = step.fields as Path<TInput>[];
    const isValid = await validateStepFields(fields);
    if (isValid && index <= currentStep + 1) {
      setCurrentStep(index);
    }
    return isValid;
  }, [currentStep, step, validateStepFields]);

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
