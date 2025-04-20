import { LoginCredentials, RegisterCredentials } from "@/types";
import apiClient from "./apiClient";

export const loginUser = async (credentials: LoginCredentials) => {
  const response = await apiClient.post("auth/login", credentials);
  return response;
};

export const registerUser = async (credentials: RegisterCredentials) => {
  const response = await apiClient.post("auth/sign-up", credentials);
  return response;
};
