

/************************************************** API ********************************/

import type { IApiResponse } from "@/types/api";
import type { User } from "@/types/entity";

/************************************************** SIGNUP ********************************/

export interface SignUpParams {
  email: string;
  password: string;
}




export interface SignUpResponse extends IApiResponse {
  data: Pick<User, "id" | "email">
}

/************************************************** SIGN UP ********************************/
export interface SignInParams extends SignUpParams {

}

export interface SignInResponse extends IApiResponse {
  data: {
    tokens: {
      accessToken: string;
      refreshToken: string;
    }
    user: User

  }
}


/************************************************** LOGOUT ********************************/

export interface LogoutResponse extends IApiResponse {
  data: null
}


/**************************************************  CONFIRM ACCOUNT ********************************/
export interface SendConfirmAccountParams {
  email: string;
}


export interface SendConfirmAccountResponse extends IApiResponse {
  data: Pick<User, "id" | "email" | "status">
}


export interface ConfirmAccountParams {
  token: string;
}


export interface ConfirmAccountResponse extends IApiResponse {
  data: Pick<User, "id" | "email" | "status">
}

/************************************************** RESET PASSWORD ********************************/

export interface SendForgotPasswordParams {
  email: string;
}

export interface SendForgotPasswordResponse extends IApiResponse {
  data: Pick<User, "id" | "email">
}


export interface ResetPasswordParams {
  password: string;
  token: string;
}

export interface ResetPasswordResponse extends IApiResponse {
  data: null
}






