import apiClient from "./apiClient";

export const getNotifications = async () => {
  try {
    const response = await apiClient.get("/user/notification/");
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "An error occurred during fetching analytics ";
    throw new Error(message);
  }
};

export const markAsRead = async (id: string) => {
  try {
    const response = await apiClient.put(`/user/notification/update/${id}`);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "An error occurred during fetching analytics ";
    throw new Error(message);
  }
};