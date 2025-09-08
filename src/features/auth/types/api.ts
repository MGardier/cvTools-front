

/************************************************** API ********************************/

import type { ApiResponse } from "@/types/api";
import type { User } from "@/types/entity";

/************************************************** SIGNUP ********************************/

export interface SignUpParams {
  email: string;
  password: string;
}




export interface SignUpResponse extends ApiResponse {
  data: Pick<User, "id" | "email">
}

/************************************************** SIGN UP ********************************/
export interface SignInParams extends SignUpParams {

}

export interface SignInResponse extends ApiResponse {
  data: {
    tokens: {
      accessToken: string;
      refreshToken: string;
    }
    user: User

  }
}


/************************************************** LOGOUT ********************************/

export interface LogoutResponse extends ApiResponse {
  data: null
}


/**************************************************  CONFIRM ACCOUNT ********************************/
export interface SendConfirmAccountParams {
  email: string;
}


export interface SendConfirmAccountResponse extends ApiResponse {
  data: Pick<User, "id" | "email" | "status">
}


export interface ConfirmAccountParams {
  token: string;
}


export interface ConfirmAccountResponse extends ApiResponse {
  data: Pick<User, "id" | "email" | "status">
}

/************************************************** RESET PASSWORD ********************************/

export interface SendForgotPasswordParams {
  email: string;
}

export interface SendForgotPasswordResponse extends ApiResponse {
  data: Pick<User, "id" | "email">
}


export interface ResetPasswordParams {
  password: string;
  token: string;
}

export interface ResetPasswordResponse extends ApiResponse {
  data: null
}






