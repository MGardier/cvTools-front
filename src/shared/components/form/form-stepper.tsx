import { cn } from "@/shared/utils/utils";
import { Check } from "lucide-react";
import type { IStep } from "@/shared/types/hook";

interface IFormStepperProps {
  steps: IStep[];
  currentStep: number;
  onStepClick: (index: number) => void;
}

export const FormStepper = ({
  steps,
  currentStep,
  onStepClick,
}: IFormStepperProps) => {
  return (
    <nav aria-label="Progress" className="w-full">
      <ol className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <li key={step.id} className="flex items-center flex-1 last:flex-none">
              <button
                type="button"
                onClick={() => onStepClick(index)}
                className={cn(
                  "flex flex-col items-center gap-2 group",
                  (isCompleted || isCurrent) && "cursor-pointer",
                  !isCompleted && !isCurrent && "cursor-default"
                )}
              >
                {/* Circle */}
                <span
                  className={cn(
                    "flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full text-sm font-medium transition-colors border-2",
                    isCompleted &&
                      "bg-blue-400 border-blue-400 text-white",
                    isCurrent &&
                      "border-blue-400 text-blue-400 bg-white",
                    !isCompleted &&
                      !isCurrent &&
                      "border-gray-300 text-gray-400 bg-white"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 md:w-5 md:h-5" />
                  ) : (
                    index + 1
                  )}
                </span>

                {/* Label — hidden on mobile */}
                <span
                  className={cn(
                    "hidden md:block text-xs font-medium transition-colors",
                    isCompleted && "text-blue-400",
                    isCurrent && "text-blue-400",
                    !isCompleted && !isCurrent && "text-gray-400"
                  )}
                >
                  {step.label}
                </span>
              </button>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-2 md:mx-4 transition-colors",
                    index < currentStep ? "bg-blue-400" : "bg-gray-300"
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
