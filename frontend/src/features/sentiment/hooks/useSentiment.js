import { useState } from "react";

import {
  createSentiment,
  getSentiments,
  getSentimentStats,
  getSentimentById,
  deleteSentiment,
} from "../services/sentiment.api.js";

const useSentiment = () => {
  const [analyses, setAnalyses] = useState([]);
  const [stats, setStats] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const createAnalysis = async (data) => {
    setLoading(true);
    setError("");

    try {
      const response = await createSentiment(data);

      if (response.success) {
        setAnalysis(response.analysis || response.data || null);
      }

      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to create sentiment analysis";

      setError(message);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalyses = async (params = {}) => {
    setLoading(true);
    setError("");

    try {
      const response = await getSentiments(params);

      if (response.success) {
        setAnalyses(response.analyses || []);
      }

      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch sentiment analyses";

      setError(message);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getSentimentStats();

      if (response.success) {
        setStats(response.stats);
      }

      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch sentiment statistics";

      setError(message);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalysisById = async (id) => {
    setLoading(true);
    setError("");

    try {
      const response = await getSentimentById(id);

      if (response.success) {
        setAnalysis(response.analysis);
      }

      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to fetch sentiment analysis";

      setError(message);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  const removeAnalysis = async (id) => {
    setLoading(true);
    setError("");

    try {
      const response = await deleteSentiment(id);

      if (response.success) {
        setAnalyses((currentAnalyses) =>
          currentAnalyses.filter((item) => item._id !== id),
        );

        setAnalysis((currentAnalysis) =>
          currentAnalysis?._id === id ? null : currentAnalysis,
        );
      }

      return response;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to delete sentiment analysis";

      setError(message);

      throw error;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError("");
  };

  return {
    analyses,
    stats,
    analysis,
    loading,
    error,

    createAnalysis,
    fetchAnalyses,
    fetchStats,
    fetchAnalysisById,
    removeAnalysis,
    clearError,
  };
};

export default useSentiment;
