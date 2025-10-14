import { useJobsList } from "../../hooks/use-jobs-list";
import { JobSkeletonDataTable } from "./job-skeleton-data-table";
import { JobDatable } from "./job-data-table";
import { FetchingFailed } from "@/components/fetching-failed";



export const JobsList = () => {
  const {
     filtersManager, 
     sortingManager, 
     data ,
     paginationManager,  
     isPending, 
     isError, 
     t 
    } = useJobsList();

  if (isPending) return <JobSkeletonDataTable />;

  if (isError)
    return (
      <FetchingFailed
        title={t("pages.findAll.title")}
        message={t("messages.errors.findAll")}
      />
    );

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <h1 className="text-3xl font-display font-semibold  leading-8 tracking-tighter">
        {t("pages.findAll.title")}
      </h1>
      <JobDatable {...{ sortingManager,filtersManager,paginationManager,t, data: data || [] , }} />
    </div>
  );
};
