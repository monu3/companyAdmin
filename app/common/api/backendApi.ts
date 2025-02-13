/**
 * apiClient.ts
 * Created On : 2025-28-01
 * Author : Diwash Pokhrel
 * Description :
 * This file contains a utility function for making API requests using an Axios instance.
 * It ensures consistency and handles common functionality like setting headers, error handling,
 * and response parsing.
 */
import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
} from "axios";

const API_BASE_URL = "http://localhost:8080/api";

// Create an Axios instance with default settings
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true,
});

export interface ApiOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
}

// Global error handling for 401 responses
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const apiRequest = async (
  endpoint: string,
  options: ApiOptions = {}
): Promise<any> => {
  const { method = "GET", headers = {}, body } = options;

  const config: AxiosRequestConfig = {
    method,
    url: endpoint,
    headers: {
      ...headers,
    },
    data: body,
  };

  try {
    const response = await axiosInstance.request(config);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    console.error(
      `API request error [${method} ${endpoint}]:`,
      axiosError.response?.data?.message || axiosError.message
    );
    throw new Error(
      axiosError.response?.data?.message || "Something went wrong"
    );
  }
};
