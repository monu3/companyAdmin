import React, { useCallback, useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import { NavLink, useLocation } from "react-router";


interface NavItem {
  to: string;
  label: string;
  icon?: React.ElementType;
}

interface MainNavbarLayoutProps {
  items: NavItem[];
  children: React.ReactNode;
  logo?: string;
  className?: string;
}

const MainNavbarLayout: React.FC<MainNavbarLayoutProps> = ({
  items,
  children,
  logo,
  className,
}) => {
//   const [theme, setTheme] = useState<"light" | "dark">(() =>
//     window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
//   );


//   useEffect(() => {
//     const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
//       .matches
//       ? "dark"
//       : "light";
//     setTheme(systemTheme);

//     // Add or remove dark mode class from the <html> tag
//     if (systemTheme === "dark") {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }

//     const themeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
//     const handleThemeChange = (e: MediaQueryListEvent) => {
//       const newTheme = e.matches ? "dark" : "light";
//       setTheme(newTheme);
//       if (newTheme === "dark") {
//         document.documentElement.classList.add("dark");
//       } else {
//         document.documentElement.classList.remove("dark");
//       }
//     };

//     themeMediaQuery.addEventListener("change", handleThemeChange);

//     return () =>
//       themeMediaQuery.removeEventListener("change", handleThemeChange);
//   }, []);

//   // Theme detection
//   useEffect(() => {
//     const themeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
//     const handleThemeChange = (e: MediaQueryListEvent | MediaQueryList) => {
//       setTheme(e.matches ? "dark" : "light");
//     };

//     themeMediaQuery.addEventListener("change", handleThemeChange);
//     return () =>
//       themeMediaQuery.removeEventListener("change", handleThemeChange);
//   }, []);

    const location = useLocation();

  const isActive = (item: NavItem) => {
    return (
      location.pathname === item.to ||
      location.pathname.startsWith(`${item.to}/`)
    );
  };

  return (
    <div className={`flex ${className || ""}`}>
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 h-screen fixed top-0 left-0 z-10">
        <Sidebar
          aria-label="Main navigation"
          className="h-screen fixed top-0 left-0 z-10 w-64 "
        >
            {logo && (
            <div className="flex items-center justify-center p-4 mb-6 px-2">
              <img src={logo} alt="Logo" className="h-12 w-auto" />
            </div>
          )}
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <div className="flex flex-col gap-2">
                {items.map((item) => (
                  <Sidebar.Item
                    key={item.to}
                    as={NavLink}
                    to={item.to}
                    icon={item.icon}
                    className={`
                    no-underline text-base
                    ${
                      isActive(item)
                        ? "bg-gray-600 text-white hover:bg-gray-200 hover:text-white" //paxi theme change gardha change garnuu hai
                        : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                    }
                    dark:${
                      isActive(item)
                        ? "bg-gray-600 text-black hover:bg-text-600 hover:text-black"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }
                    transition-colors duration-200
                  `}
                    aria-current={isActive(item) ? "page" : undefined}
                  >
                    {item.label}
                  </Sidebar.Item>
                ))}
              </div>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
      </div>

      {/* Mobile Top Navigation */}
      <div
        className="
                md:hidden fixed top-0 left-0 right-0 
                bg-white dark:bg-gray-800 
                border-b border-gray-200 dark:border-gray-700 
                z-10 h-16 overflow-hidden
              "
      >
        <div className="flex items-center h-full px-4">
          {/* Navigation Items */}
          <div className="flex flex-1 justify-around items-center">
            {items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={`
                        flex items-center justify-center
                        ${
                          isActive(item)
                            ? "text-blue-600 dark:text-blue-500"
                            : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300"
                        }
                      `}
              >
                {item.icon && <item.icon className="w-6 h-6" />}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`
          flex-1 
          md:ml-64 
          bg-[var(--color-bg)] 
          text-[var(--color-text)]
          ${className || ""}
          mt-16 md:mt-0 overflow-hidden
        `}
      >
        {children}
      </div>
    </div>
  );
};

export default MainNavbarLayout;