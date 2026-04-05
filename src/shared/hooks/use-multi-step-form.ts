import { useState, useCallback } from "react";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";
import type { IStep } from "@/shared/types/hook";

interface IUseMultiStepFormParams<
  TInput extends FieldValues,
  TOutput extends FieldValues = TInput,
> {
  steps: IStep[];
  form: UseFormReturn<TInput, unknown, TOutput>;
  freeNavigation?: boolean;
}

export const useMultiStepForm = <
  TInput extends FieldValues,
  TOutput extends FieldValues = TInput,
>({
  steps,
  form,
  freeNavigation,
}: IUseMultiStepFormParams<TInput, TOutput>) => {
  const freeNav = freeNavigation ?? false;
  const [currentStep, setCurrentStep] = useState(0);

  const totalSteps = steps.length;
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;
  const step = steps[currentStep];

  /**
   * Validate current step fields including root-level refinements (superRefine).
   * Triggers full schema validation to catch cross-field rules,
   * then checks only the current step's fields for errors and clears the rest.
   */
  const validateStepFields = useCallback(
    async (fields: Path<TInput>[]) => {
      // Field-level validation
      await form.trigger(fields);
      // Root-level validation (superRefine) for cross-field rules
      await form.trigger();
      // Only check current step fields
      const valid = !fields.some(
        (field) => form.getFieldState(field).error,
      );
      // Clean up errors triggered on other steps
      const fieldSet = new Set<string>(fields);
      const otherFields = steps
        .flatMap((s) => s.fields)
        .filter((f) => !fieldSet.has(f)) as Path<TInput>[];
      if (otherFields.length) form.clearErrors(otherFields);
      return valid;
    },
    [form, steps],
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
    if (freeNav) {
      setCurrentStep(index);
      return true;
    }

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
  }, [currentStep, step, validateStepFields, freeNav]);

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

export type TMultiStepFormReturn = ReturnType<typeof useMultiStepForm>;
