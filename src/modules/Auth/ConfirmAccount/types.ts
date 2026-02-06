import type { TFunction } from "i18next";

export interface IConfirmAccountData {
  token: string;
}

export interface IUseConfirmReturn {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  t: TFunction<'auth', undefined>;
}
