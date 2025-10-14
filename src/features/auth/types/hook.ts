import type { SubmitHandler, UseFormReturn } from "react-hook-form";
import type { ResetPasswordData, SendConfirmAccountData, SendForgotPasswordData, SignInData, SignUpData } from "./form";
import type { TFunction } from "i18next";
import type { IApiErrors } from "@/types/api";





/**************** SIGN UP *********************************************/

export interface UseSignUpReturn {
  onSubmit: SubmitHandler<SignUpData>;
  form: UseFormReturn<SignUpData>;
  isPending: boolean;
  isError: boolean;
  error: IApiErrors | null
  t: TFunction<'auth', undefined>;
}


/**************** SIGN IN *********************************************/

export interface UseSignInReturn {
  onSubmit: SubmitHandler<SignInData>;
  form: UseFormReturn<SignInData>;
  isPending: boolean;
  isError: boolean;
  t:TFunction<'auth', undefined>;
}


/**************** LOGOUT *********************************************/

export interface UseLogoutReturn {
  isPending: boolean;
  isError: boolean;
  t: TFunction<'auth', undefined>;
}
/**************** CONFIRM  ACCOUNT *********************************************/

export interface UseSendConfirmReturn {
  onSubmit: SubmitHandler<SendConfirmAccountData>;
  form: UseFormReturn<SendConfirmAccountData>;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  email: string | null;
  t: TFunction<'auth', undefined>;
}

export interface UseConfirmReturn {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  t: TFunction<'auth', undefined>;
}


/**************** RESET  PASSWORD *********************************************/

export interface UseSendForgotPasswordReturn {
  onSubmit: SubmitHandler<SendForgotPasswordData>;
  form: UseFormReturn<SendForgotPasswordData>;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  t: TFunction<'auth', undefined>;
}

export interface UseResetPasswordReturn {
  onSubmit: SubmitHandler<ResetPasswordData>;
  form: UseFormReturn<ResetPasswordData>;
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
  t: TFunction<'auth', undefined>;
}

/**************** COMPLETE OAUTH*********************************************/
export interface UseCompleteOauthReturn {
  isPending: boolean;
  t: TFunction<'auth', undefined>;
}

