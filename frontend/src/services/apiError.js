const getApiErrorMessage = (
  error,
  fallbackMessage = "Something went wrong",
) => {
  return error.response?.data?.message || fallbackMessage;
};

export default getApiErrorMessage;
