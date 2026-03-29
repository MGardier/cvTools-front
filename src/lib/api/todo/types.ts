import type { TStatusTodo } from "@/shared/types/entity";

export interface ICreateTodoParams {
  description: string;
  status?: TStatusTodo;
}

export interface IUpdateTodoParams {
  description?: string;
  status?: TStatusTodo;
}
