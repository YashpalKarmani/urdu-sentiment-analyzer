import { z } from "zod";

const MAX_TEXT_LENGTH = 10000;
const MAX_SOURCE_LENGTH = 100;
const MAX_SEARCH_LENGTH = 500;
const MAX_PAGE_LIMIT = 100;
const MAX_BULK_OPERATION_SIZE = 1000;

const objectIdSchema = z
  .string()
  .trim()
  .regex(/^[a-fA-F0-9]{24}$/, "Invalid dataset ID");

const sentimentSchema = z.enum(["positive", "negative", "neutral"], {
  message: "Sentiment must be positive, negative, or neutral",
});

const datasetParamsSchema = z.object({
  id: objectIdSchema,
});

const createDatasetBodySchema = z
  .object({
    text: z
      .string()
      .trim()
      .min(1, "Text is required")
      .max(MAX_TEXT_LENGTH, `Text cannot exceed ${MAX_TEXT_LENGTH} characters`),

    sentiment: sentimentSchema,

    source: z
      .string()
      .trim()
      .min(1, "Source cannot be empty")
      .max(
        MAX_SOURCE_LENGTH,
        `Source cannot exceed ${MAX_SOURCE_LENGTH} characters`,
      )
      .optional()
      .default("custom"),

    usedForTraining: z.boolean().optional().default(true),
  })
  .strict();

const updateDatasetBodySchema = z
  .object({
    text: z
      .string()
      .trim()
      .min(1, "Text cannot be empty")
      .max(MAX_TEXT_LENGTH, `Text cannot exceed ${MAX_TEXT_LENGTH} characters`)
      .optional(),

    sentiment: sentimentSchema.optional(),

    source: z
      .string()
      .trim()
      .min(1, "Source cannot be empty")
      .max(
        MAX_SOURCE_LENGTH,
        `Source cannot exceed ${MAX_SOURCE_LENGTH} characters`,
      )
      .optional(),

    usedForTraining: z.boolean().optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required for update",
  });

const updateStatusBodySchema = z
  .object({
    isActive: z.boolean(),
  })
  .strict();

const updateTrainingStatusBodySchema = z
  .object({
    usedForTraining: z.boolean(),
  })
  .strict();

const datasetQuerySchema = z
  .object({
    page: z.coerce.number().int().min(1, "Page must be at least 1").default(1),

    limit: z.coerce
      .number()
      .int()
      .min(1, "Limit must be at least 1")
      .max(MAX_PAGE_LIMIT, `Limit cannot exceed ${MAX_PAGE_LIMIT}`)
      .default(20),

    sentiment: sentimentSchema.optional(),

    source: z
      .string()
      .trim()
      .min(1, "Source cannot be empty")
      .max(
        MAX_SOURCE_LENGTH,
        `Source cannot exceed ${MAX_SOURCE_LENGTH} characters`,
      )
      .optional(),

    isActive: z
      .enum(["true", "false"])
      .transform((value) => value === "true")
      .optional(),

    usedForTraining: z
      .enum(["true", "false"])
      .transform((value) => value === "true")
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

const bulkCreateBodySchema = z
  .object({
    datasets: z
      .array(createDatasetBodySchema)
      .min(1, "At least one dataset entry is required")
      .max(
        MAX_BULK_OPERATION_SIZE,
        `Maximum ${MAX_BULK_OPERATION_SIZE} dataset entries are allowed`,
      ),
  })
  .strict();

const bulkIdsSchema = z
  .array(objectIdSchema)
  .min(1, "At least one dataset ID is required")
  .max(
    MAX_BULK_OPERATION_SIZE,
    `Maximum ${MAX_BULK_OPERATION_SIZE} dataset IDs are allowed`,
  );

const bulkUpdateStatusBodySchema = z
  .object({
    ids: bulkIdsSchema,
    isActive: z.boolean(),
  })
  .strict();

const bulkUpdateTrainingStatusBodySchema = z
  .object({
    ids: bulkIdsSchema,
    usedForTraining: z.boolean(),
  })
  .strict();

const bulkDeleteBodySchema = z
  .object({
    ids: bulkIdsSchema,
  })
  .strict();

export const createDatasetSchema = z.object({
  body: createDatasetBodySchema,
});

export const getDatasetsSchema = z.object({
  query: datasetQuerySchema,
});

export const getDatasetByIdSchema = z.object({
  params: datasetParamsSchema,
});

export const updateDatasetSchema = z.object({
  params: datasetParamsSchema,
  body: updateDatasetBodySchema,
});

export const updateDatasetStatusSchema = z.object({
  params: datasetParamsSchema,
  body: updateStatusBodySchema,
});

export const updateTrainingStatusSchema = z.object({
  params: datasetParamsSchema,
  body: updateTrainingStatusBodySchema,
});

export const deleteDatasetSchema = z.object({
  params: datasetParamsSchema,
});

export const bulkCreateDatasetSchema = z.object({
  body: bulkCreateBodySchema,
});

export const bulkUpdateDatasetStatusSchema = z.object({
  body: bulkUpdateStatusBodySchema,
});

export const bulkUpdateTrainingStatusSchema = z.object({
  body: bulkUpdateTrainingStatusBodySchema,
});

export const bulkDeleteDatasetSchema = z.object({
  body: bulkDeleteBodySchema,
});
