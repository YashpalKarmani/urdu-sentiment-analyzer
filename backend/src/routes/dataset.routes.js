import express from "express";

import authMiddleware from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/authorize.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import {
  createDatasetController,
  getDatasetsController,
  getDatasetStatsController,
  getDatasetByIdController,
  updateDatasetController,
  updateDatasetStatusController,
  updateTrainingStatusController,
  deleteDatasetController,
  bulkCreateDatasetController,
  bulkUpdateDatasetStatusController,
  bulkUpdateTrainingStatusController,
  bulkDeleteDatasetController,
} from "../controllers/dataset.controller.js";

import {
  createDatasetSchema,
  getDatasetsSchema,
  getDatasetByIdSchema,
  updateDatasetSchema,
  updateDatasetStatusSchema,
  updateTrainingStatusSchema,
  deleteDatasetSchema,
  bulkCreateDatasetSchema,
  bulkUpdateDatasetStatusSchema,
  bulkUpdateTrainingStatusSchema,
  bulkDeleteDatasetSchema,
} from "../validations/dataset.validation.js";

const router = express.Router();

router.use(authMiddleware);
router.use(authorizeRoles("admin"));

router.get("/stats", getDatasetStatsController);

router.post(
  "/bulk",
  validate(bulkCreateDatasetSchema),
  bulkCreateDatasetController,
);

router.patch(
  "/bulk/status",
  validate(bulkUpdateDatasetStatusSchema),
  bulkUpdateDatasetStatusController,
);

router.patch(
  "/bulk/training-status",
  validate(bulkUpdateTrainingStatusSchema),
  bulkUpdateTrainingStatusController,
);

router.delete(
  "/bulk",
  validate(bulkDeleteDatasetSchema),
  bulkDeleteDatasetController,
);

router.get("/", validate(getDatasetsSchema), getDatasetsController);

router.post("/", validate(createDatasetSchema), createDatasetController);

router.get("/:id", validate(getDatasetByIdSchema), getDatasetByIdController);

router.patch("/:id", validate(updateDatasetSchema), updateDatasetController);

router.patch(
  "/:id/status",
  validate(updateDatasetStatusSchema),
  updateDatasetStatusController,
);

router.patch(
  "/:id/training-status",
  validate(updateTrainingStatusSchema),
  updateTrainingStatusController,
);

router.delete("/:id", validate(deleteDatasetSchema), deleteDatasetController);

export default router;
