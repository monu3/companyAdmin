// import React, { useState } from "react";
// import { HiOutlineMenu, HiViewGrid, HiPlus } from "react-icons/hi";
// import AddEmployee from "../components/AddEmployee";

// const employeePage = () => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   return (
//     <div>
//       <div className="flex justify-between items-center p-4">
//         <div className="flex flex-col">
//           <h3>Employee</h3>
//           <p>breadcrumbs</p>
//         </div>
//         <div className="flex gap-1">
//           <button>
//             <HiOutlineMenu />
//           </button>
//           <button>
//             <HiViewGrid />
//           </button>
//           <button onClick={() => setIsOpen(true)}>
//             <HiPlus />
//           </button>
//         </div>
//       </div>
//       {isOpen && <AddEmployee onClose={()=>setIsOpen(false)} />}
//     </div>
//   );
// };

// export default employeePage;


import React, { useState, useEffect } from 'react';
import { EmployeeForm } from '../components/AddEmployee';
import EmployeeCard from '../components/EmployeeCard';
import NoEmployee from '../components/NoEmployee';
import { Button } from '@/components/ui/button';
import { PlusCircle, Grid, List, Pencil, Trash } from 'lucide-react';
import type{Employee} from '../types/employee'

const EmployeePage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Load employees from localStorage on mount
  useEffect(() => {
    const storedEmployees = localStorage.getItem('employeeList');
    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees));
    }
  }, []);

  // Save employees to localStorage when they change
  useEffect(() => {
    if(employees.length>0){
    localStorage.setItem('employeeList', JSON.stringify(employees));
    }
  }, [employees]);

  const addEmployee = (data: Omit<Employee, 'id'>) => {
    const newEmployee = {
      ...data,
      id: crypto.randomUUID()
    };
    setEmployees(prev => [...prev, newEmployee]);
  };

  const updateEmployee = (updatedEmployee: Employee) => {
    setEmployees(prev =>
      prev.map(emp => (emp.id === updatedEmployee.id ? updatedEmployee : emp))
    );
  };

  const deleteEmployee = (id: string) => {
    setEmployees(prev => prev.filter(emp => emp.id !== id));
  };

  const handleSubmit = (data: Employee) => {
    if (editingEmployee) {
      updateEmployee({ ...data, id: editingEmployee.id });
      setEditingEmployee(null);
    } else {
      addEmployee(data);
    }
    setIsOpen(false);
  };

  return (
    <div className="mx-auto p-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Employees</h1>
          <p className="text-gray-500">Manage your employees</p>
        </div>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode('list')}
            className='dark:text-text'
          >
            <List className={viewMode === 'list' ? 'text-primary' : ''} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <Grid className={viewMode === 'grid' ? 'text-primary' : ''} />
          </Button>
          <Button onClick={() => setIsOpen(true)} variant={'outline'} className='dark:text-text'>
            <PlusCircle/>
          </Button>
        </div>
      </div>

      {employees.length === 0 ? (
        <NoEmployee />
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-5 gap-4' : 'space-y-4'}>
          {employees.map((employee) => (
            <div key={employee.id} className="relative group">
              <div className="absolute right-2 bottom-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setEditingEmployee(employee)}
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
              <EmployeeCard {...employee} />
            </div>
          ))}
        </div>
      )}

      {(isOpen || editingEmployee) && (
        <EmployeeForm
          onClose={() => {
            setIsOpen(false);
            setEditingEmployee(null);
          }}
          onSubmit={handleSubmit}
          employee={editingEmployee || undefined}
        />
      )}
    </div>
  );
};

export default EmployeePage;
