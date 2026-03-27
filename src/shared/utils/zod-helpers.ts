import { z } from "zod/v4";
import type { TFunction } from "i18next";

/* ══════════════════════════════════════════════════════════════════
  Reusable helpers for Zod schemas + React Hook Form.

  React Hook Form convention: the default values are always '' (string), [] (array), false (boolean). Never undefined.

  Helpers pattern:   string in → transform → pipe(validation output)

  Error messages:
  - Required fields: `required` (field is missing/empty) + `invalid` (value doesn't meet conditions)
  - Optional fields: `invalid` only (value is provided but doesn't meet conditions)

══════════════════════════════════════════════════════════════════ */


// =============================================================================
//                            SHARED TYPES
// =============================================================================

type TReqMessages = { required?: string; invalid?: string };
type TOptMessages = Pick<TReqMessages, 'invalid'>;
type TBounds = { min?: number; max?: number };

// =============================================================================
//                               STRING
// =============================================================================

type TReqStringOptions = TReqMessages & TBounds;
type TOptStringOptions = TOptMessages & Pick<TBounds, 'max'>;

/**
 * Required string field.
 *
 * Input:  string
 * Output: string
 *
 * @example
 * title: reqString(t, { max: 100, required: t("validation.title.required"), invalid: t("validation.title.invalid") }),
 */
export const reqString = (t: TFunction, opts: TReqStringOptions = {}) => {
  const { min = 1, max = 255, required, invalid } = opts;

  return z
    .string()
    .min(min, required ?? t("validation.required"))
    .max(max, invalid ?? t("validation.max", { max }))
    .refine(
      (val) => val.trim().length >= min,
      { error: required ?? t("validation.required") },
    );
};


/**
 * Optional string field.
 *
 * Input:  "" | "some value"
 * Output: string | undefined
 *
 * @example
 * company: optString(t, { max: 100, invalid: t("validation.company.invalid") }),
 */
export const optString = (t: TFunction, opts: TOptStringOptions = {}) => {
  const { max = 255, invalid } = opts;

  return z
    .string()
    .max(max, invalid ?? t("validation.max", { max }))
    .transform((val) => (val === "" ? undefined : val))
    .pipe(z.string().optional());
};

// =============================================================================
//                               EMAIL
// =============================================================================

type TReqEmailOptions = TReqMessages & Pick<TBounds, 'max'>;
type TOptEmailOptions = TOptMessages & Pick<TBounds, 'max'>;

/**
 * Required email field.
 *
 * Input:  "" | "user@example.com" | "invalid"
 * Output: string (validated email)
 *
 * @example
 * email: reqEmail(t, { required: t("validation.contact.email.required"), invalid: t("validation.contact.email.invalid") }),
 */
export const reqEmail = (t: TFunction, opts: TReqEmailOptions = {}) => {
  const { required, invalid, max } = opts;

  let base = z
    .string()
    .refine(
      (val) => val.trim() !== "",
      { error: required ?? t("validation.required") },
    );

  if (max !== undefined) {
    base = base.refine(
      (val) => val.length <= max,
      { error: invalid ?? t("validation.max", { max }) },
    );
  }

  return base.pipe(z.email({ error: invalid ?? t("validation.email") }));
};

/**
 * Optional email field.
 *
 * Input:  "" | "user@example.com" | "invalid"
 * Output: string | undefined
 *
 * @example
 * email: optEmail(t, { max: 100, invalid: t("validation.email.invalid") }),
 */
