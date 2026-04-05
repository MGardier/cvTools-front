import type { UseFormReturn } from "react-hook-form";
import type { TExtractOfferInput, TExtractOfferOutput } from "../schema/extract-url-schema";

export type TFormContact = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
  profession: string;
};

export type TFormSkill = {
  id: number;
  label: string;
  isOwner?: boolean;
  isUsed?: boolean;
};


export type TExtractOfferFormReturn = UseFormReturn<TExtractOfferInput, unknown, TExtractOfferOutput>;