import { z } from "zod/v4";
import type { TFunction } from "i18next";

/* ══════════════════════════════════════════════════════════════════
  Reusable helpers for Zod schemas + React Hook Form.

  React Hook Form convention: the default values are always '' (string), [] (array), false (boolean). Never undefined.
   
  Helpers pattern:   string in → transform → pipe(validation output)

══════════════════════════════════════════════════════════════════ */


// =============================================================================
//                               STRING
// =============================================================================


type TStringFieldOptions = {
  max?: number;
  min?: number;
  error?: string;
}

/**
 * Required string field.
 *
 * Input:  string
 * Output: string
 *
 * @example
 * title: reqString(t, { max: 100, error: t("validation.title") }),
 */
export const reqString = (t: TFunction, opts: TStringFieldOptions = {}) => {
  const { min = 1, max = 255, error } = opts;

  return z
    .string()
    .min(min, error ?? t("validation.required"))
    .max(max, t("validation.max", { max }))
    .refine(
      (val) => val.trim().length >= min,
      { error: error ?? t("validation.required") },
    );
};


/**
 * Optional string field.
 *
 * Input:  "" | "some value"
 * Output: string | undefined
 *
 * @example
 * company: optString(t, { max: 100 }),
 */
export const optString = (t: TFunction, opts: Omit<TStringFieldOptions, 'min'> = {}) => {
  const { max = 255, error } = opts;

  return z
    .string()
    .max(max, error ?? t("validation.max", { max }))
    .transform((val) => (val === "" ? undefined : val))
    .pipe(z.string().optional());
};

// =============================================================================
//                               EMAIL
// =============================================================================

/**
 * Required email field.
 *
 * Input:  "" | "user@example.com" | "invalid"
 * Output: string (validated email)
 *
 * @example
 * email: reqEmail(t, { error: t("validation.contact.email") }),
 */
export const reqEmail = (t: TFunction, opts: { error?: string; max?: number } = {}) => {
  const { error, max } = opts;

  let base = z
    .string()
    .refine(
      (val) => val.trim() !== "",
      { error: error ?? t("validation.required") },
    );

  if (max !== undefined) {
    base = base.refine(
      (val) => val.length <= max,
      { error: t("validation.max", { max }) },
    );
  }

  return base.pipe(z.email({ error: error ?? t("validation.email") }));
};

/**
 * Optional email field.
 *
 * Input:  "" | "user@example.com" | "invalid"
 * Output: string | undefined
 *
 * @example
 * email: optEmail(t, { max: 100 }),
 */
export const optEmail = (t: TFunction, opts: { error?: string; max?: number } = {}) => {
  const { error, max } = opts;

  let base = z
    .email({ error: error ?? t("validation.email") });

  if (max !== undefined) {
    base = base.refine(
      (val) => val.length <= max,
      { error: t("validation.max", { max }) },
    );
  }

  return z
    .string()
    .transform((val) => (val.trim() === "" ? undefined : val))
    .pipe(base.optional());
};

// =============================================================================
//                               URL
// =============================================================================


/**
 * Required URL field.
 *
 * Input:  "" | "https://example.com" | "not-a-url"
 * Output: string (validated URL)
 *
 * @example
 * url: reqUrl(t, { error: t("validation.urlInvalid") }),
 */
export const reqUrl = (t: TFunction, opts: { error?: string; max?: number } = {}) => {
  const { error, max } = opts;

  let base = z
    .string()
    .refine(
      (val) => val.trim() !== "",
      { error: error ?? t("validation.required") },
    );

  if (max !== undefined) {
    base = base.refine(
      (val) => val.length <= max,
      { error: t("validation.max", { max }) },
    );
  }

  return base.pipe(z.url({ error: error ?? t("validation.urlInvalid") }));
};

/**
 * Optional URL field.
 *
 * Input:  "" | "https://example.com" | "not-a-url"
 * Output: string | undefined
 *
 * @example
 * website: optUrl(t, { max: 500 }),
 */
