import { FetchingFailed } from "@/components/fetching-failed";
import { useUpdateJob } from "../hooks/use-update-job";
import { JobForm } from "./form/job-form";
import { JobSkeletonForm } from "./form/job-skeleton-form";

interface UpdateJobProps {
  jobId: number;
}

export const UpdateJob = ({ jobId }: UpdateJobProps) => {
  const {
    t,
    job,
    query,
    mutationIsError,
    mutationIsPending,
    handleSubmit,
  } = useUpdateJob({ jobId });


  if (query.isError)
    return (
      <FetchingFailed
        title={t("pages.update.title")}
        message={
          query.error.statusCode ===  404 
          || query.error.statusCode === 401 
          ? t("messages.errors.update.notFound")
           : t("messages.errors.classic")}
      />
    );
  if (query.isPending) return <JobSkeletonForm />;
  return (
    <JobForm
      {...{
        t,
        job,
        handleSubmit,
        isError: mutationIsError,
        isPending: mutationIsPending,
        title: t("pages.update.title"),
        labelButton: t("pages.update.button"),
      }}
    />
  );
};
