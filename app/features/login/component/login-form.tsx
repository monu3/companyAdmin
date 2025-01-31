/**
 * login-form.tsx
 * Created On : 2025-28-01 21
 * Author : Diwash Pokhrel
 * Description :
 * This component renders a login form where users can input their email and password to authenticate.
 * It handles the login process, including error handling, loading state, and redirects upon successful login.
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { login } from "../service/loginAuthService"; // Import the login function from authService
import { Label } from "@/components/ui/label"; // UI component for labeling inputs
import { Button } from "@/components/ui/button"; // UI component for the button

export default function LoginForm() {
  const [email, setEmail] = useState(""); // State to store email input
  const [password, setPassword] = useState(""); // State to store password input
  const [error, setError] = useState(""); // State to store any error messages
  const [isLoading, setIsLoading] = useState(false); // State to indicate if login is in progress
  const navigate = useNavigate(); // Hook for navigation after successful login

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      navigate("/"); // Redirect to the homepage if userEmail is already set
    }
  }, [navigate]); // Run this effect once when the component mounts

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    setIsLoading(true); // Set loading state to true
    setError(""); // Clear any previous error messages

    try {
      const result = await login(email, password); // Attempt to login using the credentials

      if (result === "Login successful") {
        localStorage.setItem("userEmail", email); // Store user email in local storage
        navigate("/"); // Redirect to the homepage on successful login
      } else {
        setError(result); // If login fails, display error message
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to connect to server"
      ); // Handle connection errors or other issues
    } finally {
      setIsLoading(false); // Set loading state to false when login is complete
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-6 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Sign in</h2>
          <p className="mt-2 text-sm text-gray-600">Access your account</p>
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}{" "}
        {/* Show error if exists */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2 flex flex-col">
            <Label htmlFor="email">Email</Label> {/* Label for email input */}
            <input
              id="email"
              type="email"
              placeholder="name@example.com"
              className="rounded"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update email state on change
              disabled={isLoading} // Disable input when loading
            />
          </div>

          <div className="space-y-2 flex flex-col">
            <Label htmlFor="password">Password</Label>{" "}
            {/* Label for password input */}
            <input
              id="password"
              type="password"
              className="rounded"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state on change
              disabled={isLoading} // Disable input when loading
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Authenticating..." : "Sign in"}{" "}
            {/* Show loading text when authenticating */}
          </Button>
        </form>
      </div>
    </div>
  );
}
