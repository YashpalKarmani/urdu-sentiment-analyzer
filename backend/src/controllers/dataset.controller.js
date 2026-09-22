import {
  createDatasetService,
  getDatasetsService,
  getDatasetStatsService,
  getDatasetByIdService,
  updateDatasetService,
  updateDatasetStatusService,
  updateTrainingStatusService,
  deleteDatasetService,
  bulkCreateDatasetService,
  bulkUpdateDatasetStatusService,
  bulkUpdateTrainingStatusService,
  bulkDeleteDatasetService,
} from "../services/dataset.service.js";

export const createDatasetController = async (req, res, next) => {
  try {
    const dataset = await createDatasetService(req.body, req.userId);

    return res.status(201).json({
      success: true,
      message: "Dataset entry created successfully",
      data: dataset,
    });
  } catch (error) {
    next(error);
  }
};

export const getDatasetsController = async (req, res, next) => {
  try {
    const result = await getDatasetsService(req.validatedQuery);

    return res.status(200).json({
      success: true,
      data: result.datasets,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

export const getDatasetStatsController = async (req, res, next) => {
  try {
    const stats = await getDatasetStatsService();

    return res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

export const getDatasetByIdController = async (req, res, next) => {
  try {
    const dataset = await getDatasetByIdService(req.params.id);

    return res.status(200).json({
      success: true,
      data: dataset,
    });
  } catch (error) {
    next(error);
  }
};

export const updateDatasetController = async (req, res, next) => {
  try {
    const dataset = await updateDatasetService(
      req.params.id,
      req.body,
      req.userId,
    );

    return res.status(200).json({
      success: true,
      message: "Dataset entry updated successfully",
      data: dataset,
    });
  } catch (error) {
    next(error);
  }
};

export const updateDatasetStatusController = async (req, res, next) => {
  try {
    const dataset = await updateDatasetStatusService(
      req.params.id,
      req.body.isActive,
      req.userId,
    );

    return res.status(200).json({
      success: true,
      message: "Dataset status updated successfully",
      data: dataset,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTrainingStatusController = async (req, res, next) => {
  try {
    const dataset = await updateTrainingStatusService(
      req.params.id,
      req.body.usedForTraining,
      req.userId,
    );

    return res.status(200).json({
      success: true,
      message: "Training status updated successfully",
      data: dataset,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteDatasetController = async (req, res, next) => {
  try {
    await deleteDatasetService(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Dataset entry deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const bulkCreateDatasetController = async (req, res, next) => {
  try {
    const result = await bulkCreateDatasetService(
      req.body.datasets,
      req.userId,
    );

    return res.status(201).json({
      success: true,
      message: "Dataset entries created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const bulkUpdateDatasetStatusController = async (req, res, next) => {
  try {
    const result = await bulkUpdateDatasetStatusService(
      req.body.ids,
      req.body.isActive,
      req.userId,
    );

    return res.status(200).json({
      success: true,
      message: "Dataset statuses updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const bulkUpdateTrainingStatusController = async (req, res, next) => {
  try {
    const result = await bulkUpdateTrainingStatusService(
      req.body.ids,
      req.body.usedForTraining,
      req.userId,
    );

    return res.status(200).json({
      success: true,
      message: "Training statuses updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const bulkDeleteDatasetController = async (req, res, next) => {
  try {
    const result = await bulkDeleteDatasetService(req.body.ids);

    return res.status(200).json({
      success: true,
      message: "Dataset entries deleted successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
