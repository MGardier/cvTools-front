import { useJobsList } from "../hooks/use-jobs-list";
import { JobSkeletonDataTable } from "./job-skeleton-data-table";
import { JobDatable } from "./job-data-table";
import { FetchingFailed } from "@/components/fetching-failed";

//filter , sort, pagination , archived , favoris

export const JobsList = () => {
  const { data, isPending,isError, t } = useJobsList();


  if(isPending) return  <JobSkeletonDataTable />

  if(isError) return <FetchingFailed title={t("pages.findAllJoob.errors.findAll")} message={t("messages.errors.findAll")} />

  
  return <JobDatable {...{t,data : data || []}}/>
  
};
