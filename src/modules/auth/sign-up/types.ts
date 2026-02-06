import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import type { TFunction } from "i18next";
import type { IApiErrors } from "@/shared/types/api";

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
