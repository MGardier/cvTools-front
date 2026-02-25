
import { apiClient } from "@/lib/axios/axios";
import { ENDPOINTS } from "@/app/constants/endpoints";
import type { IApiResponse } from "@/shared/types/api";
import type { IGetApplicationsParams, IGetApplicationsResponse } from "@/modules/application/types";


const ENDPOINT = ENDPOINTS.application.list;

export const applicationApi = {

  /**************** FIND  ************************************************************/

  async findAllByUserId(params: IGetApplicationsParams): Promise<IApiResponse<IGetApplicationsResponse>> {
    return await apiClient.get(ENDPOINT, { params });
  },

}
