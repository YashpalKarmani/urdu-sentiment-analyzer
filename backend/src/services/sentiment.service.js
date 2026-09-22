import mongoose from "mongoose";

import Sentiment from "../models/sentiment.model.js";
import AppError from "../utils/AppError.js";
import escapeRegex from "../utils/escapeRegex.js";

export const createSentimentService = async (userId, data) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new AppError("Invalid user ID", 400);
  }

  const sentiment = await Sentiment.create({
    user: userId,
    text: data.text,
    sentiment: data.sentiment,
    confidence: data.confidence ?? null,
    modelVersion: data.modelVersion ?? null,
    processingTime: data.processingTime ?? null,
  });

  return sentiment;
};

export const getSentimentsService = async (userId, query = {}) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new AppError("Invalid user ID", 400);
  }

  const { page = 1, limit = 20, sentiment, modelVersion, search } = query;

  const currentPage = Number(page);
  const currentLimit = Number(limit);
  const skip = (currentPage - 1) * currentLimit;

  const filter = {
    user: userId,
  };

  if (sentiment) {
    filter.sentiment = sentiment;
  }

  if (modelVersion) {
    filter.modelVersion = {
      $regex: escapeRegex(modelVersion),
      $options: "i",
    };
  }

  if (search) {
    filter.text = {
      $regex: escapeRegex(search),
      $options: "i",
    };
  }

  const [sentiments, total] = await Promise.all([
    Sentiment.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(currentLimit)
      .lean(),

    Sentiment.countDocuments(filter),
  ]);

  return {
    sentiments,
    pagination: {
      page: currentPage,
      limit: currentLimit,
      total,
      totalPages: Math.ceil(total / currentLimit),
    },
  };
};

export const getSentimentByIdService = async (sentimentId, userId) => {
  if (!mongoose.Types.ObjectId.isValid(sentimentId)) {
    throw new AppError("Invalid sentiment ID", 400);
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new AppError("Invalid user ID", 400);
  }

  const sentiment = await Sentiment.findOne({
    _id: sentimentId,
    user: userId,
  }).lean();

  if (!sentiment) {
    throw new AppError("Sentiment result not found", 404);
  }

  return sentiment;
};

export const deleteSentimentService = async (sentimentId, userId) => {
  if (!mongoose.Types.ObjectId.isValid(sentimentId)) {
    throw new AppError("Invalid sentiment ID", 400);
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new AppError("Invalid user ID", 400);
  }

  const sentiment = await Sentiment.findOneAndDelete({
    _id: sentimentId,
    user: userId,
  });

  if (!sentiment) {
    throw new AppError("Sentiment result not found", 404);
  }

  return sentiment;
};

export const getSentimentStatsService = async (userId) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new AppError("Invalid user ID", 400);
  }

  const stats = await Sentiment.aggregate([
    {
      $match: {
        user: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $group: {
        _id: null,

        totalAnalyses: {
          $sum: 1,
        },

        positive: {
          $sum: {
            $cond: [{ $eq: ["$sentiment", "positive"] }, 1, 0],
          },
        },

        negative: {
          $sum: {
            $cond: [{ $eq: ["$sentiment", "negative"] }, 1, 0],
          },
        },

        neutral: {
          $sum: {
            $cond: [{ $eq: ["$sentiment", "neutral"] }, 1, 0],
          },
        },

        averageConfidence: {
          $avg: "$confidence",
        },

        averageProcessingTime: {
          $avg: "$processingTime",
        },
      },
    },
    {
      $project: {
        _id: 0,

        totalAnalyses: 1,
        positive: 1,
        negative: 1,
        neutral: 1,

        averageConfidence: {
          $round: [
            {
              $ifNull: ["$averageConfidence", 0],
            },
            4,
          ],
        },

        averageProcessingTime: {
          $round: [
            {
              $ifNull: ["$averageProcessingTime", 0],
            },
            2,
          ],
        },
      },
    },
  ]);

  if (!stats.length) {
    return {
      totalAnalyses: 0,
      positive: 0,
      negative: 0,
      neutral: 0,
      averageConfidence: 0,
      averageProcessingTime: 0,
    };
  }

  return stats[0];
};

export default {
  createSentimentService,
  getSentimentsService,
  getSentimentByIdService,
  deleteSentimentService,
  getSentimentStatsService,
};
