import React from "react";
import { Outlet } from "react-router";
import { RxDashboard } from "react-icons/rx";
import { IoPerson } from "react-icons/io5";
import { BsFillAwardFill } from "react-icons/bs";
import { VscGitPullRequest } from "react-icons/vsc";
import { VscChecklist } from "react-icons/vsc";
import { TbReport } from "react-icons/tb";
import logo from "public/assets/logo.png";
import MainNavbar from "../components/mainNavbar";
import CompanyProfile from "../components/companyProfile";
import Chat from "../components/chat";
import LanguageSelect from "../components/languageSelect";

const navItems = [
  { to: "", label: "Dashboard", icon: RxDashboard },
  { to: "/employee", label: "Employee", icon: IoPerson },
  { to: "/client", label: "Client", icon: BsFillAwardFill },
  { to: "/projects", label: "Project", icon: VscGitPullRequest },
  { to: "/tasks", label: "Task", icon: VscChecklist },
  { to: "/projectReport", label: "Project Report", icon: TbReport },
];

export function HomePage() {
  return (
    <>
      <div className="flex justify-end ml-10 gap-6 mt-3 mb-3 mr-6 pb-2 " >
        <LanguageSelect />
        <Chat />
        <CompanyProfile />
      </div>
      <MainNavbar items={navItems} logo={logo}>
        {/* Dynamic Content Area */}
        <Outlet />
      </MainNavbar>
    </>
  );
}

export default HomePage;
