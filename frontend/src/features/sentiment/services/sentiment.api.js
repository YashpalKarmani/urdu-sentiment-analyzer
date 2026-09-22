import apiClient from "../../../services/apiClient.js";

export const createSentiment = async (data) => {
  const response = await apiClient.post("/sentiments", data);

  return response.data;
};

export const getSentiments = async (params = {}) => {
  const response = await apiClient.get("/sentiments", {
    params,
  });

  return response.data;
};

export const getSentimentStats = async () => {
  const response = await apiClient.get("/sentiments/stats");

  return response.data;
};

export const getSentimentById = async (id) => {
  const response = await apiClient.get(`/sentiments/${id}`);

  return response.data;
};

export const deleteSentiment = async (id) => {
  const response = await apiClient.delete(`/sentiments/${id}`);

  return response.data;
};
