import React from 'react';
import { Card } from '@/components/ui/card';
import type { Employee } from '../types/employee';

const EmployeeCard: React.FC<Employee> = ({
  name,
  position,
  email,
  department,
  salary,
  joinDate
}) => {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{position}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">{department}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{salary}</p>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">{email}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Joined: {new Date(joinDate).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default EmployeeCard;
