import type { Job } from "@/types/entity"

export interface JobFormProps {
  job ?: Omit<Job, 'createdAt' | "updatedAt">
}

export const JobForm =({job}: JobFormProps)=> {
  return <></>
}