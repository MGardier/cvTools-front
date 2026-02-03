import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import type { TFunction } from "i18next";

export interface ISignInData {
  email: string;
  password: string;
}

export interface IUseSignInReturn {
  onSubmit: SubmitHandler<ISignInData>;
  form: UseFormReturn<ISignInData>;
  isPending: boolean;
  isError: boolean;
  t: TFunction<'auth', undefined>;
}

export interface ISignInUiProps {
  onSubmit: SubmitHandler<ISignInData>;
  form: UseFormReturn<ISignInData>;
  isPending: boolean;
  isError: boolean;
  oauthErrorCode: string | null;
  t: TFunction<'auth', undefined>;
}
