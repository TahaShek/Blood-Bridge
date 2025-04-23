import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/v1",
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
