import { optString, optUrl } from "@/shared/utils/zod-helpers";
import type { TFunction } from "i18next";
import z from "zod/v4";

/**
 * Single schema for offer extraction — either url OR rawContent, never both.
 */
export const extractOfferSchema = (t: TFunction) =>
  z
    .object({
      url: optUrl(t, { invalid: t("validation.url.invalid") }),
      rawContent: optString(t, { max: 50000 }),
    })
    .superRefine((data, ctx) => {
      const hasUrl = !!data.url;
      const hasRawContent = !!data.rawContent;

      if (!hasUrl && !hasRawContent) {
        ctx.addIssue({
          code: "custom",
          path: ["url"],
          message: t("validation.url.required"),
        });
      }

      if (hasUrl && hasRawContent) {
        ctx.addIssue({
          code: "custom",
          path: ["rawContent"],
          message: t("validation.extractOffer.onlyOne"),
        });
      }
    });

export type TExtractOfferInput = z.input<ReturnType<typeof extractOfferSchema>>;
export type TExtractOfferOutput = z.output<ReturnType<typeof extractOfferSchema>>;
