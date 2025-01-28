/**
 * getUserEmail.ts
 * Created On : 2025-28-01 21
 * Author : Diwash Pokhrel
 * Description : Utility function to retrieve the user's email address from localStorage.
 * This function ensures it only runs in a browser environment.
 */

export const getUserEmail = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("userEmail");
  }
  return null;
};
