
import { useCreateJob } from "../hooks/use-create-job";
import { JobForm } from "./form/job-form";

export const CreateJob = () => {
  const { t, handleSubmit, isPending, isError } = useCreateJob();

  return <><JobForm {...{t,handleSubmit,isError,isPending}}/></>
  ;
};
