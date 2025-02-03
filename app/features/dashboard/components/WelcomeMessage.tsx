
"use client";

import { Card } from "flowbite-react";


export function WelcomeMessage() {
  return (
    <Card
      className="w-3/4"
    >
      <div className="flex">
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
      <img src="/images/card-img.png" alt="Task Management Illustration" />
      </div>
      </div>
      
      
    </Card>
  );
}

