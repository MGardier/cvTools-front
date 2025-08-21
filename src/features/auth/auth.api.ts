
import { apiClient } from '@/api/axios';
import type { ConfirmAccountParams, ConfirmAccountResponse, LogoutResponse, ResetPasswordParams, ResetPasswordResponse, SendConfirmAccountParams, SendConfirmAccountResponse, SendForgotPasswordParams, SendForgotPasswordResponse, SignInParams, SignInResponse, SignUpParams, SignUpResponse } from './types/api';





const ENDPOINT = '/auth';

export const authApi = {


  /**************** SIGN UP ************************************************************/

  async signUp(params: SignUpParams): Promise<SignUpResponse> {
    return await apiClient.post(`${ENDPOINT}/signUp`, params);
  },

  /**************** SIGN IN ************************************************************/

  async signIn(params: SignInParams): Promise<SignInResponse> {
    return await apiClient.post(`${ENDPOINT}/signIn`, params);
  },


  /**************** LOGOUT ************************************************************/

  async logout(): Promise<LogoutResponse> {
    return await apiClient.delete(`${ENDPOINT}/logout`);
  },


 

  /****************  CONFIRM ACCOUNT *********************************************/

  async sendConfirmAccount(params: SendConfirmAccountParams): Promise<SendConfirmAccountResponse> {
    return await apiClient.post(`${ENDPOINT}/sendConfirmAccount`, params);
  },

  async confirmAccount(params: ConfirmAccountParams): Promise<ConfirmAccountResponse> {
    return await apiClient.patch(`${ENDPOINT}/confirmAccount`, params);
  },



  /**************** RESET PASSWORD ************************************************************/

  async sendForgotPassword(params: SendForgotPasswordParams): Promise<SendForgotPasswordResponse> {
    return await apiClient.post(`${ENDPOINT}/forgotPassword`, params);
  },

  async resetPassword(params: ResetPasswordParams): Promise<ResetPasswordResponse> {
    return await apiClient.patch(`${ENDPOINT}/resetPassword`, params);
  },

}




