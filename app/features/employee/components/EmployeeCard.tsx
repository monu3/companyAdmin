import React from 'react';
import { Card } from '@/components/ui/card';
import type { Employee } from '../types/employee';
import { useEmployeeContext } from '../context/EmployeeContext';
import { Button } from '~/components/ui/button';
import { Pencil, Trash } from 'lucide-react';

const EmployeeCard=() => {
  const {employees,updateEmployee,deleteEmployee}=useEmployeeContext();
  return (
    <>
    <div className="mt-8 flex p-4 flex-wrap gap-4">
      {employees.map((employee,index)=>(
        <Card key={index} className="p-6 relative group w-[300px]">
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">{employee.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{employee.jobRole}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{employee.department}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{employee.salary}</p>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">{employee.email}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Joined: {new Date(employee.enrollDate).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="absolute right-2 bottom-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateEmployee(employee.id)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => deleteEmployee(employee.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
      </Card>
      ))}
    
    </div>
    </>
  );
};

export default EmployeeCard;
