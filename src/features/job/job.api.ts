
import { apiClient } from '@/api/axios';
import type {  ConfirmAccountParams, ConfirmAccountResponse, LogoutResponse, ResetPasswordParams, ResetPasswordResponse, SendConfirmAccountParams, SendConfirmAccountResponse, SendForgotPasswordParams, SendForgotPasswordResponse, SignInParams, SignInResponse, SignUpParams, SignUpResponse } from './types/api';





const ENDPOINT = '/job';

export const jobApi = {


  /**************** CREATE ************************************************************/

  async createJobForUser(params: SignUpParams): Promise<SignUpResponse> {
    return await apiClient.post(`${ENDPOINT}/signUp`, params);
  },

  /**************** UPDATE  ************************************************************/

  async signIn(params: SignInParams): Promise<SignInResponse> {
    return await apiClient.post(`${ENDPOINT}/signIn`, params);
  },


  /**************** FIND ************************************************************/

  async logout(): Promise<LogoutResponse> {
    return await apiClient.delete(`${ENDPOINT}/logout`);
  },

  /**************** DELETE ************************************************************/

  async logout(): Promise<LogoutResponse> {
    return await apiClient.delete(`${ENDPOINT}/logout`);
  },


}




