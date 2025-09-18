
import { Suspense } from "react";
import { useUpdateJob } from "../hooks/use-update-job";
import { JobForm } from "./form/job-form";
import { JobPendingForm } from "./form/job-pending-form";


interface UpdateJobProps {
  jobId: number
}

export const UpdateJob = ({jobId}: UpdateJobProps)=> {
  
  const {
    t,
    job,
    queryIsError,
    mutationIsError,
    queryIsPending,
    mutationIsPending,
    handleSubmit,

  } = useUpdateJob({jobId});

    const title = t("pages.updateJob.title");

    return (
      <Suspense fallback={<JobPendingForm title={title} />}>
        <JobForm {...{t,job,handleSubmit,isError : mutationIsError,isPending : mutationIsPending,title}}/>
      </Suspense>)
}