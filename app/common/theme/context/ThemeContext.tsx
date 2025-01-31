import React, { createContext, useContext, useState, useEffect } from "react";

// Create a context for theme management
const ThemeContext = createContext({
  toggleTheme: () => {}, // Function to toggle between themes
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null); // Initially null to prevent early render

  // This function will apply the theme class to the <html> element
  const applyTheme = (darkMode: boolean) => {
    const htmlElement = document.documentElement;
    if (darkMode) {
      htmlElement.classList.add("dark");
    } else {
      htmlElement.classList.remove("dark");
    }
  };

  // This effect runs once to detect system preference and set the theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      // If a theme is saved in localStorage, use it
      const isDark = savedTheme === "dark";
      applyTheme(isDark);
      setIsDarkMode(isDark);
    } else {
      // Otherwise, check the system's color scheme preference
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      applyTheme(systemPrefersDark);
      setIsDarkMode(systemPrefersDark);
    }

    // Listen for system theme changes and update accordingly
    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
    const handleThemeChange = (e: MediaQueryListEvent) => {
      const newTheme = e.matches;
      setIsDarkMode(newTheme);
      applyTheme(newTheme);
    };

    mediaQueryList.addEventListener("change", handleThemeChange);

    // Cleanup listener on component unmount
    return () => {
      mediaQueryList.removeEventListener("change", handleThemeChange);
    };
  }, []); // Empty dependency array ensures this runs only once

  // Toggle the theme (dark <=> light)
  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newTheme = !prev;
      localStorage.setItem("theme", newTheme ? "dark" : "light"); // Save the new theme
      applyTheme(newTheme); // Apply the theme
      return newTheme;
    });
  };

  // If theme is not determined yet, render a loading state (to avoid flash of light theme)
  if (isDarkMode === null) {
    return <div>Loading...</div>; // Or a loading spinner if you prefer
  }

  return (
    <ThemeContext.Provider value={{ toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to access the theme context
export const useTheme = () => useContext(ThemeContext);
