import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import type { TFunction } from "i18next";

export interface IResetPasswordData {
  password: string;
}

export interface IUseResetPasswordReturn {
  onSubmit: SubmitHandler<IResetPasswordData>;
  form: UseFormReturn<IResetPasswordData>;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  t: TFunction<'auth', undefined>;
}

export interface IResetPasswordUiProps {
  onSubmit: SubmitHandler<IResetPasswordData>;
  form: UseFormReturn<IResetPasswordData>;
  isPending: boolean;
  isError: boolean;
  t: TFunction<'auth', undefined>;
}
