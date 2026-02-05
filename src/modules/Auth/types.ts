import type { IApiResponse } from "@/common/types/api";
import type { IUser } from "@/common/types/entity";

/************************************************** SIGNUP ********************************/

export interface ISignUpParams {
  email: string;
  password: string;
}

export interface ISignUpResponse extends IApiResponse {
  data: Pick<IUser, "id" | "email">
}

/************************************************** SIGN IN ********************************/

export interface ISignInParams extends ISignUpParams {

}

export interface ISignInResponse extends IApiResponse {
  data: {
    tokens: {
      accessToken: string;
      refreshToken: string;
    }
    user: IUser
  }
}


export interface IDefaultResponse extends IApiResponse {
  data: {
    user: IUser
  } 
  
}

export type I = Pick<IDefaultResponse,'data'>

/************************************************** LOGOUT ********************************/

export interface ILogoutResponse extends IApiResponse {
  data: null
}

/**************************************************  CONFIRM ACCOUNT ********************************/

export interface ISendConfirmAccountParams {
  email: string;
}

export interface ISendConfirmAccountResponse extends IApiResponse {
  data: Pick<IUser, "id" | "email" | "status">
}

export interface IConfirmAccountParams {
  token: string;
}

export interface IConfirmAccountResponse extends IApiResponse {
  data: Pick<IUser, "id" | "email" | "status">
}

/************************************************** RESET PASSWORD ********************************/

export interface ISendForgotPasswordParams {
  email: string;
}

export interface ISendForgotPasswordResponse extends IApiResponse {
  data: Pick<IUser, "id" | "email">
}

export interface IResetPasswordParams {
  password: string;
  token: string;
}

export interface IResetPasswordResponse extends IApiResponse {
  data: null
}
