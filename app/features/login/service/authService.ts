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

const API_BASE_URL = "http://localhost:8080/api";

export const login = async (
  email: string,
  password: string
): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.text();

    if (!response.ok) {
      throw new Error(data || "Invalid email or password");
    }

    return data;
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("Failed to connect to server");
  }
};
