import React from 'react';
import { Card } from '@/components/ui/card';
import type { Client } from '../types/client';

const EmployeeCard: React.FC<Client> = ({
  name,
  email,
  budget,
  projectName,
  joinDate
}) => {
  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{name}</h3>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">{projectName}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{budget}</p>
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