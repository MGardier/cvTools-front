import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import type { TFunction } from "i18next";
import type { IApiErrors } from "@/common/types/api";

export interface ISignUpData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IUseSignUpReturn {
  onSubmit: SubmitHandler<ISignUpData>;
  form: UseFormReturn<ISignUpData>;
  isPending: boolean;
  isError: boolean;
  error: IApiErrors | null;
  t: TFunction<'auth', undefined>;
}

export interface ISignUpUiProps {
  onSubmit: SubmitHandler<ISignUpData>;
  form: UseFormReturn<ISignUpData>;
  isPending: boolean;
  isError: boolean;
  error: IApiErrors | null;
  t: TFunction<'auth', undefined>;
}
