import type { TFunction } from "i18next";

export interface IUseLogoutReturn {
  isPending: boolean;
  isError: boolean;
  t: TFunction<'auth', undefined>;
}
