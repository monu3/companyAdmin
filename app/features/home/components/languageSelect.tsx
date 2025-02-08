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
          <FaGlobe className="text-xl text-gray-700 dark:text-gray-300" />
          <span className="text-gray-700 dark:text-gray-300">{language}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 bg-white dark:bg-gray-800 shadow-lg p-1 rounded-md border dark:border-gray-600">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            className="cursor-pointer px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-200 rounded"
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
