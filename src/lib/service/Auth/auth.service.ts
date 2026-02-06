

import { authApi } from "../../api/Auth/auth.api";

import type { IConfirmAccountResponse, ILogoutResponse, IResetPasswordParams, IResetPasswordResponse, ISendConfirmAccountResponse, ISendForgotPasswordResponse, ISignInResponse, ISignUpResponse } from "@/modules/Auth/types";
import type { IConfirmAccountData } from "@/modules/Auth/ConfirmAccount/types";
import type { ISendConfirmAccountData } from "@/modules/Auth/ResendConfirmAccount/types";
import type { ISendForgotPasswordData } from "@/modules/Auth/SendForgotPassword/types";
import type { ISignInData } from "@/modules/Auth/SignIn/types";
import type { ISignUpData } from "@/modules/Auth/SignUp/types";


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

    /**************** COMPLETE OAUTH ************************************************************/

    async getOauthSession(sessionId: string): Promise<ISignInResponse>{
      return await authApi.getOauthSession(sessionId);
    },



}