export const optUrl = (t: TFunction, opts: { error?: string; max?: number } = {}) => {
  const { error, max } = opts;

  let base = z
    .url({ error: error ?? t("validation.urlInvalid") });

  if (max !== undefined) {
    base = base.refine(
      (val) => val.length <= max,
      { error: t("validation.max", { max }) },
    );
  }

  return z
    .string()
    .transform((val) => (val.trim() === "" ? undefined : val))
    .pipe(base.optional());
};


// =============================================================================
//                               NUMBER
// =============================================================================

type TNumberFieldOptions = {
  min?: number;
  max?: number;
  minError?: string;
  maxError?: string;
  error?: string;
};

/**
 * Required number field (from a string input).
 *
 * Input:  "" | "50000" | "abc"
 * Output: number
 *
 * @example
 * quantity: reqNumber(t, { min: 1, minError: t("validation.minQuantity") }),
 */
export const reqNumber = (t: TFunction, opts: TNumberFieldOptions = {}) => {
  const { min, max, minError, maxError, error } = opts;

  let schema = z.number();
  if (min !== undefined) schema = schema.min(min, minError ?? t("validation.min", { min }));
  if (max !== undefined) schema = schema.max(max, maxError ?? t("validation.max", { max }));

  return z
    .string()
    .refine(
      (val) => val.trim() !== "",
      { error: error ?? t("validation.required") },
    )
    .transform((val): number | undefined => {
      const trimmed = val.trim();
      if (trimmed === "") return undefined;
      const num = Number(trimmed);
      return Number.isNaN(num) ? undefined : num;
    })
    .pipe(schema);
};

/**
 * Optional number field (from a string input).
 *
 *
 * Input:  "" | "50000" | "abc"
 * Output: number | undefined
 *

 * @example
 * salaryMin: optNumber(t, { min: 10000, minError: t("validation.salaryMin") }),
 */
export const optNumber = (t: TFunction, opts: TNumberFieldOptions = {}) => {
  const { min, max, minError, maxError } = opts;

  let schema = z.number();
  if (min !== undefined) schema = schema.min(min, minError ?? t("validation.min", { min }));
  if (max !== undefined) schema = schema.max(max, maxError ?? t("validation.max", { max }));

  return z
    .string()
    .transform((val): number | undefined => {
      const trimmed = val.trim();
      if (trimmed === "") return undefined;
      const num = Number(trimmed);
      return Number.isNaN(num) ? undefined : num;
    })
    .pipe(schema.optional());
};

// =============================================================================
//                               DATE
// =============================================================================

type TDateFieldOptions = {
  error?: string;
  formatError?: string;
};

/**
 * Required date field (from <input type="date">).
 *
 * Input:  "" | "2025-07-15" | "invalid"
 * Output: string (validated ISO date)
 *
 * @example
 * deadline: reqDate(t, { error: t("validation.deadlineRequired") }),
 */
export const reqDate = (t: TFunction, opts: TDateFieldOptions = {}) => {
  const { error, formatError } = opts;

  return z
    .string()
    .refine(
      (val) => val.trim() !== "",
      { error: error ?? t("validation.required") },
    )
    .refine(
      (val) => !Number.isNaN(new Date(val).getTime()),
      { error: formatError ?? t("validation.invalidDate") },
    );
};

/**
 * Optional date field (from <input type="date">).
 *
 * Input:  "" | "2025-07-15" | "invalid"
 * Output: string | undefined
 *
 * @example
 * expiresAt: optDate(t, { formatError: t("validation.dateFormat") }),
 */
export const optDate = (t: TFunction, opts: TDateFieldOptions = {}) => {
  const { formatError } = opts;

  return z
    .string()
    .transform((val) => (val.trim() === "" ? undefined : val))
    .pipe(
      z
        .string()
        .refine(
          (val) => !Number.isNaN(new Date(val).getTime()),
          { error: formatError ?? t("validation.invalidDate") },
        )
        .optional()
    );
};

// =============================================================================
//                               ENUM
// =============================================================================


