import { LoginCredentials, RegisterCredentials } from "@/types";
import apiClient from "./apiClient";

export const loginUser = async (credentials: LoginCredentials) => {
  try {
    const response = await apiClient.post("auth/sign-in", credentials);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "An error occurred during login";
    throw new Error(message);
  }
};

export const registerUser = async (credentials: RegisterCredentials) => {
  try {
    const response = await apiClient.post("auth/sign-up", credentials);
    return response.data;
  } catch (error: any) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "An error occurred during login";
    throw new Error(message);
  }
};

export const toggleDonationStatus = async () => {
  const response = await apiClient.put("auth/toggle-donation-status");
  if (!response.data.success) {
    throw new Error(response.data.message);
  }
  return response.data.user;
};

export const me = async () => {
  const response = await apiClient.get("auth/me");
  if (!response.data.success) {
    throw new Error(response.data.message);
  }
  return response.data.user;
};
