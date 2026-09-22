import { z } from "zod";

const MAX_TEXT_LENGTH = 10000;
const MAX_MODEL_VERSION_LENGTH = 100;
const MAX_SEARCH_LENGTH = 500;
const MAX_PAGE_LIMIT = 100;

const objectIdSchema = z
  .string()
  .trim()
  .regex(/^[a-fA-F0-9]{24}$/, "Invalid sentiment ID");

const sentimentTypeSchema = z.enum(["positive", "negative", "neutral"], {
  message: "Sentiment must be positive, negative, or neutral",
});

const sentimentParamsSchema = z.object({
  id: objectIdSchema,
});

const createSentimentBodySchema = z
  .object({
    text: z
      .string()
      .trim()
      .min(1, "Text is required")
      .max(MAX_TEXT_LENGTH, `Text cannot exceed ${MAX_TEXT_LENGTH} characters`),

    sentiment: sentimentTypeSchema,

    confidence: z
      .number()
      .min(0, "Confidence cannot be less than 0")
      .max(1, "Confidence cannot be greater than 1")
      .nullable()
      .optional()
      .default(null),

    modelVersion: z
      .string()
      .trim()
      .min(1, "Model version cannot be empty")
      .max(
        MAX_MODEL_VERSION_LENGTH,
        `Model version cannot exceed ${MAX_MODEL_VERSION_LENGTH} characters`,
      )
      .nullable()
      .optional()
      .default(null),

    processingTime: z
      .number()
      .min(0, "Processing time cannot be negative")
      .nullable()
      .optional()
      .default(null),
  })
  .strict();

const sentimentQuerySchema = z
  .object({
    page: z.coerce.number().int().min(1, "Page must be at least 1").default(1),

    limit: z.coerce
      .number()
      .int()
      .min(1, "Limit must be at least 1")
      .max(MAX_PAGE_LIMIT, `Limit cannot exceed ${MAX_PAGE_LIMIT}`)
      .default(20),

    sentiment: sentimentTypeSchema.optional(),

    modelVersion: z
      .string()
      .trim()
      .min(1, "Model version cannot be empty")
      .max(
        MAX_MODEL_VERSION_LENGTH,
        `Model version cannot exceed ${MAX_MODEL_VERSION_LENGTH} characters`,
      )
      .optional(),

    search: z
      .string()
      .trim()
      .min(1, "Search cannot be empty")
      .max(
        MAX_SEARCH_LENGTH,
        `Search cannot exceed ${MAX_SEARCH_LENGTH} characters`,
      )
      .optional(),
  })
  .strict();

export const createSentimentSchema = z.object({
  body: createSentimentBodySchema,
});

export const getSentimentsSchema = z.object({
  query: sentimentQuerySchema,
});

export const sentimentIdSchema = z.object({
  params: sentimentParamsSchema,
});
