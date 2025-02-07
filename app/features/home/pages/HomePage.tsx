/**
 * HomePage.tsx
 * Created On : 2025-28-01 21
 * Author : Diwash Pokhrel
 * Description : Home page component that displays a navigation bar, company profile, language selection, and chat.
 * The navigation items and dynamic content are rendered via a main navbar, with the outlet rendering different pages.
 */

import React from "react";
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
import translations from "~/features/LanguageTranslation/Languagetranslations/navItemTranslation";

// Array of navigation items for the sidebar/menu

export function HomePage() {
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
      {/* Top-right section with language select, chat, and company profile dropdown */}
      <div className="flex justify-end ml-10 gap-6 mt-3 mb-3 mr-6 pb-2 ">
        <LanguageSelect /> {/* Language selection component */}
        <Chat /> {/* Chat component */}
        <CompanyProfile /> {/* Company profile dropdown with logout */}
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
