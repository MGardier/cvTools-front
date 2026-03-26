import { Button } from "@/shared/components/ui/button";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

interface IFormStepNavigationProps {
  isFirstStep: boolean;
  isLastStep: boolean;
  isPending: boolean;
  onPrevious: () => void;
  onNext: () => void;
  previousLabel: string;
  nextLabel: string;
  submitLabel: string;
}

export const FormStepNavigation = ({
  isFirstStep,
  isLastStep,
  isPending,
  onPrevious,
  onNext,
  previousLabel,
  nextLabel,
  submitLabel,
}: IFormStepNavigationProps) => {
  return (
    <div className="flex items-center justify-between pt-6">
      {/* Previous button */}
      {!isFirstStep ? (
        <Button
          type="button"
          variant="outline"
          onClick={onPrevious}
          className="gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {previousLabel}
        </Button>
      ) : (
        <div />
      )}

      {/* Next / Submit button */}
      {isLastStep ? (
        <Button
          type="submit"
          variant="blue"
          size="form"
          disabled={isPending}
          className="gap-2 text-white"
        >
          {isPending && <Loader2 size="16" className="animate-spin" />}
          {isPending ? `${submitLabel}...` : submitLabel}
        </Button>
      ) : (
        <Button
          type="button"
          variant="blue"
          onClick={onNext}
          className="gap-2 text-white"
        >
          {nextLabel}
          <ArrowRight className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};
