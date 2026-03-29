import { apiClient } from "@/lib/axios/axios";
import { ENDPOINTS } from "@/app/constants/endpoints";
import type { IApiResponse } from "@/shared/types/api";
import type { ITodo } from "@/shared/types/entity";
import type { ICreateTodoParams, IUpdateTodoParams } from "./types";

export const todoApi = {
  async create(
    applicationId: number,
    data: ICreateTodoParams,
  ): Promise<IApiResponse<ITodo>> {
    return await apiClient.post(ENDPOINTS.todo(applicationId), data);
  },

  async findAll(applicationId: number): Promise<IApiResponse<ITodo[]>> {
    return await apiClient.get(ENDPOINTS.todo(applicationId));
  },

  async update(
    applicationId: number,
    id: number,
    data: IUpdateTodoParams,
  ): Promise<IApiResponse<ITodo>> {
    return await apiClient.patch(
      `${ENDPOINTS.todo(applicationId)}/${id}`,
      data,
    );
  },

  async delete(applicationId: number, id: number): Promise<void> {
    await apiClient.delete(`${ENDPOINTS.todo(applicationId)}/${id}`);
  },
};