/**
 * Extract enum values as a typed tuple for Zod.
 *
 * Converts a TypeScript enum or const object into the [T, ...T[]]
 * tuple format that these helpers expect.
 *
 * @example
 * enumValues(EContractType)   // → ["CDI", "CDD", ...]
 */
export const enumValues = <T extends string>(e: Record<string, T>) =>
  Object.values(e) as TEnumValues<T>;

type TEnumValues<T extends string> = [T, ...T[]];

/**
 * Required enum field.
 *
 * Validates that the value is non-empty and belongs to the enum.
 * Uses a type predicate (val is T) to narrow the output type.
 *
 * Input:  "" | "CDI" | "invalid_value"
 * Output: T
 *
 * ""              → rejected
 * "invalid_value" → rejected (not in enum)
 * "CDI"           → "CDI" (typed as T)
 *
 * @example
 * jobboard: reqEnum<TJobboard>(enumValues(EJobboard), t("validation.jobboard")),
 * status: reqEnum<TApplicationStatus>(enumValues(EApplicationStatus), t("validation.status")),
 */
export const reqEnum = <T extends string>(values: TEnumValues<T>, error: string) =>
  z
    .string()
    .refine(
      (val): val is T => val.trim() !== "" && (values as string[]).includes(val),
      { error },
    );


/**
 * Optional enum field.
 *
 * Input:  "" | "CDI" | "invalid_value"
 * Output: T | undefined
 *
 * @example
 * contractType: optEnum<TContractType>(enumValues(EContractType)),
 */
export const optEnum = <T extends string>(values: TEnumValues<T>, error: string) =>
  z
    .string()
    .refine(
      (val): val is T | "" => val.trim() === "" || (values as string[]).includes(val),
      { error},
    )
    .transform((val): T | undefined => (val === "" ? undefined : val as T));

// =============================================================================
//                               OBJECT
// =============================================================================


type TConditionalObjectOptions<TKey extends string> = {
  requiredIfPresent: Record<TKey, string>;
};


/**
 * Conditional object: all fields are optional by default,
 * but if at least one field has a value, specified fields become required.
 * The entire object is transformed to undefined when all fields are empty.
 *
 *
 * Input:  { city: "", street: "", ... } (all strings from RHF)
 * Output: { city?: string, street?: string, ... } | undefined
 *
 * All fields empty:
 *   → undefined (no object in output)
 *
 * Only city filled, street/streetNumber missing:
 *   → validation error on street and streetNumber
 *
 * city + street + streetNumber filled:
 *   → { city: "Paris", street: "Rue de Rivoli", streetNumber: "1", ... }
 *
 * @example
 * address: conditionalObject(
 *   {
 *     city:         optString(t, { max: 100 }),
 *     postalCode:   optString(t, { max: 10 }),
 *     street:       optString(t, { max: 100 }),
 *     streetNumber: optString(t, { max: 10 }),
 *     complement:   optString(t, { max: 100 }),
 *   },
 *   {
 *     requiredIfPresent: {
 *       city: t("validation.address.city"),
 *       postalCode: t("validation.address.postalCode"),
 *     },
 *   },
 * ),
 */
export const conditionalObject = <
  TShape extends z.ZodRawShape,
  TKey extends string & keyof TShape,
>(
  shape: TShape,
  opts: TConditionalObjectOptions<TKey>,
) => {
  type TOutput = z.output<z.ZodObject<TShape>>;

  return z
    .object(shape)
    .superRefine((val, ctx) => {
      const record = val as Record<string, unknown>;
      const hasAnyValue = Object.values(record).some((v) => v !== undefined);

      if (!hasAnyValue) return;

      for (const [key, errorMsg] of Object.entries(opts.requiredIfPresent) as [TKey, string][]) {
        if (record[key] === undefined) {
          ctx.addIssue({
            code: "custom",
            path: [key],
            message: errorMsg,
          });
        }
      }
    })
    .transform((val): TOutput | undefined => {
      const record = val as Record<string, unknown>;
      const hasAnyValue = Object.values(record).some((v) => v !== undefined);
      return hasAnyValue ? (val as TOutput) : undefined;
    });
}