// Define the shape of the authentication context
export type AuthContextType = {
  isAuthenticated: boolean; // Whether the user is authenticated
  userEmail: string | null; // The email of the authenticated user
  authlogin: (email: string) => void; // Function to log the user in
  logout: () => void; // Function to log the user out
};
