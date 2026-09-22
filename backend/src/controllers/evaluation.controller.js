import {
  createEvaluationService,
  getEvaluationsService,
  getEvaluationByIdService,
  getLatestEvaluationService,
  updateEvaluationService,
  deleteEvaluationService,
  getEvaluationStatsService,
} from "../services/evaluation.service.js";

export const createEvaluationController = async (req, res, next) => {
  try {
    const evaluation = await createEvaluationService(req.body);

    return res.status(201).json({
      success: true,
      message: "Evaluation created successfully",
      data: evaluation,
    });
  } catch (error) {
    return next(error);
  }
};

export const getEvaluationsController = async (req, res, next) => {
  try {
    const result = await getEvaluationsService(req.validatedQuery);

    return res.status(200).json({
      success: true,
      data: result.evaluations,
      pagination: result.pagination,
    });
  } catch (error) {
    return next(error);
  }
};

export const getEvaluationByIdController = async (req, res, next) => {
  try {
    const evaluation = await getEvaluationByIdService(req.params.id);

    return res.status(200).json({
      success: true,
      data: evaluation,
    });
  } catch (error) {
    return next(error);
  }
};

export const getLatestEvaluationController = async (req, res, next) => {
  try {
    const evaluation = await getLatestEvaluationService();

    return res.status(200).json({
      success: true,
      data: evaluation,
    });
  } catch (error) {
    return next(error);
  }
};

export const updateEvaluationController = async (req, res, next) => {
  try {
    const evaluation = await updateEvaluationService(req.params.id, req.body);

    return res.status(200).json({
      success: true,
      message: "Evaluation updated successfully",
      data: evaluation,
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteEvaluationController = async (req, res, next) => {
  try {
    await deleteEvaluationService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Evaluation deleted successfully",
    });
  } catch (error) {
    return next(error);
  }
};

export const getEvaluationStatsController = async (req, res, next) => {
  try {
    const stats = await getEvaluationStatsService();

    return res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    return next(error);
  }
};

export default {
  createEvaluationController,
  getEvaluationsController,
  getEvaluationByIdController,
  getLatestEvaluationController,
  updateEvaluationController,
  deleteEvaluationController,
  getEvaluationStatsController,
};
