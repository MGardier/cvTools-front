import { CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import type {
  FieldValues,
  SubmitHandler,
  UseFormReturn,
} from "react-hook-form";

interface FormCardContentProps<TFieldValues extends FieldValues> {
  children: React.ReactNode;
  onSubmit: SubmitHandler<TFieldValues>;
  form: UseFormReturn<TFieldValues>;
}

export const FormCardContent = <TFieldValues extends FieldValues>({
  children,
  form,
  onSubmit,
}: FormCardContentProps<TFieldValues>) => {

  return (
    <CardContent className="px-3 md:px-6 lg:px-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-6  ">
            {children}

          </div>
        </form>
      </Form>
    </CardContent>
  );
  
};
