import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import type {
  FieldValues,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";

interface FormCardContentProps<TFieldValues extends FieldValues> {
  labelButton: string;
  children: React.ReactNode;
  onSubmit: SubmitHandler<TFieldValues>;
  form: UseFormReturn<TFieldValues>;
  isLoading?: boolean;
}

export const FormCardContent = <TFieldValues extends FieldValues>({
  labelButton,
  children,
  form,
  onSubmit,
  isLoading,
}: FormCardContentProps<TFieldValues>) => {

  return (
    <CardContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-6 ">
            {children}
            <Button
              type="submit"
              className="w-full flex gap-2  text-white"
              size="form"
              variant="blue"
              disabled={isLoading}
            >
              {isLoading && <Loader2 size="16" className="animate-spin" />}
              {isLoading ? `${labelButton}...` : labelButton}
            </Button>
          </div>
        </form>
      </Form>
    </CardContent>
  );
  
};
