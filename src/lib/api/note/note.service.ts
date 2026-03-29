import type { IApiResponse } from "@/shared/types/api";
import type { INote } from "@/shared/types/entity";
import { noteApi } from "./note.api";
import type { ICreateNoteParams, IUpdateNoteParams } from "./types";

export const noteService = {
  async create(
    applicationId: number,
    data: ICreateNoteParams,
  ): Promise<IApiResponse<INote>> {
    return noteApi.create(applicationId, data);
  },

  async findAll(applicationId: number): Promise<IApiResponse<INote[]>> {
    return noteApi.findAll(applicationId);
  },

  async update(
    applicationId: number,
    id: number,
    data: IUpdateNoteParams,
  ): Promise<IApiResponse<INote>> {
    return noteApi.update(applicationId, id, data);
  },

  async delete(applicationId: number, id: number): Promise<void> {
    return noteApi.delete(applicationId, id);
  },
};
