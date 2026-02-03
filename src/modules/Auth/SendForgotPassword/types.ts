import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import type { TFunction } from "i18next";

export interface ISendForgotPasswordData {
  email: string;
}

export interface ISendForgotPasswordProps {
  defaultEmail: string | null;
}

export interface IUseSendForgotPasswordReturn {
  onSubmit: SubmitHandler<ISendForgotPasswordData>;
  form: UseFormReturn<ISendForgotPasswordData>;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  t: TFunction<'auth', undefined>;
}

export interface ISendForgotPasswordUiProps {
  onSubmit: SubmitHandler<ISendForgotPasswordData>;
  form: UseFormReturn<ISendForgotPasswordData>;
  isPending: boolean;
  isError: boolean;
  defaultEmail: string | null;
  t: TFunction<'auth', undefined>;
}
