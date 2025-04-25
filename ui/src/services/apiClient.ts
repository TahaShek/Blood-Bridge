import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status) {
      console.log("session is expired 12");
      console.log(error.response?.data?.message);
      throw new Error(error.response?.data?.message);
    }
  }
);

export default apiClient;
