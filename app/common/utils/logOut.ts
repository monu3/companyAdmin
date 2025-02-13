/**
 * logOut.ts
 * Created On : 2025-28-01 21
 * Author : Diwash Pokhrel
 * Description : Utility function to log out the user by removing their email from localStorage
 * and redirecting them to the login page.
 */

export const logout = () => {
  localStorage.removeItem("userEmail");
};
