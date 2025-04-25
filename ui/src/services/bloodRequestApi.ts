import { BloodRequest, BloodRequestList } from "@/types";
import apiClient from "./apiClient";

export const createBloodRequest = async (values: BloodRequest) => {
  try {
    const response = await apiClient.post("user/request/create", values);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    return response;
  } catch (error) {}
};

export const fetchBloodRequests = async (
  filters: {
    search?: string;
    bloodGroup?: string;
    urgencyLevel?: string;
    page?: number;
    limit?: number;
  } = {}
) => {
  try {
    const params = {
      ...(filters.search && { city: filters.search }),
      ...(filters.bloodGroup &&
        filters.bloodGroup !== "all" && { bloodGroup: filters.bloodGroup }),
      ...(filters.urgencyLevel &&
        filters.urgencyLevel !== "all" && {
          urgencyLevel: filters.urgencyLevel,
        }),
      page: filters.page || 1,
      limit: filters.limit || 6,
    };

    const response = await apiClient.get("user/request", { params });

    return {
      data: response.data.bloodRequests,
      pagination: response.data.pagination,
    };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch blood requests"
    );
  }
};

export const acceptBloodRequest = async (donorId: string) => {
  try {
    const response = await apiClient.put(`user/request/add-donor/${donorId}`);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to accept blood request"
    );
  }
};

export const concludeBloodRequest = async (reqId: string, payload) => {
  try {
    const response = await apiClient.put(
      `/user/request/conclude-request/${reqId}`,
      payload
    );
    return response;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Failed to accept blood request"
    );
  }
};
