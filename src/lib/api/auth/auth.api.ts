
import { orpcClient } from '@/lib/orpc/client';
import type {  IConfirmAccountParams, IConfirmAccountResponse, ILogoutResponse, IMeResponse, IResetPasswordParams, IResetPasswordResponse, ISendConfirmAccountParams, ISendConfirmAccountResponse, ISendForgotPasswordParams, ISendForgotPasswordResponse, ISignInParams, ISignInResponse, ISignUpParams, ISignUpResponse } from '@/modules/auth/types';



// Routes, methods and payloads are defined by @cvtools/contracts (contract.auth).
export const authApi = {


  /**************** SIGN UP ************************************************************/

  async signUp(params: ISignUpParams): Promise<ISignUpResponse> {
    return await orpcClient.auth.signUp(params);
  },

  /**************** SIGN IN ************************************************************/

  async signIn(params: ISignInParams): Promise<ISignInResponse> {
    return await orpcClient.auth.signIn(params);
  },


  /**************** LOGOUT ************************************************************/

  async logout(): Promise<ILogoutResponse> {
    return await orpcClient.auth.logout();
  },


  /****************  CONFIRM ACCOUNT *********************************************/

  async sendConfirmAccount(params: ISendConfirmAccountParams): Promise<ISendConfirmAccountResponse> {
    return await orpcClient.auth.resendConfirmAccount(params);
  },

  async confirmAccount(params: IConfirmAccountParams): Promise<IConfirmAccountResponse> {
    return await orpcClient.auth.confirmAccount(params);
  },



  /**************** RESET PASSWORD ************************************************************/

  async sendForgotPassword(params: ISendForgotPasswordParams): Promise<ISendForgotPasswordResponse> {
    return await orpcClient.auth.forgotPassword(params);
  },

  async resetPassword(params: IResetPasswordParams): Promise<IResetPasswordResponse> {
    return await orpcClient.auth.resetPassword(params);
  },


  /**************** ME ************************************************************/

  async me(): Promise<IMeResponse> {
    return await orpcClient.auth.me();
  },

}
