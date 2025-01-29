/**
 * apiClient.ts
 * Created On : 2025-28-01
 * Author : Diwash Pokhrel
 * Description :
 * This file contains a utility function for making API requests. It ensures
 * consistency and handles common functionality like setting headers, error handling,
 * and response parsing.
 */

const API_BASE_URL = "http://localhost:8080/api";

export interface ApiOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
}

export const apiRequest = async (
  endpoint: string,
  options: ApiOptions = {}
): Promise<any> => {
  const { method = "GET", headers = {}, body } = options;

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    // Check response type and handle accordingly
    const contentType = response.headers.get("Content-Type");
    let data: any;

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else {
      data = await response.text(); // Handle plain text responses
    }

    if (!response.ok) {
      // Throw error with detailed response message
      throw new Error(data || "Something went wrong");
    }

    return data;
  } catch (error: any) {
    console.error(
      `API request error [${method} ${endpoint}]:`,
      error.message || error
    );
    throw new Error(error.message || "Failed to connect to server");
  }
};
