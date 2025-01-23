import React, { useCallback, useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import { NavLink, useLocation } from "react-router";
import type { MainNavbarLayoutProps, NavItem } from "../types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

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
                        ?"bg-orange-400 text-white hover:bg-orange-100 hover:text-white" : 
      "text-gray-600 hover:bg-orange-200 hover:text-white-900"
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
              <HoverCard>
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
                  <HoverCardTrigger className="transition-colors duration-100">
                    {" "}
                    {item.icon && <item.icon className="w-6 h-6" />}
                  </HoverCardTrigger>
                  <HoverCardContent className="w-auto">
                    {item.label}
                  </HoverCardContent>
                </NavLink>
              </HoverCard>
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