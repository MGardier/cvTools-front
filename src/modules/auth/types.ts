import type { IApiResponse } from "@/shared/types/api";
import type { IUser } from "@/shared/types/entity";

/************************************************** SIGNUP ********************************/

export interface ISignUpParams {
  email: string;
  password: string;
}

export type ISignUpResponse = IApiResponse<IUser>;

/************************************************** SIGN IN ********************************/

export type ISignInParams = ISignUpParams;

export type ISignInResponse = IApiResponse<{
  user: IUser;
}>;

/************************************************** LOGOUT ********************************/

export type ILogoutResponse = IApiResponse<null>;

/**************************************************  CONFIRM ACCOUNT ********************************/

export interface ISendConfirmAccountParams {
  email: string;
}

export type ISendConfirmAccountResponse = IApiResponse<IUser>;

export interface IConfirmAccountParams {
  token: string;
}

export type IConfirmAccountResponse = IApiResponse<null>;

/************************************************** RESET PASSWORD ********************************/

export interface ISendForgotPasswordParams {
  email: string;
}

export type ISendForgotPasswordResponse = IApiResponse<IUser>;

export interface IResetPasswordParams {
  password: string;
  token: string;
}

export type IResetPasswordResponse = IApiResponse<null>;

/************************************************** ME ********************************/

export type IMeResponse = IApiResponse<IUser>;
