import { useState } from "react";

import {
  createEvaluation,
  getEvaluations,
  getLatestEvaluation,
  getEvaluationStats,
  getEvaluationById,
  deleteEvaluation,
} from "../services/evaluation.api.js";

const useEvaluation = () => {
  const [evaluations, setEvaluations] = useState([]);
  const [evaluation, setEvaluation] = useState(null);
  const [latestEvaluation, setLatestEvaluation] = useState(null);
  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleError = (error, fallbackMessage) => {
    const message = error.response?.data?.message || fallbackMessage;

    setError(message);

    throw error;
  };

  const create = async (data) => {
    setLoading(true);
    setError("");

    try {
      const response = await createEvaluation(data);

      return response;
    } catch (error) {
      handleError(error, "Failed to create evaluation");
    } finally {
      setLoading(false);
    }
  };

  const fetchEvaluations = async (params = {}) => {
    setLoading(true);
    setError("");

    try {
      const response = await getEvaluations(params);

      if (response.success) {
        setEvaluations(response.evaluations || response.data || []);
      }

      return response;
    } catch (error) {
      handleError(error, "Failed to fetch evaluations");
    } finally {
      setLoading(false);
    }
  };

  const fetchLatestEvaluation = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getLatestEvaluation();

      if (response.success) {
        setLatestEvaluation(response.evaluation || response.data || null);
      }

      return response;
    } catch (error) {
      handleError(error, "Failed to fetch latest evaluation");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getEvaluationStats();

      if (response.success) {
        setStats(response.stats || response.data || null);
      }

      return response;
    } catch (error) {
      handleError(error, "Failed to fetch evaluation statistics");
    } finally {
      setLoading(false);
    }
  };

  const fetchEvaluationById = async (id) => {
    setLoading(true);
    setError("");

    try {
      const response = await getEvaluationById(id);

      if (response.success) {
        setEvaluation(response.evaluation || response.data || null);
      }

      return response;
    } catch (error) {
      handleError(error, "Failed to fetch evaluation");
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    setLoading(true);
    setError("");

    try {
      const response = await deleteEvaluation(id);

      if (response.success) {
        setEvaluations((current) => current.filter((item) => item._id !== id));

        setEvaluation((current) => (current?._id === id ? null : current));

        setLatestEvaluation((current) =>
          current?._id === id ? null : current,
        );
      }

      return response;
    } catch (error) {
      handleError(error, "Failed to delete evaluation");
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError("");
  };

  return {
    evaluations,
    evaluation,
    latestEvaluation,
    stats,

    loading,
    error,

    create,
    fetchEvaluations,
    fetchLatestEvaluation,
    fetchStats,
    fetchEvaluationById,
    remove,

    clearError,
  };
};

export default useEvaluation;
