import type { IContact } from "@/shared/types/entity";

export type TCreateContactParams  =  Omit<IContact, 'id'>

export type TUpdateContactParams = Partial<TCreateContactParams>




