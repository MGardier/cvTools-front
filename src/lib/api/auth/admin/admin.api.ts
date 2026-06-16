import { apiClient } from "@/lib/axios/axios";
import type {
  IRegisterAdminParams,
  IRegisterAdminResponse,
  IValidateAdminInvitationParams,
  IValidateAdminInvitationResponse,
} from "@/modules/auth/admin/types";

const ENDPOINT = "/auth/admin";

export const adminApi = {
  /**************** VALIDATE INVITATION ************************************************************/

  async validateInvitation(
    params: IValidateAdminInvitationParams,
  ): Promise<IValidateAdminInvitationResponse> {
    return await apiClient.get(`${ENDPOINT}/invitation/validate`, {
      params: { token: params.token },
    });
  },

  /**************** REGISTER (PASSWORD) ************************************************************/

  async register(
    params: IRegisterAdminParams,
  ): Promise<IRegisterAdminResponse> {
    return await apiClient.post(`${ENDPOINT}/register`, params);
  },
};
