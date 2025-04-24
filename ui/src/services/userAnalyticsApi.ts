import apiClient from "./apiClient";
import { UserStatsResponse } from "@/types/userAnalytics";

export const userAnalytics = async (): Promise<UserStatsResponse> => {
  try {
    const response = await apiClient.get("/user/record/");
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "An error occurred during fetching analytics ";
    throw new Error(message);
  }
};
