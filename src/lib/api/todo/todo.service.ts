import type { IApiResponse } from "@/shared/types/api";
import type { ITodo, TStatusTodo } from "@/shared/types/entity";
import { todoApi } from "./todo.api";
import type { ICreateTodoParams, IUpdateTodoParams } from "./types";

export const todoService = {
  async create(
    applicationId: number,
    data: ICreateTodoParams,
  ): Promise<IApiResponse<ITodo>> {
    return todoApi.create(applicationId, data);
  },

  async findAll(
    applicationId: number,
    sort?: 'asc' | 'desc',
    status?: TStatusTodo,
  ): Promise<IApiResponse<ITodo[]>> {
    return todoApi.findAll(applicationId, sort, status);
  },

  async update(
    applicationId: number,
    id: number,
    data: IUpdateTodoParams,
  ): Promise<IApiResponse<ITodo>> {
    return todoApi.update(applicationId, id, data);
  },

  async delete(applicationId: number, id: number): Promise<void> {
    return todoApi.delete(applicationId, id);
  },
};
