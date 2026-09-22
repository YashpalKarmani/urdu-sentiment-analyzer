import express from "express";

import authMiddleware from "../middlewares/auth.middleware.js";
import authorizeRoles from "../middlewares/authorize.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import {
  createEvaluationController,
  getEvaluationsController,
  getEvaluationByIdController,
  getLatestEvaluationController,
  updateEvaluationController,
  deleteEvaluationController,
  getEvaluationStatsController,
} from "../controllers/evaluation.controller.js";

import {
  createEvaluationSchema,
  getEvaluationsSchema,
  evaluationIdSchema,
  updateEvaluationSchema,
} from "../validations/evaluation.validation.js";

const router = express.Router();

router.use(authMiddleware);
router.use(authorizeRoles("admin"));

router.post("/", validate(createEvaluationSchema), createEvaluationController);

router.get("/", validate(getEvaluationsSchema), getEvaluationsController);

router.get("/latest", getLatestEvaluationController);

router.get("/stats", getEvaluationStatsController);

router.get("/:id", validate(evaluationIdSchema), getEvaluationByIdController);

router.patch(
  "/:id",
  validate(updateEvaluationSchema),
  updateEvaluationController,
);

router.delete("/:id", validate(evaluationIdSchema), deleteEvaluationController);

export default router;
