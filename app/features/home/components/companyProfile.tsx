/**
 * companyProfile.tsx
 * Created On : 2025-28-01 21
 * Author : Diwash Pokhrel
 * Description : Component for displaying the company profile avatar with a dropdown menu.
 * The menu contains links to various sections (Profile, Billing, Team, etc.) and includes a logout button.
 */

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router";
import { logout } from "~/common/utils/logOut";

const CompanyProfile = () => {
  return (
    <DropdownMenu>
      {/* Trigger button for opening the dropdown menu */}
      <DropdownMenuTrigger className="bg-transparent p-0 border-none">
        <Avatar className="inline-block size-6 items-center cursor-pointer">
          <AvatarImage src="https://i.pravatar.cc/150?img=3" />{" "}
          {/* Profile picture */}
          <AvatarFallback>C</AvatarFallback> {/* Fallback avatar */}
        </Avatar>
      </DropdownMenuTrigger>

      {/* Dropdown menu content */}
      <DropdownMenuContent className="w-30">
        <DropdownMenuSeparator /> {/* Visual separator */}
        <DropdownMenuItem>
          <Link to="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link to="/editProfile">Edit Details</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        {/* Logout button */}
        <DropdownMenuItem asChild>
          <button
            onClick={logout}
            className="w-full text-left bg-transparent p-0 text-[--color-text] border-none"
          >
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CompanyProfile;
