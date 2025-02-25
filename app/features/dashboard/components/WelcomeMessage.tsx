"use client";

import { Card } from "flowbite-react";
import cardImg from "../images/card-img.png";
import { EmployeeDetails } from "./EmployeeDetails";
import translations from "~/features/LanguageTranslation/Languagetranslations/dashBoard/welcomeMessageTranslation";
import { useLanguage } from "~/features/LanguageTranslation/context/LanguageContext";

export function WelcomeMessage() {
  const { language } = useLanguage();
  const t = translations[language]; // Get translations for the current language

  return (
    <div className="flex flex-col lg:flex-row gap-2 items-center items-stretch">
      <Card className="w-full lg:w-3/4">
        <div className="flex flex-col lg:flex-row items-center justify-between text-center lg:text-left">
          <div>
            <p className="text-3xl text-center lg:text-left tracking-tight text-gray-900 dark:text-white">
              {t.welcome}
            </p>
            <h3 className="font-bold text-4xl text-gray-700 dark:text-gray-400">
              {t.taskManagement}
            </h3>
            <p className="text-2xl">{t.description}</p>
          </div>
          <div>
            <img
              src={cardImg}
              alt="Task Management Illustration"
              className="w-[270px]"
            />
          </div>
        </div>
      </Card>
      <EmployeeDetails />
    </div>
  );
}
