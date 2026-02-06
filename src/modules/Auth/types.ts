import type { IApiResponse } from "@/common/types/api";
import type { IUser } from "@/common/types/entity";

/************************************************** SIGNUP ********************************/

export interface ISignUpParams {
  email: string;
  password: string;
}

export interface ISignUpResponse extends IApiResponse<Pick<IUser, "id" | "email">> {}

/************************************************** SIGN IN ********************************/

export interface ISignInParams extends ISignUpParams {

}

export interface ISignInResponse extends IApiResponse<{
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
  user: IUser;
}> {}


export interface IDefaultResponse extends IApiResponse<{
  user: IUser;
}> {}

export type TDefaultResponseData = Pick<IDefaultResponse, 'data'>

/************************************************** LOGOUT ********************************/

export interface ILogoutResponse extends IApiResponse<null> {}

/**************************************************  CONFIRM ACCOUNT ********************************/

export interface ISendConfirmAccountParams {
  email: string;
}

export interface ISendConfirmAccountResponse extends IApiResponse<Pick<IUser, "id" | "email" | "status">> {}

export interface IConfirmAccountParams {
  token: string;
}

export interface IConfirmAccountResponse extends IApiResponse<Pick<IUser, "id" | "email" | "status">> {}

/************************************************** RESET PASSWORD ********************************/

export interface ISendForgotPasswordParams {
  email: string;
}

export interface ISendForgotPasswordResponse extends IApiResponse<Pick<IUser, "id" | "email">> {}

export interface IResetPasswordParams {
  password: string;
  token: string;
}

export interface IResetPasswordResponse extends IApiResponse<null> {}
