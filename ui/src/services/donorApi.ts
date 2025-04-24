import { DonorListResponse } from "@/types";
import apiClient from "./apiClient";

// services/donorService.ts
export const donorList = async ({
  page = 1,
  limit = 10,
}: {
  page: number;
  limit: number;
}): Promise<DonorListResponse> => {
  const response = await apiClient.get(
    `/user/active-donors?page=${page}&limit=${limit}`
  );
  return response.data;
};
