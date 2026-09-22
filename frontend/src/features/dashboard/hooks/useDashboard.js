import { useState } from "react";

import {
  getSentiments,
  getSentimentStats,
} from "../../sentiment/services/sentiment.api.js";

const useDashboard = () => {
  const [analyses, setAnalyses] = useState([]);
  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    setLoading(true);
    setError("");

    try {
      const [analysesResponse, statsResponse] = await Promise.all([
        getSentiments({
          page: 1,
          limit: 5,
        }),
        getSentimentStats(),
      ]);

      if (analysesResponse.success) {
        setAnalyses(analysesResponse.analyses || analysesResponse.data || []);
      }

      if (statsResponse.success) {
        setStats(statsResponse.stats || statsResponse.data || null);
      }

      return {
        analysesResponse,
        statsResponse,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to load dashboard data";

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
    loading,
    error,
    fetchDashboardData,
    clearError,
  };
};

export default useDashboard;
