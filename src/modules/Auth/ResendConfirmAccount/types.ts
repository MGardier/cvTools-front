import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import type { TFunction } from "i18next";

export interface ISendConfirmAccountData {
  email: string;
}

export interface IUseSendConfirmReturn {
  onSubmit: SubmitHandler<ISendConfirmAccountData>;
  form: UseFormReturn<ISendConfirmAccountData>;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  email: string | null;
  t: TFunction<'auth', undefined>;
}

export interface IResendConfirmAccountProps {
  defaultEmail: string | null;
}

export interface IResendConfirmAccountUiProps {
  onSubmit: SubmitHandler<ISendConfirmAccountData>;
  form: UseFormReturn<ISendConfirmAccountData>;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  email: string | null;
  defaultEmail: string | null;
  t: TFunction<'auth', undefined>;
}
