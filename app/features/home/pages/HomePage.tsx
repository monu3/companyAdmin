/**
 * HomePage.tsx
 * Created On : 2025-28-01 21
 * Author : Diwash Pokhrel
 * Description : Home page component that displays a navigation bar, company profile, language selection, and chat.
 * The navigation items and dynamic content are rendered via a main navbar, with the outlet rendering different pages.
 */

import React, { useState } from "react";
import { Outlet } from "react-router";
import { RxDashboard } from "react-icons/rx"; // Dashboard icon
import { IoPerson } from "react-icons/io5"; // Employee icon
import { BsFillAwardFill } from "react-icons/bs"; // Client icon
import { VscGitPullRequest } from "react-icons/vsc"; // Project icon
import { VscChecklist } from "react-icons/vsc"; // Task icon
import { TbReport } from "react-icons/tb"; // Report icon
import logo from "public/assets/logo.png"; // Logo image
import MainNavbar from "../components/mainNavbar"; // Navbar component
import CompanyProfile from "../components/companyProfile"; // Company profile dropdown
import Chat from "../components/chat"; // Chat component
import LanguageSelect from "../components/languageSelect"; // Language selection component
import { useLanguage } from "~/features/LanguageTranslation/context/LanguageContext";
import translations from "~/features/LanguageTranslation/Languagetranslations/navItem/navItemTranslation";
import { FaEllipsisH } from "react-icons/fa";

// Array of navigation items for the sidebar/menu

export function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  const t = translations[language] || translations.EN;
  const navItems = [
    { to: "/", label: t.dashboard, icon: RxDashboard },
    { to: "/employee", label: t.employee, icon: IoPerson },
    {
      to: "/client",
      label: t.client,
      icon: BsFillAwardFill,
    },
    {
      to: "/projects",
      label: t.project,
      icon: VscGitPullRequest,
    },
    { to: "/tasks", label: t.task, icon: VscChecklist },
    {
      to: "/projectReport",
      label: t.report,
      icon: TbReport,
    },
  ];

  return (
    <>
      <div className="relative flex justify-end ml-10 gap-6 mt-3 mb-3 mr-6 pb-2">
        {/* Normal view for larger screens */}
        <div className="hidden md:flex gap-6">
          <LanguageSelect />
          <CompanyProfile />
        </div>

        {/* Floating menu on small screens */}
        <div className="md:hidden fixed top-16 right-4 z-50 ">
          <button
            className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-400 transition-all duration-300 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FaEllipsisH className="text-gray-800 dark:text-white text-lg" />
          </button>

          {isOpen && (
            <div
              className=" absolute right-14 top-1 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 flex  gap-5 
                      transition-all duration-300 opacity-100 scale-100 origin-right"
            >
              <div onClick={() => setIsOpen(false)} className="cursor-pointer">
                <LanguageSelect />
              </div>

              <div className="cursor-pointer" onClick={() => setIsOpen(false)}>
                <CompanyProfile />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Navbar with navigation items and logo */}
      <MainNavbar items={navItems} logo={logo}>
        {/* Dynamic content area where routed components are rendered */}
        <div className="pl-4 pr-4">
          <Outlet />
        </div>
      </MainNavbar>
    </>
  );
}

export default HomePage;
