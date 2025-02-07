import React from "react";
import { FaGlobe } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "~/features/LanguageTranslation/context/LanguageContext";

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

const LanguageSelect = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-transparent p-0 border-none">
        <div className="flex items-center gap-2 cursor-pointer">
          <FaGlobe className="text-xl dark:text-text" />
          <span className="dark:text-text">{language}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 bg-white shadow-lg p-1">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className="cursor-pointer hover:bg-blue-100 rounded px-2 py-1"
            onClick={() => setLanguage(lang.code)}
          >
            {lang.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelect;
