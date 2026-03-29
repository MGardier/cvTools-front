import { useEditApplicationForm } from "./hook/use-edit-application-form";
import { EditApplicationUi } from "./edit-application.ui";

export const EditApplication = () => {
  const { form, onSubmit, isPending, multiStep, steps, t, isLoading, isError, applicationId } =
    useEditApplicationForm();

  if (isLoading) 
    return (
      <div className="container mx-auto py-10 flex justify-center">
        <p className="text-muted-foreground">{t("list.loading")}</p>
      </div>
    );
  

  if (isError) 
    return (
      <div className="container mx-auto py-10 flex justify-center">
        <p className="text-destructive">{t("list.error")}</p>
      </div>
    );
  

  return (
    <EditApplicationUi
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
      multiStep={multiStep}
      steps={steps}
      t={t}
      applicationId={applicationId}
    />
  );
};
