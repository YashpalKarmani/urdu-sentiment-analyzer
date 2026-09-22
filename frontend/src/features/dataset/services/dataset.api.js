import apiClient from "../../../services/apiClient.js";

export const createDataset = async (data) => {
  const response = await apiClient.post("/datasets", data);

  return response.data;
};

export const getDatasets = async (params = {}) => {
  const response = await apiClient.get("/datasets", {
    params,
  });

  return response.data;
};

export const getDatasetStats = async () => {
  const response = await apiClient.get("/datasets/stats");

  return response.data;
};

export const getDatasetById = async (id) => {
  const response = await apiClient.get(`/datasets/${id}`);

  return response.data;
};

export const updateDataset = async (id, data) => {
  const response = await apiClient.patch(`/datasets/${id}`, data);

  return response.data;
};

export const updateDatasetStatus = async (id, data) => {
  const response = await apiClient.patch(`/datasets/${id}/status`, data);

  return response.data;
};

export const updateTrainingStatus = async (id, data) => {
  const response = await apiClient.patch(
    `/datasets/${id}/training-status`,
    data,
  );

  return response.data;
};

export const deleteDataset = async (id) => {
  const response = await apiClient.delete(`/datasets/${id}`);

  return response.data;
};

export const bulkCreateDataset = async (data) => {
  const response = await apiClient.post("/datasets/bulk", data);

  return response.data;
};

export const bulkUpdateDatasetStatus = async (data) => {
  const response = await apiClient.patch("/datasets/bulk/status", data);

  return response.data;
};

export const bulkUpdateTrainingStatus = async (data) => {
  const response = await apiClient.patch(
    "/datasets/bulk/training-status",
    data,
  );

  return response.data;
};

export const bulkDeleteDataset = async (data) => {
  const response = await apiClient.delete("/datasets/bulk", {
    data,
  });

  return response.data;
};
import { useState } from "react";

import {
  createDataset,
  getDatasets,
  getDatasetStats,
  getDatasetById,
  updateDataset,
  updateDatasetStatus,
  updateTrainingStatus,
  deleteDataset,
  bulkCreateDataset,
  bulkUpdateDatasetStatus,
  bulkUpdateTrainingStatus,
  bulkDeleteDataset,
} from "../services/dataset.api.js";

const useDataset = () => {
  const [datasets, setDatasets] = useState([]);
  const [stats, setStats] = useState(null);
  const [dataset, setDataset] = useState(null);

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
      return await createDataset(data);
    } catch (error) {
      handleError(error, "Failed to create dataset entry");
    } finally {
      setLoading(false);
    }
  };

  const fetchDatasets = async (params = {}) => {
    setLoading(true);
    setError("");

    try {
      const response = await getDatasets(params);

      if (response.success) {
        setDatasets(response.datasets || response.data || []);
      }

      return response;
    } catch (error) {
      handleError(error, "Failed to fetch datasets");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await getDatasetStats();

      if (response.success) {
        setStats(response.stats || response.data || null);
      }

      return response;
    } catch (error) {
      handleError(error, "Failed to fetch dataset statistics");
    } finally {
      setLoading(false);
    }
  };

  const fetchDatasetById = async (id) => {
    setLoading(true);
    setError("");

    try {
      const response = await getDatasetById(id);

      if (response.success) {
        setDataset(response.dataset || response.data || null);
      }

      return response;
    } catch (error) {
      handleError(error, "Failed to fetch dataset");
    } finally {
      setLoading(false);
    }
  };

  const update = async (id, data) => {
    setLoading(true);
    setError("");

    try {
      const response = await updateDataset(id, data);

      if (response.success) {
        await fetchDatasets();
      }

      return response;
    } catch (error) {
      handleError(error, "Failed to update dataset");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, data) => {
    setLoading(true);
    setError("");

    try {
      const response = await updateDatasetStatus(id, data);

      if (response.success) {
        await fetchDatasets();
      }

      return response;
    } catch (error) {
      handleError(error, "Failed to update dataset status");
    } finally {
      setLoading(false);
    }
  };

  const updateTraining = async (id, data) => {
    setLoading(true);
    setError("");

    try {
      const response = await updateTrainingStatus(id, data);

      if (response.success) {
        await fetchDatasets();
      }

      return response;
    } catch (error) {
      handleError(error, "Failed to update training status");
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    setLoading(true);
    setError("");

    try {
      const response = await deleteDataset(id);

      if (response.success) {
        setDatasets((current) => current.filter((item) => item._id !== id));
      }

      return response;
    } catch (error) {
      handleError(error, "Failed to delete dataset");
    } finally {
      setLoading(false);
    }
  };

  const bulkCreate = async (data) => {
    setLoading(true);
    setError("");

    try {
      const response = await bulkCreateDataset(data);

      if (response.success) {
        await fetchDatasets();
      }

      return response;
    } catch (error) {
      handleError(error, "Failed to create dataset entries");
    } finally {
      setLoading(false);
    }
  };

  const bulkUpdateStatus = async (data) => {
    setLoading(true);
    setError("");

    try {
      const response = await bulkUpdateDatasetStatus(data);

      if (response.success) {
        await fetchDatasets();
      }

      return response;
    } catch (error) {
      handleError(error, "Failed to update dataset statuses");
    } finally {
      setLoading(false);
    }
  };

  const bulkUpdateTraining = async (data) => {
    setLoading(true);
    setError("");

    try {
      const response = await bulkUpdateTrainingStatus(data);

      if (response.success) {
        await fetchDatasets();
      }

      return response;
    } catch (error) {
      handleError(error, "Failed to update training statuses");
    } finally {
      setLoading(false);
    }
  };

  const bulkRemove = async (data) => {
    setLoading(true);
    setError("");

    try {
      const response = await bulkDeleteDataset(data);

      if (response.success) {
        await fetchDatasets();
      }

      return response;
    } catch (error) {
      handleError(error, "Failed to delete dataset entries");
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError("");
  };

  return {
    datasets,
    stats,
    dataset,
    loading,
    error,

    create,
    fetchDatasets,
    fetchStats,
    fetchDatasetById,
    update,
    updateStatus,
    updateTraining,
    remove,

    bulkCreate,
    bulkUpdateStatus,
    bulkUpdateTraining,
    bulkRemove,

    clearError,
  };
};

export default useDataset;
