
import { apiClient } from '@/lib/axios/axios';
import type {  IConfirmAccountParams, IConfirmAccountResponse, ILogoutResponse, IResetPasswordParams, IResetPasswordResponse, ISendConfirmAccountParams, ISendConfirmAccountResponse, ISendForgotPasswordParams, ISendForgotPasswordResponse, ISignInParams, ISignInResponse, ISignUpParams, ISignUpResponse } from '@/modules/Auth/types';




const ENDPOINT = '/auth';

export const authApi = {


  /**************** SIGN UP ************************************************************/

  async signUp(params: ISignUpParams): Promise<ISignUpResponse> {
    return await apiClient.post(`${ENDPOINT}/signUp`, params);
  },

  /**************** SIGN IN ************************************************************/

  async signIn(params: ISignInParams): Promise<ISignInResponse> {
    return await apiClient.post(`${ENDPOINT}/signIn`, params);
  },


  /**************** LOGOUT ************************************************************/

  async logout(): Promise<ILogoutResponse> {
    return await apiClient.delete(`${ENDPOINT}/logout`);
  },




  /****************  CONFIRM ACCOUNT *********************************************/

  async sendConfirmAccount(params: ISendConfirmAccountParams): Promise<ISendConfirmAccountResponse> {
    return await apiClient.post(`${ENDPOINT}/sendConfirmAccount`, params);
  },

  async confirmAccount(params: IConfirmAccountParams): Promise<IConfirmAccountResponse> {
    return await apiClient.patch(`${ENDPOINT}/confirmAccount`, params);
  },



  /**************** RESET PASSWORD ************************************************************/

  async sendForgotPassword(params: ISendForgotPasswordParams): Promise<ISendForgotPasswordResponse> {
    return await apiClient.post(`${ENDPOINT}/forgotPassword`, params);
  },

  async resetPassword(params: IResetPasswordParams): Promise<IResetPasswordResponse> {
    return await apiClient.patch(`${ENDPOINT}/resetPassword`, params);
  },


  /****************  OAUTH ************************************************************/


    async getOauthSession(sessionId : string): Promise<ISignInResponse>{
     return await apiClient.get(`${ENDPOINT}/oauthSession/${sessionId}`);
  }

}
