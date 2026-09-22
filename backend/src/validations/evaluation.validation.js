import { z } from "zod";

const MAX_MODEL_VERSION_LENGTH = 100;
const MAX_PAGE_LIMIT = 100;

const objectIdSchema = z
  .string()
  .trim()
  .regex(/^[a-fA-F0-9]{24}$/, "Invalid evaluation ID");

const modelVersionSchema = z
  .string()
  .trim()
  .min(1, "Model version is required")
  .max(
    MAX_MODEL_VERSION_LENGTH,
    `Model version cannot exceed ${MAX_MODEL_VERSION_LENGTH} characters`,
  );

const metricSchema = z
  .number()
  .min(0, "Metric value cannot be less than 0")
  .max(1, "Metric value cannot be greater than 1");

const sampleCountSchema = z
  .number()
  .int("Sample count must be an integer")
  .min(0, "Sample count cannot be negative");

const evaluationParamsSchema = z.object({
  id: objectIdSchema,
});

const createEvaluationBodySchema = z
  .object({
    modelVersion: modelVersionSchema,

    accuracy: metricSchema,

    precision: metricSchema,

    recall: metricSchema,

    f1Score: metricSchema,

    trainingSamples: sampleCountSchema,

    evaluationSamples: sampleCountSchema,
  })
  .strict();

const updateEvaluationBodySchema = z
  .object({
    modelVersion: modelVersionSchema.optional(),

    accuracy: metricSchema.optional(),

    precision: metricSchema.optional(),

    recall: metricSchema.optional(),

    f1Score: metricSchema.optional(),

    trainingSamples: sampleCountSchema.optional(),

    evaluationSamples: sampleCountSchema.optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field is required for update",
  });

const evaluationQuerySchema = z
  .object({
    page: z.coerce.number().int().min(1, "Page must be at least 1").default(1),

    limit: z.coerce
      .number()
      .int()
      .min(1, "Limit must be at least 1")
      .max(MAX_PAGE_LIMIT, `Limit cannot exceed ${MAX_PAGE_LIMIT}`)
      .default(20),

    modelVersion: z
      .string()
      .trim()
      .min(1, "Model version cannot be empty")
      .max(
        MAX_MODEL_VERSION_LENGTH,
        `Model version cannot exceed ${MAX_MODEL_VERSION_LENGTH} characters`,
      )
      .optional(),
  })
  .strict();

export const createEvaluationSchema = z.object({
  body: createEvaluationBodySchema,
});

export const getEvaluationsSchema = z.object({
  query: evaluationQuerySchema,
});

export const evaluationIdSchema = z.object({
  params: evaluationParamsSchema,
});

export const updateEvaluationSchema = z.object({
  params: evaluationParamsSchema,
  body: updateEvaluationBodySchema,
});