export const optEmail = (t: TFunction, opts: TOptEmailOptions = {}) => {
  const { invalid, max } = opts;

  let base = z
    .email({ error: invalid ?? t("validation.email") });

  if (max !== undefined) {
    base = base.refine(
      (val) => val.length <= max,
      { error: invalid ?? t("validation.max", { max }) },
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


type TReqUrlOptions = TReqMessages & Pick<TBounds, 'max'>;
type TOptUrlOptions = TOptMessages & Pick<TBounds, 'max'>;

/**
 * Required URL field.
 *
 * Input:  "" | "https://example.com" | "not-a-url"
 * Output: string (validated URL)
 *
 * @example
 * url: reqUrl(t, { required: t("validation.url.required"), invalid: t("validation.url.invalid") }),
 */
export const reqUrl = (t: TFunction, opts: TReqUrlOptions = {}) => {
  const { required, invalid, max } = opts;

  let base = z
    .string()
    .refine(
      (val) => val.trim() !== "",
      { error: required ?? t("validation.required") },
    );

  if (max !== undefined) {
    base = base.refine(
      (val) => val.length <= max,
      { error: invalid ?? t("validation.max", { max }) },
    );
  }

  return base.pipe(z.url({ error: invalid ?? t("validation.urlInvalid") }));
};

/**
 * Optional URL field.
 *
 * Input:  "" | "https://example.com" | "not-a-url"
 * Output: string | undefined
 *
 * @example
 * website: optUrl(t, { max: 500, invalid: t("validation.url.invalid") }),
 */
export const optUrl = (t: TFunction, opts: TOptUrlOptions = {}) => {
  const { invalid, max } = opts;

  let base = z
    .url({ error: invalid ?? t("validation.urlInvalid") });

  if (max !== undefined) {
    base = base.refine(
      (val) => val.length <= max,
      { error: invalid ?? t("validation.max", { max }) },
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

type TReqNumberOptions = TReqMessages & TBounds;
type TOptNumberOptions = TOptMessages & TBounds;

/**
 * Required number field (from a string input).
 *
 * Input:  "" | "50000" | "abc"
 * Output: number
 *
 * @example
 * quantity: reqNumber(t, { min: 1, required: t("validation.quantity.required"), invalid: t("validation.quantity.invalid") }),
 */
export const reqNumber = (t: TFunction, opts: TReqNumberOptions = {}) => {
  const { min, max, required, invalid } = opts;

  let schema = z.number();
  if (min !== undefined) schema = schema.min(min, invalid ?? t("validation.min", { min }));
  if (max !== undefined) schema = schema.max(max, invalid ?? t("validation.max", { max }));

  return z
    .string()
    .refine(
      (val) => val.trim() !== "",
      { error: required ?? t("validation.required") },
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
 * salaryMin: optNumber(t, { min: 10000, invalid: t("validation.salaryMin.invalid") }),
 */
export const optNumber = (t: TFunction, opts: TOptNumberOptions = {}) => {
  const { min, max, invalid } = opts;

  let schema = z.number();
  if (min !== undefined) schema = schema.min(min, invalid ?? t("validation.min", { min }));
  if (max !== undefined) schema = schema.max(max, invalid ?? t("validation.max", { max }));

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

type TReqDateOptions = TReqMessages;
type TOptDateOptions = TOptMessages;

/**
 * Required date field (from <input type="date">).
 *
 * Input:  "" | "2025-07-15" | "invalid"
 * Output: string (validated ISO date)
 *
 * @example
 * deadline: reqDate(t, { required: t("validation.deadline.required"), invalid: t("validation.deadline.invalid") }),
 */
export const reqDate = (t: TFunction, opts: TReqDateOptions = {}) => {
  const { required, invalid } = opts;

  return z
    .string()
    .refine(
      (val) => val.trim() !== "",
      { error: required ?? t("validation.required") },
    )
    .refine(
      (val) => !Number.isNaN(new Date(val).getTime()),
      { error: invalid ?? t("validation.invalidDate") },
    );
};

/**
 * Optional date field (from <input type="date">).
 *
 * Input:  "" | "2025-07-15" | "invalid"
 * Output: string | undefined
 *
 * @example
 * expiresAt: optDate(t, { invalid: t("validation.date.invalid") }),
 */
export const optDate = (t: TFunction, opts: TOptDateOptions = {}) => {
  const { invalid } = opts;

  return z
    .string()
    .transform((val) => (val.trim() === "" ? undefined : val))
    .pipe(
      z
        .string()
        .refine(
          (val) => !Number.isNaN(new Date(val).getTime()),
          { error: invalid ?? t("validation.invalidDate") },
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

type TReqEnumOptions = TReqMessages;
type TOptEnumOptions = TOptMessages;

/**
 * Required enum field.
 *
 * Validates that the value is non-empty and belongs to the enum.
 * Uses a type predicate (val is T) to narrow the output type.
 *
 * Input:  "" | "CDI" | "invalid_value"
 * Output: T
 *
 * @example
 * jobboard: reqEnum<TJobboard>(enumValues(EJobboard), {
 *   required: t("validation.jobboard.required"),
 *   invalid: t("validation.jobboard.invalid"),
 * }),
 */
export const reqEnum = <T extends string>(values: TEnumValues<T>, opts: TReqEnumOptions) =>
  z
    .string()
    .refine(
      (val) => val.trim() !== "",
      { error: opts.required ?? "" },
    )
    .refine(
      (val) => val.trim() === "" || (values as string[]).includes(val),
      { error: opts.invalid ?? "" },
    )
    .transform((val) => val as T);


/**
 * Optional enum field.
 *
 * Input:  "" | "CDI" | "invalid_value"
 * Output: T | undefined
 *
 * @example
 * contractType: optEnum<TContractType>(enumValues(EContractType), {
 *   invalid: t("validation.contractType.invalid"),
 * }),
 */
export const optEnum = <T extends string>(values: TEnumValues<T>, opts: TOptEnumOptions) =>
  z
    .string()
    .refine(
      (val): val is T | "" => val.trim() === "" || (values as string[]).includes(val),
      { error: opts.invalid ?? "" },
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
