import type { IContact } from "@/shared/types/entity";

export type TCreateContactParams = Pick<IContact, 'firstname' | 'lastname' | 'email' | 'profession' | 'phone'>;

export type TUpdateContactParams = Partial<TCreateContactParams>;
