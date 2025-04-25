// src/services/donorApi.ts
import { DonorListResponse } from "@/types";
import apiClient from "./apiClient";

export const donorList = async ({
  page = 1,
  limit = 10,
  city = "",
  bloodGroup = "",
}: {
  page: number;
  limit: number;
  city?: string;
  bloodGroup?: string;
}): Promise<DonorListResponse> => {
  const params = new URLSearchParams();
  params.append("page", page.toString());
  params.append("limit", limit.toString());
  if (city) params.append("city", city);
  if (bloodGroup) params.append("bloodGroup", bloodGroup);

  const response = await apiClient.get(
    `/user/active-donors?${params.toString()}`
  );
  return response.data;
};
