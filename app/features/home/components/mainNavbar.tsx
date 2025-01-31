import React, { useCallback, useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import { NavLink, useLocation } from "react-router";
import type { MainNavbarLayoutProps, NavItem } from "../types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const MainNavbarLayout: React.FC<MainNavbarLayoutProps> = ({
  items,
  children,
  logo,
  className,
}) => {
  
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
      <div className="hidden md:block sm:w-14 lg:w-64 h-screen fixed top-0 left-0 z-10">
        <Sidebar
          aria-label="Main navigation"
          className="h-screen fixed top-0 left-0 z-10 w-64 "
        >
          {logo && (
            <div className="mb-6">
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
                        ?"bg-orange-400 text-white hover:bg-orange-100 dark:hover:bg-orange-200 hover:text-bg" : 
      "text-gray-600 hover:bg-orange-200 hover:text-white-900 dark:hover:bg-orange-200 dark:hover:text-bg"
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
              <TooltipProvider key={item.to}>
                <Tooltip>
                  <TooltipTrigger className="bg-transparent p-0 border-none">
                    <NavLink
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
                  </TooltipTrigger>
                  <TooltipContent>{item.label}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
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
