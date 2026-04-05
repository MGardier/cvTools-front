import { apiClient } from "@/lib/axios/axios";
import { ENDPOINTS } from "@/app/constants/endpoints";
import type { IApiResponse } from "@/shared/types/api";
import type { INote } from "@/shared/types/entity";
import type { ICreateNoteParams, IUpdateNoteParams } from "./types";

export const noteApi = {
  async create(
    applicationId: number,
    data: ICreateNoteParams,
  ): Promise<IApiResponse<INote>> {
    return await apiClient.post(ENDPOINTS.note(applicationId), data);
  },

  async findAll(applicationId: number, sort?: 'asc' | 'desc'): Promise<IApiResponse<INote[]>> {
    return await apiClient.get(ENDPOINTS.note(applicationId), {
      params: sort ? { sort } : undefined,
    });
  },

  async update(
    applicationId: number,
    id: number,
    data: IUpdateNoteParams,
  ): Promise<IApiResponse<INote>> {
    return await apiClient.patch(
      `${ENDPOINTS.note(applicationId)}/${id}`,
      data,
    );
  },

  async delete(applicationId: number, id: number): Promise<void> {
    await apiClient.delete(`${ENDPOINTS.note(applicationId)}/${id}`);
  },
};
