import {
  createSentimentService,
  getSentimentsService,
  getSentimentByIdService,
  deleteSentimentService,
  getSentimentStatsService,
} from "../services/sentiment.service.js";

export const createSentimentController = async (req, res, next) => {
  try {
    const sentiment = await createSentimentService(req.userId, req.body);

    return res.status(201).json({
      success: true,
      message: "Sentiment analysis created successfully",
      data: sentiment,
    });
  } catch (error) {
    return next(error);
  }
};

export const getSentimentsController = async (req, res, next) => {
  try {
    const result = await getSentimentsService(req.userId, req.validatedQuery);

    return res.status(200).json({
      success: true,
      data: result.sentiments,
      pagination: result.pagination,
    });
  } catch (error) {
    return next(error);
  }
};

export const getSentimentByIdController = async (req, res, next) => {
  try {
    const sentiment = await getSentimentByIdService(req.params.id, req.userId);

    return res.status(200).json({
      success: true,
      data: sentiment,
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteSentimentController = async (req, res, next) => {
  try {
    await deleteSentimentService(req.params.id, req.userId);

    return res.status(200).json({
      success: true,
      message: "Sentiment result deleted successfully",
    });
  } catch (error) {
    return next(error);
  }
};

export const getSentimentStatsController = async (req, res, next) => {
  try {
    const stats = await getSentimentStatsService(req.userId);

    return res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    return next(error);
  }
};

export default {
  createSentimentController,
  getSentimentsController,
  getSentimentByIdController,
  deleteSentimentController,
  getSentimentStatsController,
};
