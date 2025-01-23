import React from "react";
import { FaGlobe } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const LanguageSelect = () => {
  const languages = [
    { code: "EN", label: "English" },
    { code: "NP", label: "Nepali" },
    { code: "ES", label: "Spanish" },
    { code: "FR", label: "French" },
    { code: "DE", label: "German" },
    { code: "HI", label: "Hindi" },
    { code: "CN", label: "Chinese" },
    { code: "JA", label: "Japanese" },
    { code: "IT", label: "Italian" },
    { code: "PT", label: "Portuguese" },
    { code: "RU", label: "Russian" },
    { code: "AR", label: "Arabic" },
    { code: "KO", label: "Korean" },
    { code: "TR", label: "Turkish" },
    { code: "VI", label: "Vietnamese" },
  ];

  return (
    <DropdownMenu>
      {/* Dropdown Trigger */}
      <DropdownMenuTrigger>
        <div className="flex items-center gap-2 cursor-pointer">
          <FaGlobe className="text-xl" />
          <span>EN</span> {/* Default language */}
        </div>
      </DropdownMenuTrigger>

      {/* Dropdown Content */}
      <DropdownMenuContent className="w-40 bg-white shadow-lg p-1">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className="cursor-pointer hover:bg-blue-100 rounded px-2 py-1"
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelect;
