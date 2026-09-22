import apiClient from "../../../services/apiClient.js";

export const createEvaluation = async (data) => {
  const response = await apiClient.post("/evaluations", data);

  return response.data;
};

export const getEvaluations = async (params = {}) => {
  const response = await apiClient.get("/evaluations", {
    params,
  });

  return response.data;
};

export const getLatestEvaluation = async () => {
  const response = await apiClient.get("/evaluations/latest");

  return response.data;
};

export const getEvaluationStats = async () => {
  const response = await apiClient.get("/evaluations/stats");

  return response.data;
};

export const getEvaluationById = async (id) => {
  const response = await apiClient.get(`/evaluations/${id}`);

  return response.data;
};

export const deleteEvaluation = async (id) => {
  const response = await apiClient.delete(`/evaluations/${id}`);

  return response.data;
};
