export const login = (username: string) => {
  localStorage.setItem("user", username);
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const isAuthenticated = () => {
  // Check if running in the browser
  if (typeof window !== "undefined") {
    return localStorage.getItem("isAuthenticated") === "true";
  }
  return false; // Default to false on the server
};
