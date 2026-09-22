import mongoose from "mongoose";
import Evaluation from "../models/evaluation.model.js";
import AppError from "../utils/AppError.js";

export const createEvaluationService = async (data) => {
  const evaluation = await Evaluation.create(data);

  return evaluation;
};

export const getEvaluationsService = async (query = {}) => {
  const { page = 1, limit = 10, modelVersion } = query;

  const currentPage = Number(page);
  const currentLimit = Number(limit);
  const skip = (currentPage - 1) * currentLimit;

  const filter = {};

  if (modelVersion) {
    filter.modelVersion = {
      $regex: modelVersion,
      $options: "i",
    };
  }

  const [evaluations, total] = await Promise.all([
    Evaluation.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(currentLimit)
      .lean(),

    Evaluation.countDocuments(filter),
  ]);

  return {
    evaluations,
    pagination: {
      page: currentPage,
      limit: currentLimit,
      total,
      totalPages: Math.ceil(total / currentLimit),
    },
  };
};

export const getEvaluationByIdService = async (evaluationId) => {
  if (!mongoose.Types.ObjectId.isValid(evaluationId)) {
    throw new AppError("Invalid evaluation ID", 400);
  }

  const evaluation = await Evaluation.findById(evaluationId).lean();

  if (!evaluation) {
    throw new AppError("Evaluation not found", 404);
  }

  return evaluation;
};

export const getLatestEvaluationService = async () => {
  const evaluation = await Evaluation.findOne().sort({ createdAt: -1 }).lean();

  if (!evaluation) {
    throw new AppError("No evaluation records found", 404);
  }

  return evaluation;
};

export const updateEvaluationService = async (evaluationId, data) => {
  if (!mongoose.Types.ObjectId.isValid(evaluationId)) {
    throw new AppError("Invalid evaluation ID", 400);
  }

  const evaluation = await Evaluation.findByIdAndUpdate(evaluationId, data, {
    new: true,
    runValidators: true,
  }).lean();

  if (!evaluation) {
    throw new AppError("Evaluation not found", 404);
  }

  return evaluation;
};

export const deleteEvaluationService = async (evaluationId) => {
  if (!mongoose.Types.ObjectId.isValid(evaluationId)) {
    throw new AppError("Invalid evaluation ID", 400);
  }

  const evaluation = await Evaluation.findByIdAndDelete(evaluationId);

  if (!evaluation) {
    throw new AppError("Evaluation not found", 404);
  }

  return evaluation;
};

export const getEvaluationStatsService = async () => {
  const stats = await Evaluation.aggregate([
    {
      $group: {
        _id: null,
        totalEvaluations: { $sum: 1 },

        averageAccuracy: { $avg: "$accuracy" },
        averagePrecision: { $avg: "$precision" },
        averageRecall: { $avg: "$recall" },
        averageF1Score: { $avg: "$f1Score" },

        bestAccuracy: { $max: "$accuracy" },
        bestPrecision: { $max: "$precision" },
        bestRecall: { $max: "$recall" },
        bestF1Score: { $max: "$f1Score" },

        totalTrainingSamples: { $sum: "$trainingSamples" },
        totalEvaluationSamples: { $sum: "$evaluationSamples" },
      },
    },
    {
      $project: {
        _id: 0,
        totalEvaluations: 1,

        averageAccuracy: {
          $round: ["$averageAccuracy", 4],
        },
        averagePrecision: {
          $round: ["$averagePrecision", 4],
        },
        averageRecall: {
          $round: ["$averageRecall", 4],
        },
        averageF1Score: {
          $round: ["$averageF1Score", 4],
        },

        bestAccuracy: 1,
        bestPrecision: 1,
        bestRecall: 1,
        bestF1Score: 1,

        totalTrainingSamples: 1,
        totalEvaluationSamples: 1,
      },
    },
  ]);

  if (!stats.length) {
    return {
      totalEvaluations: 0,
      averageAccuracy: 0,
      averagePrecision: 0,
      averageRecall: 0,
      averageF1Score: 0,
      bestAccuracy: 0,
      bestPrecision: 0,
      bestRecall: 0,
      bestF1Score: 0,
      totalTrainingSamples: 0,
      totalEvaluationSamples: 0,
    };
  }

  return stats[0];
};
