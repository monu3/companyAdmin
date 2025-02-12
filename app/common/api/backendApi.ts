/**
 * apiClient.ts
 * Created On : 2025-28-01
 * Author : Diwash Pokhrel
 * Description :
 * This file contains a utility function for making API requests using an Axios instance.
 * It ensures consistency and handles common functionality like setting headers, error handling,
 * and response parsing.
 */

import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";

const API_BASE_URL = "http://localhost:8080/api";

// Create an Axios instance with default settings
const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface ApiOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  headers?: Record<string, string>;
  body?: any;
}

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
  } catch (error: any) {
    console.error(
      `API request error [${method} ${endpoint}]:`,
      error.response?.data || error.message || "Failed to connect to server"
    );
    throw new Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};
