import type { IApplication, IAddress } from "@/shared/types/entity";

export type IApplicationAddress = Pick<IAddress, "city" | "postalCode"> &
  Partial<Pick<IAddress, "street" | "streetNumber" | "complement">>;

type TApplicationBaseFields = Pick<
  IApplication,
  "title" | "url" | "contractType" | "currentStatus"
> &
  Partial<
    Pick<
      IApplication,
      | "company"
      | "description"
      | "salaryMin"
      | "salaryMax"
      | "experience"
      | "remotePolicy"
      | "compatibility"
      | "jobboard"
    >
  > & {
    publishedAt?: string;
  };

export interface ICreateApplicationParams extends TApplicationBaseFields {
  address?: IApplicationAddress;
  contactIds?: number[];
  skillIds?: number[];
}

export interface IUpdateApplicationParams extends Partial<TApplicationBaseFields> {
  address?: IApplicationAddress;
  disconnectAddress?: boolean;
}

export interface IFlatApplicationQueryParams {
  page: number;
  limit: number;
  sortField?: keyof IApplication;
  sortDirection?: "asc" | "desc";
  keyword?: string;
  city?: string;
  currentStatus?: IApplication["currentStatus"];
  isFavorite?: boolean;
  createdAt?: string;
  company?: string;
  jobboard?: IApplication["jobboard"];
}
