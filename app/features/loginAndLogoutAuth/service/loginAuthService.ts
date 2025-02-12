import { apiRequest } from "@/common/api/backendApi";

// Login function - Calls backend and expects a cookie to be set
export const login = async (
  email: string,
  password: string
): Promise<string> => {
  try {
    const response = await apiRequest("/auth/login", {
      method: "POST",
      body: { email, password },
    });
    return response;
  } catch (error: any) {
    console.error("Login error:", error.message || error);
    throw new Error(error.message || "Login failed");
  }
};

// Logout function - Calls backend to clear authentication cookie
export const logout = async (): Promise<void> => {
  try {
    await apiRequest("/auth/logout", {
      method: "POST",
    });
  } catch (error: any) {
    console.error("Logout error:", error.message || error);
    throw new Error("Logout failed");
  }
};

// Function to check authentication status
export const checkAuthStatus = async (): Promise<boolean> => {
  try {
    const response = await apiRequest("/auth/status", {
      method: "GET",
    });
    return response.isAuthenticated;
  } catch {
    return false;
  }
};
