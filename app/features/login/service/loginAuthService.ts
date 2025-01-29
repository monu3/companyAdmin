/**
 * authService.ts
 * Created On : 2025-28-01 21
 * Author : Diwash Pokhrel
 * Description :
 * This file contains authentication-related services, including the login function.
 * The login function makes a POST request to the API to authenticate a user with
 * the provided email and password. It returns a string containing the response
 * data or throws an error if the request fails.
 */

import { apiRequest } from "@/common/api/backendApi";

export const login = async (
  email: string,
  password: string
): Promise<string> => {
  try {
    return await apiRequest("/login", {
      method: "POST",
      body: { email, password },
    });
  } catch (error: any) {
    console.error("Login error:", error.message || error);
    throw new Error(error.message || "Login failed");
  }
};
