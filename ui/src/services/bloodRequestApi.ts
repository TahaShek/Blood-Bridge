import { BloodRequest, BloodRequestList } from "@/types";
import apiClient from "./apiClient";

export const createBloodRequest = async (data: BloodRequest) => {
  try {
    const response = apiClient.post("user/request/create", data);
    return response;
  } catch (error) {}
};

export const fetchBloodRequests = async (): Promise<BloodRequestList[]> => {
  try {
    const response = await apiClient.get("user/request");
    console.log(response.data.bloodRequests);
    return response.data.bloodRequests;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch blood requests"
    );
  }
};
