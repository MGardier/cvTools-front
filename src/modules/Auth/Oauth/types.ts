import type { TFunction } from "i18next";

export interface IUseCompleteOauthReturn {
  isPending: boolean;
  t: TFunction<'auth', undefined>;
}

export interface IGetOauthSessionUiProps {
  isPending: boolean;
  loginMethod: string;
  t: TFunction<'auth', undefined>;
}
