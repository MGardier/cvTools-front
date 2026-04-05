import type { TApplicationStatus } from "@/shared/types/entity";

export interface ICreateApplicationHistoryParams {
  description: string;
  status: TApplicationStatus;
  doneAt?: Date;
}

export interface IUpdateApplicationHistoryParams {
  description?: string;
  status?: TApplicationStatus;
  doneAt?: Date;
}
