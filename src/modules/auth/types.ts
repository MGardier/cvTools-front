import type { IApiResponse } from "@/shared/types/api";
import type { IUserResponse } from "@/shared/types/entity";

/************************************************** SIGNUP ********************************/

export interface ISignUpParams {
  email: string;
  password: string;
}

export interface ISignUpResponse extends IApiResponse<IUserResponse> {}

/************************************************** SIGN IN ********************************/

export interface ISignInParams extends ISignUpParams {

}

export interface ISignInResponse extends IApiResponse<{
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  user: IUserResponse;
}> {}

/************************************************** LOGOUT ********************************/

export interface ILogoutResponse extends IApiResponse<null> {}

/**************************************************  CONFIRM ACCOUNT ********************************/

export interface ISendConfirmAccountParams {
  email: string;
}

export interface ISendConfirmAccountResponse extends IApiResponse<IUserResponse> {}

export interface IConfirmAccountParams {
  token: string;
}

export interface IConfirmAccountResponse extends IApiResponse<null> {}

/************************************************** RESET PASSWORD ********************************/

export interface ISendForgotPasswordParams {
  email: string;
}

export interface ISendForgotPasswordResponse extends IApiResponse<IUserResponse> {}

export interface IResetPasswordParams {
  password: string;
  token: string;
}

export interface IResetPasswordResponse extends IApiResponse<null> {}
