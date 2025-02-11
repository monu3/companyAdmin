import React from "react";
import { useLanguage } from "~/features/LanguageTranslation/context/LanguageContext";
import translations from "../languages/NoEmployee";

const NoEmployee = () => {
  const { language } = useLanguage();
  const t = translations[language];
  return (
    <div className="bg-orange-400 text-bg p-10 shadow-custom lg:rounded-lg sm:rounded-sm dark:bg-orange-400 dark:text-text text-center">
      <h2 className="text-2xl font-semibold">{t.employeeNotFound}</h2>
      <p className="mt-2 text-sm">{t.employeeNotFoundMessage} </p>
    </div>
  );
};

export default NoEmployee;
