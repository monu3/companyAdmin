
"use client";

import { Card } from "flowbite-react";
import cardImg from '../images/card-img.png'
import { EmployeeDetails } from "./EmployeeDetails";

export function WelcomeMessage() {
  return (
    <div className="flex sm:flex-col lg:flex-row gap-2 items-center justify-center">
      <Card
        className="lg:w-3/4 h-fit"
      >
        <div className="flex sm:flex-col lg:flex-row items-center justify-center">
        <div>
          <p className="text-2xl tracking-tight text-gray-900 dark:text-white">
            Welcome To
          </p>
          <h3 className="font-bold text-2xl text-gray-700 dark:text-gray-400">
          Your Task Management System
          </h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. In rem omnis pariatur. Obcaecati, corporis vero!</p>
        </div>
        <div>
        <img src={cardImg} alt="Task Management Illustration" className="w-[270px]" />
        </div>
        </div>
      </Card>
      <EmployeeDetails/>
    </div>
  );
}

