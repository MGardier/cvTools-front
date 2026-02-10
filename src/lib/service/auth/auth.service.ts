

import { authApi } from "../../api/auth/auth.api";

import type { IConfirmAccountResponse, ILogoutResponse, IMeResponse, IResetPasswordParams, IResetPasswordResponse, ISendConfirmAccountResponse, ISendForgotPasswordResponse, ISignInResponse, ISignUpResponse } from "@/modules/auth/types";
import type { IConfirmAccountData } from "@/modules/auth/confirm-account/types";
import type { ISendConfirmAccountData } from "@/modules/auth/resend-confirm-account/types";
import type { ISendForgotPasswordData } from "@/modules/auth/send-forgot-password/types";
import type { ISignInData } from "@/modules/auth/sign-in/types";
import type { ISignUpData } from "@/modules/auth/sign-up/types";


export const authService = {

  /**************** SIGNUP ************************************************************/

  async signUp(data: ISignUpData): Promise<ISignUpResponse> {
    const params = { email: data.email, password: data.password };
    return await authApi.signUp(params);
  },


  /**************** SIGNIN ************************************************************/

  async signIn(data: ISignInData): Promise<ISignInResponse> {
    const params = { email: data.email, password: data.password };
    return await authApi.signIn(params);
  },

  /**************** LOGOUT ************************************************************/

  async logout(): Promise<ILogoutResponse> {
    return await authApi.logout();
  },




  /****************  CONFIRM ACCOUNT ************************************************************/

  async sendConfirmAccount(data: ISendConfirmAccountData): Promise<ISendConfirmAccountResponse> {
    const params = { email: data.email };
    return await authApi.sendConfirmAccount(params);
  },

  async confirmAccount(data: IConfirmAccountData): Promise<IConfirmAccountResponse> {
    const params = { token: data.token };
    return await authApi.confirmAccount(params);
  },


  /****************  RESET PASSWORD ************************************************************/

  async sendForgotPassword(data: ISendForgotPasswordData): Promise<ISendForgotPasswordResponse> {
    return await authApi.sendForgotPassword(data);
  },

  async resetPassword(data: IResetPasswordParams): Promise<IResetPasswordResponse> {
    return await authApi.resetPassword(data);
  },

  /**************** ME ************************************************************/

  async me(): Promise<IMeResponse> {
    return await authApi.me();
  },

}
