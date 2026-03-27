import { useCreateApplicationForm } from "./hook/use-create-application-form";
import { useApplicationFormFill } from "./hook/use-application-form-fill";
import { CreateApplicationUi } from "./create-application.ui";
import { useState } from "react";

export const CreateApplication = () => {
    const [extractModalOpen, setExtractModalOpen] = useState(false);
  const { form, onSubmit, isPending, multiStep, steps, t } = useCreateApplicationForm();
  const { fillForm } = useApplicationFormFill(form);

  return (
    <CreateApplicationUi
      form={form}
      onSubmit={onSubmit}
      isPending={isPending}
      multiStep={multiStep}
      steps={steps}
      t={t}
      extractModalOpen={extractModalOpen}
      onExtractModalOpen={setExtractModalOpen}
      fillForm={fillForm}
    />
  );
};
