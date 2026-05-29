import type { IApplication, ITodo } from "@/shared/types/entity";

/* Application status counts (mapped backend-side into 4 home categories). */
export interface IApplicationCounts {
  inProgress: number;
  toApply: number;
  interview: number;
  finished: number;
}

/* Global todo counts across all the user's applications (DONE/ARCHIVED excluded). */
export interface IHomeTodoCounts {
  toMake: number;
  inProgress: number;
}

/* Todo counts attached to a single recent application. */
export interface IRecentApplicationTodoCounts {
  toMake: number;
  inProgress: number;
  total: number;
}

export interface IHomeRecentApplication extends IApplication {
  todoCounts: IRecentApplicationTodoCounts;
}

export interface IHomeRecentTodo extends ITodo {
  company: string | null;
}

/* Payload of GET /user/me/home. */
export interface IUserHomeData {
  applicationCounts: IApplicationCounts;
  todoCounts: IHomeTodoCounts;
  recentApplications: IHomeRecentApplication[];
  recentTodos: IHomeRecentTodo[];
}
